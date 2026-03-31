"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import type { ProjectMeta } from "../../lib/projects";

const FILTERS = [
    { key: "all", label: "All Projects" },
    { key: "lead generation", label: "Lead Gen" },
    { key: "automation", label: "Automation" },
    { key: "chatbot", label: "Chatbot" },
    { key: "reporting", label: "Reporting" },
    { key: "crm", label: "CRM" },
    { key: "ecommerce", label: "E-commerce" },
];

interface ProjectsClientProps {
    projects: ProjectMeta[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    const featuredProject = projects.find((p) => p.featured);
    const gridProjects = projects.filter((p) => !p.featured);

    const showFeatured =
        featuredProject &&
        (filter === "all" || filter === featuredProject.category) &&
        (search === "" ||
            featuredProject.title.toLowerCase().includes(search.toLowerCase()) ||
            featuredProject.excerpt.toLowerCase().includes(search.toLowerCase()));

    const filteredGrid = gridProjects.filter((p) => {
        const matchCat = filter === "all" || p.category === filter;
        const matchSearch =
            search === "" ||
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    const noResults = !showFeatured && filteredGrid.length === 0;

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("visible");
                });
            },
            { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
        );
        document.querySelectorAll(".project-card, .project-featured-card").forEach((el) => {
            el.classList.add("fade-in");
            obs.observe(el);
        });
        return () => obs.disconnect();
    }, [filter, search]);

    return (
        <>
            <CustomCursor />
            <div className="container">
                <Navbar projectsPage />

                {/* Projects Hero */}
                <section className="projects-hero">
                    <div className="section-label">Portfolio</div>
                    <h1 className="projects-hero-title">
                        Real Work.<br />Real Results.
                    </h1>
                    <p className="projects-hero-subtitle">
                        Every project below is a real automation system I built for clients. Browse by category or search — and if you need something similar, let&apos;s talk.
                    </p>

                    {/* Stats row */}
                    <div className="projects-stats-row">
                        <div className="projects-stat">
                            <span className="projects-stat-num">50+</span>
                            <span className="projects-stat-label">Workflows Built</span>
                        </div>
                        <div className="projects-stat-divider" />
                        <div className="projects-stat">
                            <span className="projects-stat-num">1000+</span>
                            <span className="projects-stat-label">Hours Saved</span>
                        </div>
                        <div className="projects-stat-divider" />
                        <div className="projects-stat">
                            <span className="projects-stat-num">30+</span>
                            <span className="projects-stat-label">Happy Clients</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="blog-controls">
                        <div className="blog-search">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input
                                type="text"
                                placeholder="Search projects..."
                                autoComplete="off"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="blog-filters">
                            {FILTERS.map((f) => (
                                <button
                                    key={f.key}
                                    className={`filter-btn${filter === f.key ? " active" : ""}`}
                                    onClick={() => setFilter(f.key)}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Project */}
                {showFeatured && featuredProject && (
                    <section className="projects-featured-section">
                        <Link href={`/projects/${featuredProject.slug}`} className="project-featured-card">
                            <div className="featured-badge">⭐ Featured Project</div>

                            {/* Cover image: prefer thumbnail, fallback to first screenshot */}
                            {(featuredProject.thumbnail || (featuredProject.screenshots && featuredProject.screenshots.length > 0)) ? (
                                <div className="project-featured-img-wrap">
                                    <Image
                                        src={`/projects/${featuredProject.slug}/${featuredProject.thumbnail ?? featuredProject.screenshots[0]}`}
                                        alt={featuredProject.title}
                                        fill
                                        className="project-featured-img"
                                    />
                                    <div className="project-featured-img-overlay" />
                                </div>
                            ) : (
                                <div className="project-featured-placeholder">
                                    <span className="project-featured-icon">{featuredProject.icon}</span>
                                </div>
                            )}

                            <div className="project-featured-body">
                                <div className="featured-meta">
                                    <span className={`blog-category ${featuredProject.tagCls}`}>{featuredProject.tag}</span>
                                    <span className="blog-date">{featuredProject.date}</span>
                                </div>
                                <h2 className="project-featured-title">{featuredProject.title}</h2>
                                <p className="project-featured-excerpt">{featuredProject.excerpt}</p>

                                {featuredProject.results && (
                                    <div className="project-results-pill">
                                        <span>🏆</span>
                                        <span>{featuredProject.results}</span>
                                    </div>
                                )}

                                <div className="project-tools-row">
                                    {featuredProject.tools.slice(0, 5).map((t) => (
                                        <span key={t} className="project-tool-tag">{t}</span>
                                    ))}
                                    {featuredProject.tools.length > 5 && (
                                        <span className="project-tool-tag">+{featuredProject.tools.length - 5}</span>
                                    )}
                                </div>

                                <div className="project-featured-cta">
                                    <span className="author-name">Md Shafiqur Rahman</span>
                                    <span className="featured-read-link">View Project →</span>
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Projects Grid */}
                <section className="projects-grid-section">
                    <div className="projects-grid">
                        {filteredGrid.map((project) => (
                            <article key={project.slug} className="project-card">
                                <Link href={`/projects/${project.slug}`} className="project-card-link">
                                    {/* Cover image: prefer thumbnail, fallback to first screenshot */}
                                    {(project.thumbnail || (project.screenshots && project.screenshots.length > 0)) ? (
                                        <div className="project-card-img-wrap">
                                            <Image
                                                src={`/projects/${project.slug}/${project.thumbnail ?? project.screenshots[0]}`}
                                                alt={project.title}
                                                fill
                                                className="project-card-img"
                                            />
                                            <div className="project-card-img-overlay" />
                                        </div>
                                    ) : (
                                        <div className="project-card-placeholder">
                                            <span className="project-card-icon-big">{project.icon}</span>
                                        </div>
                                    )}

                                    <div className="project-card-body">
                                        <div className="project-card-top">
                                            <span className="project-card-icon">{project.icon}</span>
                                            <span className={`blog-category ${project.tagCls}`}>{project.tag}</span>
                                        </div>
                                        <h3 className="project-card-title">{project.title}</h3>
                                        <p className="project-card-excerpt">{project.excerpt}</p>

                                        {project.results && (
                                            <div className="project-card-result">
                                                <span>✅</span>
                                                <span>{project.results}</span>
                                            </div>
                                        )}

                                        <div className="project-card-tools">
                                            {project.tools.slice(0, 4).map((t) => (
                                                <span key={t} className="project-tool-tag">{t}</span>
                                            ))}
                                            {project.tools.length > 4 && (
                                                <span className="project-tool-tag">+{project.tools.length - 4}</span>
                                            )}
                                        </div>

                                        <div className="project-card-footer">
                                            <span className="blog-date">{project.date}</span>
                                            <span className="featured-read-link">View Details →</span>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>

                    {noResults && (
                        <div className="blog-no-results">
                            <div className="no-results-icon">🔍</div>
                            <h3>No projects found</h3>
                            <p>Try searching with different keywords or browse all categories.</p>
                        </div>
                    )}
                </section>

                {/* CTA section */}
                <section className="projects-cta-section">
                    <div className="newsletter-glow" />
                    <div className="section-label">Let&apos;s Work Together</div>
                    <h2 className="newsletter-title">
                        Need Something<br />Like This Built?
                    </h2>
                    <p className="newsletter-desc">
                        Every project above started with a single conversation. Tell me what you&apos;re trying to automate and I&apos;ll show you what&apos;s possible — for free.
                    </p>
                    <div className="projects-cta-btns">
                        <a
                            href="mailto:shafiqur.dev@gmail.com?subject=Portfolio%20Project%20Inquiry"
                            className="btn-primary"
                        >
                            📩 Get a Free Consultation
                        </a>
                        <a
                            href="https://wa.me/8801600534507"
                            target="_blank"
                            rel="noopener"
                            className="btn-secondary"
                        >
                            💬 Chat on WhatsApp
                        </a>
                    </div>
                </section>

                <Footer />
            </div>

            <button
                className="scroll-to-top"
                aria-label="Scroll to top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 15-6-6-6 6"></path>
                </svg>
            </button>
        </>
    );
}
