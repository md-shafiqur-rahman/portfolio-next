"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import type { PostMeta } from "../../lib/posts";

const FILTERS = [
    { key: "all", label: "All" },
    { key: "automation", label: "Automation" },
    { key: "ai", label: "AI & LLMs" },
    { key: "n8n", label: "n8n" },
    { key: "tutorial", label: "Tutorial" },
    { key: "business", label: "Business" },
];

interface BlogClientProps {
    posts: PostMeta[];
}

export default function BlogClient({ posts }: BlogClientProps) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");

    const featuredPost = posts.find((p) => p.featured);
    const gridPosts = posts.filter((p) => !p.featured);

    const showFeatured =
        featuredPost &&
        (filter === "all" || filter === featuredPost.category) &&
        (search === "" ||
            featuredPost.title.toLowerCase().includes(search.toLowerCase()) ||
            featuredPost.excerpt.toLowerCase().includes(search.toLowerCase()));

    const filteredGrid = gridPosts.filter((p) => {
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
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );
        document.querySelectorAll(".blog-card, .featured-card").forEach((el) => {
            el.classList.add("fade-in");
            obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    return (
        <>
            <CustomCursor />
            <div className="reading-progress" id="reading-progress"></div>
            <div className="container">
                <Navbar blogPage />

                {/* Blog Hero */}
                <section className="blog-hero">
                    <div className="section-label">Blog</div>
                    <h1 className="blog-hero-title">
                        Insights on AI &<br />Automation
                    </h1>
                    <p className="blog-hero-subtitle">
                        Tips, tutorials, and real-world case studies on building intelligent automation systems that scale your business.
                    </p>
                    <div className="blog-controls">
                        <div className="blog-search">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <input type="text" placeholder="Search articles..." autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="blog-filters">
                            {FILTERS.map((f) => (
                                <button key={f.key} className={`filter-btn${filter === f.key ? " active" : ""}`} onClick={() => setFilter(f.key)}>
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Post */}
                {showFeatured && featuredPost && (
                    <section className="featured-post" id="featured-post">
                        <Link href={`/blog/${featuredPost.slug}`} className="featured-card">
                            <div className="featured-badge">✨ Featured Article</div>
                            <div className="featured-content">
                                <div className="featured-meta">
                                    <span className={`blog-category ${featuredPost.tagCls}`}>{featuredPost.tag}</span>
                                    <span className="blog-date">{featuredPost.date}</span>
                                    <span className="blog-read-time">{featuredPost.readTime}</span>
                                </div>
                                <h2 className="featured-title">{featuredPost.title}</h2>
                                <p className="featured-excerpt">{featuredPost.excerpt}</p>
                                <div className="featured-author">
                                    <span className="author-name">Md Shafiqur Rahman</span>
                                    <span className="featured-read-link">Read Article →</span>
                                </div>
                            </div>
                            <div className="featured-visual">
                                <div className="featured-icon-grid">
                                    <span>🤖</span>
                                    <span>⚙️</span>
                                    <span>📊</span>
                                    <span>🚀</span>
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Blog Grid */}
                <section className="blog-grid-section">
                    <div className="blog-grid" id="blog-grid">
                        {filteredGrid.map((post) => (
                            <article key={post.slug} className="blog-card" data-category={post.category}>
                                <Link href={`/blog/${post.slug}`} className="blog-card-link">
                                    <div className="blog-card-top">
                                        <div className="blog-card-icon">{post.icon}</div>
                                        <span className={`blog-category ${post.tagCls}`}>{post.tag}</span>
                                    </div>
                                    <h3 className="blog-card-title">{post.title}</h3>
                                    <p className="blog-card-excerpt">{post.excerpt}</p>
                                    <div className="blog-card-footer">
                                        <span className="blog-date">{post.date}</span>
                                        <span className="blog-read-time">{post.readTime}</span>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                    {noResults && (
                        <div className="blog-no-results">
                            <div className="no-results-icon">🔍</div>
                            <h3>No articles found</h3>
                            <p>Try searching with different keywords or browse all categories.</p>
                        </div>
                    )}
                </section>

                {/* Newsletter */}
                <section className="blog-newsletter">
                    <div className="newsletter-glow"></div>
                    <div className="section-label">Stay Updated</div>
                    <h2 className="newsletter-title">
                        Get Automation Tips
                        <br />
                        In Your Inbox
                    </h2>
                    <p className="newsletter-desc">Join 500+ professionals getting weekly insights on AI automation, workflow optimization, and business growth strategies.</p>
                    {!submitted ? (
                        <>
                            <form
                                className="newsletter-form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setSubmitted(true);
                                }}
                            >
                                <input type="email" placeholder="your@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                <button type="submit" className="btn-primary">
                                    Subscribe
                                </button>
                            </form>
                            <p className="newsletter-note">No spam. Unsubscribe anytime.</p>
                        </>
                    ) : (
                        <div className="newsletter-success">
                            <div className="newsletter-success-icon">🎉</div>
                            <p className="newsletter-success-text">You&apos;re in! Check your inbox for a confirmation email.</p>
                        </div>
                    )}
                </section>

                <Footer />
            </div>
            <button className="scroll-to-top" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 15-6-6-6 6"></path>
                </svg>
            </button>
        </>
    );
}
