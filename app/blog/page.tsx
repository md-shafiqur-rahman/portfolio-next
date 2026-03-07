"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";

const POSTS = [
    { slug: "ai-automation-specialist-n8n", category: "n8n", icon: "🚀", tag: "n8n", tagCls: "tag-orange", title: "What Does an AI Automation Specialist Do with n8n? (Complete 2026 Guide)", excerpt: "An AI automation specialist using n8n can transform how your business runs — eliminating repetitive tasks, connecting apps intelligently, and deploying AI agents that work 24/7. Here's exactly what that looks like.", date: "Mar 8, 2026", readTime: "12 min read", featured: true },
    { slug: "automate-business-with-n8n", category: "automation", icon: "🤖", tag: "Automation", tagCls: "tag-purple", title: "How to Automate 80% of Your Business Operations Using n8n", excerpt: "Most businesses waste hundreds of hours on repetitive tasks every month. Here's how I helped a SaaS company automate lead capture, onboarding, invoicing, and reporting — all with one tool.", date: "Feb 28, 2026", readTime: "8 min read", featured: false },
    { slug: "rag-ai-agents-explained", category: "ai", icon: "🧠", tag: "AI & LLMs", tagCls: "tag-teal", title: "RAG & AI Agents Explained: Build Smarter Automation with Context", excerpt: "What is Retrieval-Augmented Generation? How do AI agents actually work? A practical guide to building AI systems that understand your data.", date: "Feb 25, 2026", readTime: "6 min read", featured: false },
    { slug: "n8n-vs-make-vs-zapier", category: "n8n", icon: "⚡", tag: "n8n", tagCls: "tag-orange", title: "n8n vs Make vs Zapier: Which Automation Tool is Right for You?", excerpt: "A detailed comparison of the three biggest automation platforms. Pricing, features, flexibility, and when to use each one.", date: "Feb 20, 2026", readTime: "10 min read", featured: false },
    { slug: "webhook-api-integration-guide", category: "tutorial", icon: "🔗", tag: "Tutorial", tagCls: "tag-gold", title: "Complete Guide to Webhook & API Integration for Non-Developers", excerpt: "Webhooks and APIs don't have to be scary. This step-by-step guide breaks down everything you need to connect any two apps.", date: "Feb 15, 2026", readTime: "7 min read", featured: false },
    { slug: "automation-roi-calculator", category: "business", icon: "📈", tag: "Business", tagCls: "tag-pink", title: "How to Calculate the ROI of Business Automation (With Real Numbers)", excerpt: "Is automation worth it? I break down the real costs, time savings, and revenue impact with actual examples from client projects.", date: "Feb 10, 2026", readTime: "5 min read", featured: false },
    { slug: "crm-automation-hubspot-n8n", category: "automation", icon: "🗄️", tag: "Automation", tagCls: "tag-purple", title: "Automate Your CRM: HubSpot + n8n Workflow for Lead Management", excerpt: "Learn how to build a fully automated CRM pipeline that captures leads, scores them, and triggers personalized follow-ups automatically.", date: "Feb 5, 2026", readTime: "9 min read", featured: false },
    { slug: "chatbot-customer-support", category: "ai", icon: "💬", tag: "AI & LLMs", tagCls: "tag-teal", title: "Building an AI Chatbot for Customer Support That Actually Works", excerpt: "Most chatbots are frustrating. Here's how to build one that understands context, retrieves accurate answers, and knows when to escalate.", date: "Jan 28, 2026", readTime: "8 min read", featured: false },
];

const FILTERS = [
    { key: "all", label: "All" },
    { key: "automation", label: "Automation" },
    { key: "ai", label: "AI & LLMs" },
    { key: "n8n", label: "n8n" },
    { key: "tutorial", label: "Tutorial" },
    { key: "business", label: "Business" },
];

export default function BlogPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");

    const featuredPost = POSTS.find(p => p.featured)!;
    const gridPosts = POSTS.filter(p => !p.featured);

    const showFeatured = (filter === "all" || filter === "n8n") &&
        (search === "" || featuredPost.title.toLowerCase().includes(search.toLowerCase()) || featuredPost.excerpt.toLowerCase().includes(search.toLowerCase()));

    const filteredGrid = gridPosts.filter(p => {
        const matchCat = filter === "all" || p.category === filter;
        const matchSearch = search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    const noResults = !showFeatured && filteredGrid.length === 0;

    useEffect(() => {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        document.querySelectorAll(".blog-card, .featured-card").forEach(el => { el.classList.add("fade-in"); obs.observe(el); });
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
                    <h1 className="blog-hero-title">Insights on AI &<br />Automation</h1>
                    <p className="blog-hero-subtitle">Tips, tutorials, and real-world case studies on building intelligent automation systems that scale your business.</p>
                    <div className="blog-controls">
                        <div className="blog-search">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
                            <input type="text" placeholder="Search articles..." autoComplete="off" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <div className="blog-filters">
                            {FILTERS.map(f => (
                                <button key={f.key} className={`filter-btn${filter === f.key ? " active" : ""}`} onClick={() => setFilter(f.key)}>{f.label}</button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Post */}
                {showFeatured && (
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
                                    <span>🤖</span><span>⚙️</span><span>📊</span><span>🚀</span>
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Blog Grid */}
                <section className="blog-grid-section">
                    <div className="blog-grid" id="blog-grid">
                        {filteredGrid.map(post => (
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
                    <h2 className="newsletter-title">Get Automation Tips<br />In Your Inbox</h2>
                    <p className="newsletter-desc">Join 500+ professionals getting weekly insights on AI automation, workflow optimization, and business growth strategies.</p>
                    {!submitted ? (
                        <>
                            <form className="newsletter-form" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                                <input type="email" placeholder="your@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
                                <button type="submit" className="btn-primary">Subscribe</button>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"></path></svg>
            </button>
        </>
    );
}
