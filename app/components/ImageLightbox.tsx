"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { ScreenshotGroups } from "@/lib/projects";

interface ImageLightboxProps {
    /** Legacy flat list — used as fallback when groups are empty */
    images?: string[];
    /** Categorised groups (workflow + output) */
    screenshotGroups?: ScreenshotGroups;
    projectSlug: string;
    projectTitle: string;
}

// ─── tiny helper ─────────────────────────────────────────────────────────────
function hasImages(arr?: string[]) {
    return Array.isArray(arr) && arr.length > 0;
}

// ─── single image card ───────────────────────────────────────────────────────
function GalleryCard({
    img,
    idx,
    projectSlug,
    projectTitle,
    onClick,
}: {
    img: string;
    idx: number;
    projectSlug: string;
    projectTitle: string;
    onClick: () => void;
}) {
    return (
        <div
            className="project-gallery-img-wrap lightbox-trigger"
            onClick={onClick}
            title="Click to view fullscreen"
        >
            <Image
                src={`/projects/${projectSlug}/${img}`}
                alt={`${projectTitle} screenshot ${idx + 1}`}
                fill
                className="project-gallery-img"
            />
            <div className="lightbox-hover-overlay">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </svg>
                <span>View Fullscreen</span>
            </div>
        </div>
    );
}

// ─── section header badge ────────────────────────────────────────────────────
function SectionHeader({ type }: { type: "workflow" | "output" }) {
    if (type === "workflow") {
        return (
            <div className="gallery-section-header gallery-section-workflow">
                <div className="gallery-section-badge gallery-badge-workflow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                        <path d="M7 10h2l2-3 2 5 2-2h2" />
                    </svg>
                    <span>Inside the Workflow</span>
                </div>
                <p className="gallery-section-desc">How the automation is built — the n8n workflow diagram</p>
            </div>
        );
    }
    return (
        <div className="gallery-section-header gallery-section-output">
            <div className="gallery-section-badge gallery-badge-output">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Live Output / Real Results</span>
            </div>
            <p className="gallery-section-desc">What the system actually produces — real output from the automation</p>
        </div>
    );
}

// ─── main component ───────────────────────────────────────────────────────────
export default function ImageLightbox({
    images,
    screenshotGroups,
    projectSlug,
    projectTitle,
}: ImageLightboxProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Build flat list for lightbox navigation: workflow first, then output
    const workflowImgs = screenshotGroups?.workflow ?? [];
    const outputImgs = screenshotGroups?.output ?? [];
    const hasGroups = hasImages(workflowImgs) || hasImages(outputImgs);

    // All images in display order (for lightbox prev/next)
    const allImages: string[] = hasGroups
        ? [...workflowImgs, ...outputImgs]
        : (images ?? []);

    const openLightbox = (idx: number) => setActiveIndex(idx);
    const closeLightbox = () => setActiveIndex(null);

    const goNext = useCallback(() => {
        if (activeIndex === null) return;
        setActiveIndex((activeIndex + 1) % allImages.length);
    }, [activeIndex, allImages.length]);

    const goPrev = useCallback(() => {
        if (activeIndex === null) return;
        setActiveIndex((activeIndex - 1 + allImages.length) % allImages.length);
    }, [activeIndex, allImages.length]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (activeIndex === null) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [activeIndex, goNext, goPrev]);

    useEffect(() => {
        document.body.style.overflow = activeIndex !== null ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [activeIndex]);

    if (allImages.length === 0) return null;

    // ── label shown in lightbox counter area ──────────────────────────────
    function getLightboxLabel(idx: number) {
        if (!hasGroups) return null;
        if (idx < workflowImgs.length) {
            return <span className="lightbox-type-badge lightbox-type-workflow">⚙️ Workflow</span>;
        }
        return <span className="lightbox-type-badge lightbox-type-output">✅ Output</span>;
    }

    return (
        <>
            {/* ─── Gallery ─────────────────────────────────────────────────── */}
            <div className="project-gallery">

                {hasGroups ? (
                    /* ── Grouped mode: two labeled sections ── */
                    <>
                        {hasImages(workflowImgs) && (
                            <div className="gallery-group">
                                <SectionHeader type="workflow" />
                                <div className={`project-gallery-grid gallery-cols-${Math.min(workflowImgs.length, 2)}`}>
                                    {workflowImgs.map((img, idx) => (
                                        <GalleryCard
                                            key={img}
                                            img={img}
                                            idx={idx}
                                            projectSlug={projectSlug}
                                            projectTitle={projectTitle}
                                            onClick={() => openLightbox(idx)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {hasImages(outputImgs) && (
                            <div className="gallery-group">
                                <SectionHeader type="output" />
                                <div className={`project-gallery-grid gallery-cols-${Math.min(outputImgs.length, 2)}`}>
                                    {outputImgs.map((img, idx) => (
                                        <GalleryCard
                                            key={img}
                                            img={img}
                                            idx={idx}
                                            projectSlug={projectSlug}
                                            projectTitle={projectTitle}
                                            // offset index so lightbox nav works across both sections
                                            onClick={() => openLightbox(workflowImgs.length + idx)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* ── Legacy flat mode ── */
                    <>
                        <div className="project-gallery-label">
                            <span>📸</span> Project Screenshots
                        </div>
                        <div className={`project-gallery-grid gallery-cols-${Math.min(allImages.length, 2)}`}>
                            {allImages.map((img, idx) => (
                                <GalleryCard
                                    key={img}
                                    img={img}
                                    idx={idx}
                                    projectSlug={projectSlug}
                                    projectTitle={projectTitle}
                                    onClick={() => openLightbox(idx)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* ─── Lightbox Overlay ────────────────────────────────────────── */}
            {activeIndex !== null && (
                <div
                    className="lightbox-overlay"
                    onClick={closeLightbox}
                    aria-modal="true"
                    role="dialog"
                >
                    {/* Close */}
                    <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Counter + type badge */}
                    <div className="lightbox-counter">
                        {getLightboxLabel(activeIndex)}
                        <span className="lightbox-counter-nums">{activeIndex + 1} / {allImages.length}</span>
                    </div>

                    {/* Prev */}
                    {allImages.length > 1 && (
                        <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous image">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                    )}

                    {/* Image */}
                    <div className="lightbox-img-container" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={`/projects/${projectSlug}/${allImages[activeIndex]}`}
                            alt={`${projectTitle} screenshot ${activeIndex + 1}`}
                            fill
                            className="lightbox-img"
                            quality={95}
                            priority
                        />
                    </div>

                    {/* Next */}
                    {allImages.length > 1 && (
                        <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next image">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    )}

                    {/* Thumbnail strip — with type divider if grouped */}
                    {allImages.length > 1 && (
                        <div className="lightbox-thumbs" onClick={(e) => e.stopPropagation()}>
                            {allImages.map((img, idx) => (
                                <div key={idx} className="lightbox-thumb-wrap">
                                    {/* Divider between workflow & output */}
                                    {hasGroups && idx === workflowImgs.length && workflowImgs.length > 0 && outputImgs.length > 0 && (
                                        <div className="lightbox-thumb-divider" title="Output starts here">✅</div>
                                    )}
                                    <div
                                        className={`lightbox-thumb ${idx === activeIndex ? "lightbox-thumb-active" : ""} ${hasGroups && idx >= workflowImgs.length ? "lightbox-thumb-output" : "lightbox-thumb-workflow"}`}
                                        onClick={() => setActiveIndex(idx)}
                                    >
                                        <Image
                                            src={`/projects/${projectSlug}/${img}`}
                                            alt={`Thumbnail ${idx + 1}`}
                                            fill
                                            className="lightbox-thumb-img"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
