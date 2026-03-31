import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CustomCursor from "../../components/CustomCursor";
import { getProjectBySlug, getAllProjects } from "../../../lib/projects";
import WorkflowDownload from "./WorkflowDownload";
import shafiq from "@/public/profile.png";

export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) return { title: "Project Not Found" };
    return {
        title: `${project.title} — Md Shafiqur Rahman`,
        description: project.excerpt,
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <>
            <CustomCursor />
            <div className="reading-progress" id="reading-progress"></div>
            <div className="container">
                <Navbar projectsPage />

                {/* Project Header */}
                <div className="post-header">
                    <Link href="/projects" className="post-back-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back to Portfolio
                    </Link>

                    <div className="post-meta">
                        <span className={`blog-category ${project.tagCls}`}>{project.tag}</span>
                        <span className="blog-date">{project.date}</span>
                    </div>

                    <h1 className="post-title">{project.title}</h1>
                    <p className="post-subtitle">{project.excerpt}</p>

                    {/* Results highlight */}
                    {project.results && (
                        <div className="project-detail-results">
                            <span className="project-detail-results-icon">🏆</span>
                            <span className="project-detail-results-text">{project.results}</span>
                        </div>
                    )}

                    {/* Tools used */}
                    {project.tools.length > 0 && (
                        <div className="project-detail-tools">
                            <span className="project-detail-tools-label">Tools used:</span>
                            <div className="project-tool-row">
                                {project.tools.map((tool) => (
                                    <span key={tool} className="project-tool-tag-lg">{tool}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Author */}
                    <div className="post-author-bar">
                        <div
                            className="testimonial-avatar"
                            style={{
                                background: "rgba(108,71,255,0.15)",
                                color: "var(--accent)",
                                width: "44px",
                                height: "44px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                fontSize: "14px",
                            }}
                        >
                            <Image src={shafiq} alt="Shafiq" width={44} height={44} style={{ borderRadius: "50%" }} />
                        </div>
                        <div className="post-author-info">
                            <span className="author-name">Md Shafiqur Rahman</span>
                            <span className="author-role">AI Automation Expert</span>
                        </div>
                    </div>
                </div>

                {/* Screenshots Gallery */}
                {project.screenshots && project.screenshots.length > 0 && (
                    <div className="project-gallery">
                        <div className="project-gallery-label">
                            <span>📸</span> Project Screenshots
                        </div>
                        <div className={`project-gallery-grid gallery-cols-${Math.min(project.screenshots.length, 2)}`}>
                            {project.screenshots.map((img, idx) => (
                                <div key={idx} className="project-gallery-img-wrap">
                                    <Image
                                        src={`/projects/${project.slug}/${img}`}
                                        alt={`${project.title} screenshot ${idx + 1}`}
                                        fill
                                        className="project-gallery-img"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Markdown Content */}
                <div className="post-content" dangerouslySetInnerHTML={{ __html: project.contentHtml }} />

                {/* Workflow Download — auto-shown when workflow.json exists in project folder */}
                {project.hasWorkflow && (
                    <WorkflowDownload
                        slug={project.slug}
                        title={project.title}
                    />
                )}

                {/* CTA */}
                <div className="post-cta">
                    <h3>Want Something Like This for Your Business?</h3>
                    <p>Let&apos;s map out your automation. Book a free 30-minute strategy call — I&apos;ll audit your current workflows and show you exactly where automation can save you time and money.</p>
                    <a href="mailto:shafiqur.dev@gmail.com?subject=Portfolio%20Project%20Inquiry" className="btn-book-call">
                        Book a Free Strategy Call →
                    </a>
                </div>

                {/* Share */}
                <div className="post-share">
                    <span className="post-share-label">Share:</span>
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(project.title)}&url=${encodeURIComponent(`https://shafiqur.dev/projects/${slug}`)}`}
                        target="_blank"
                        rel="noopener"
                        className="share-btn"
                        title="Share on X"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://shafiqur.dev/projects/${slug}`)}`}
                        target="_blank"
                        rel="noopener"
                        className="share-btn"
                        title="Share on LinkedIn"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                    <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(project.title + " " + `https://shafiqur.dev/projects/${slug}`)}`}
                        target="_blank"
                        rel="noopener"
                        className="share-btn"
                        title="Share on WhatsApp"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </a>
                </div>

                <Footer />
            </div>
        </>
    );
}
