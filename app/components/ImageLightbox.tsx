"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ImageLightboxProps {
    images: string[];
    projectSlug: string;
    projectTitle: string;
}

export default function ImageLightbox({ images, projectSlug, projectTitle }: ImageLightboxProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const openLightbox = (idx: number) => setActiveIndex(idx);
    const closeLightbox = () => setActiveIndex(null);

    const goNext = useCallback(() => {
        if (activeIndex === null) return;
        setActiveIndex((activeIndex + 1) % images.length);
    }, [activeIndex, images.length]);

    const goPrev = useCallback(() => {
        if (activeIndex === null) return;
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
    }, [activeIndex, images.length]);

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

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (activeIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [activeIndex]);

    return (
        <>
            {/* Gallery Grid */}
            <div className="project-gallery">
                <div className="project-gallery-label">
                    <span>📸</span> Project Screenshots
                </div>
                <div className={`project-gallery-grid gallery-cols-${Math.min(images.length, 2)}`}>
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className="project-gallery-img-wrap lightbox-trigger"
                            onClick={() => openLightbox(idx)}
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
                    ))}
                </div>
            </div>

            {/* Lightbox Overlay */}
            {activeIndex !== null && (
                <div
                    className="lightbox-overlay"
                    onClick={closeLightbox}
                    aria-modal="true"
                    role="dialog"
                >
                    {/* Close Button */}
                    <button
                        className="lightbox-close"
                        onClick={closeLightbox}
                        aria-label="Close lightbox"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Counter */}
                    <div className="lightbox-counter">
                        {activeIndex + 1} / {images.length}
                    </div>

                    {/* Prev Button */}
                    {images.length > 1 && (
                        <button
                            className="lightbox-nav lightbox-prev"
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                            aria-label="Previous image"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                    )}

                    {/* Image Container */}
                    <div
                        className="lightbox-img-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={`/projects/${projectSlug}/${images[activeIndex]}`}
                            alt={`${projectTitle} screenshot ${activeIndex + 1}`}
                            fill
                            className="lightbox-img"
                            quality={95}
                            priority
                        />
                    </div>

                    {/* Next Button */}
                    {images.length > 1 && (
                        <button
                            className="lightbox-nav lightbox-next"
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            aria-label="Next image"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    )}

                    {/* Thumbnail Strip */}
                    {images.length > 1 && (
                        <div className="lightbox-thumbs" onClick={(e) => e.stopPropagation()}>
                            {images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`lightbox-thumb ${idx === activeIndex ? "lightbox-thumb-active" : ""}`}
                                    onClick={() => setActiveIndex(idx)}
                                >
                                    <Image
                                        src={`/projects/${projectSlug}/${img}`}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        className="lightbox-thumb-img"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
