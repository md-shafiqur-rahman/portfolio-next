import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ParticleCanvas from "./components/ParticleCanvas";
import CursorGlow from "./components/CursorGlow";
import ScrollToTop from "./components/ScrollToTop";
import MobileBottomNav from "./components/MobileBottomNav";
import HeroTitle from "./components/HeroTitle";
import Counter from "./components/Counter";
import Subtitle from "./components/Subtitle";
import VideoCard from "./components/VideoCard";
import HomeInteractions from "./components/HomeInteractions";

// ── Main Page (Server Component — all text content is server-rendered for SEO) ──
export default function HomePage() {
  return (
    <>
      <CursorGlow />
      <ParticleCanvas />
      <CustomCursor />
      <HomeInteractions />

      <div className="container">
        <Navbar />

        {/* HERO */}
        <header id="hero">
          <div className="hero-layout">
            <div className="hero-content">
              <div className="premium-badge"><span className="pulse-dot"></span>Available for Projects</div>
              <HeroTitle />
              <Subtitle />
              <div className="hero-cta">
                <a href="#contact" className="btn-primary" id="hero-cta-contact">Book a Free Strategy Call</a>
                <a href="https://www.linkedin.com/in/automation-by-shafiq/" target="_blank" rel="noopener" className="btn-secondary" id="hero-cta-linkedin">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-frame">
                <Image src="/profile.png" alt="Md Shafiqur Rahman — AI Automation Expert" id="hero-profile-image" width={320} height={320} style={{ objectFit: "cover" }} />
                <div className="image-glow"></div>
              </div>
              <div className="floating-stats">
                <div className="stat-pill"><span className="stat-icon">🤖</span><span className="stat-text">50+ Automations Built</span></div>
                <div className="stat-pill right"><span className="stat-icon">⏱️</span><span className="stat-text">1000+ Hours Saved</span></div>
              </div>
            </div>
          </div>
        </header>

        {/* ABOUT */}
        <section id="about" style={{ marginBottom: "80px" }}>
          <p className="section-label">About Me</p>
          <h2 className="section-title">Turning Manual Chaos<br />Into Automated Growth</h2>
          <div className="about-grid">
            <div className="about-text reveal-left">
              <p>Manual processes slow growth. Smart systems scale businesses. I build intelligent automation with AI that saves time and increases revenue.</p>
              <p>For the last few years, I&apos;ve been helping businesses automate their entire digital operations — from lead generation to reporting, CRM management to content pipelines — using tools like <strong>n8n, Make, Zapier, Python, APIs, and AI Agents</strong>.</p>
              <p>I don&apos;t just connect apps. I design systems that think, adapt, and deliver results while you focus on what matters most — growing your business.</p>
            </div>
            <div className="about-highlights reveal-right">
              {[{ count: 50, suffix: "+", label: "Automation Workflows Delivered", cls: "c-purple" }, { count: 1000, suffix: "+", label: "Hours Saved for Clients", cls: "c-teal" }, { count: 20, suffix: "+", label: "Happy Clients Worldwide", cls: "c-orange" }, { count: 2, suffix: "+", label: "Years of Automation Experience", cls: "c-gold" }].map((item, i) => (
                <div className="highlight-item" key={i}>
                  <span className={`highlight-num ${item.cls}`}><Counter count={item.count} suffix={item.suffix} /></span>
                  <span className="highlight-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" style={{ marginBottom: "80px" }}>
          <p className="section-label">What I Do</p>
          <h2 className="section-title">Services That Scale<br />Your Business</h2>
          <div className="strategy-grid services-bento">
            {[
              { icon: "🤖", title: "AI Workflow Automation", desc: "End-to-end automation using n8n, Make, and Zapier. From lead capture to follow-up sequences — fully hands-free.", cls: "purple bento-featured" },
              { icon: "🧠", title: "AI Agent Development", desc: "Custom AI agents powered by RAG, LLMs, and vector databases. They understand context, retrieve knowledge, and take action.", cls: "orange" },
              { icon: "🔗", title: "API & Data Integration", desc: "Seamlessly connect your CRM, databases, payment systems, and third-party APIs into one unified data pipeline.", cls: "teal" },
              { icon: "📊", title: "Business Process Automation", desc: "Automate repetitive tasks — invoicing, reporting, data entry, email follow-ups — so your team focuses on growth.", cls: "gold bento-featured" },
              { icon: "💬", title: "Chatbot & Conversational AI", desc: "Build intelligent chatbots that handle customer queries, qualify leads, and integrate with your existing systems 24/7.", cls: "pink" },
              { icon: "📈", title: "Automation Consulting", desc: "Not sure where to start? I'll audit your workflows, find bottlenecks, and design a custom automation roadmap.", cls: "blue" },
              { icon: "🎯", title: "Lead Gen & Email Automation", desc: "Automated lead capture, nurturing sequences, cold outreach, and follow-up pipelines — turning prospects into paying clients on autopilot.", cls: "purple" },
            ].map((s, i) => (
              <div className={`strategy-card ${s.cls}`} key={i}>
                <div className="card-icon">{s.icon}</div>
                <h3 className="card-title">{s.title}</h3>
                <div className="card-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={{ marginBottom: "80px" }}>
          <p className="section-label">Tech Stack</p>
          <h2 className="section-title">Tools & Technologies<br />I Work With</h2>
          <div className="premium-section">
            <p style={{ color: "var(--muted)", fontSize: "14px", maxWidth: "600px", lineHeight: "1.7" }}>Every tool is chosen for a reason. Here&apos;s the stack I use to build automation systems that are fast, reliable, and scalable.</p>
            <div className="premium-grid">
              {[
                { icon: "⚙️", title: "n8n", desc: "My primary automation platform. Self-hosted, powerful, and endlessly customizable for complex multi-step workflows." },
                { icon: "🔮", title: "Make (Integromat)", desc: "Visual workflow builder for connecting 1000+ apps. Perfect for complex scenarios with branching logic and error handling." },
                { icon: "⚡", title: "Zapier", desc: "Quick and reliable for straightforward automations. 6000+ app integrations with zero-code simplicity." },
                { icon: "🐍", title: "Python & APIs", desc: "Custom scripts and API integrations when off-the-shelf solutions aren't enough. Webhooks, REST APIs, data processing." },
                { icon: "🧠", title: "AI / LLMs / RAG", desc: "OpenAI, Gemini, Claude, vector databases — building retrieval-augmented AI systems that actually understand your data." },
                { icon: "🗄️", title: "Databases & CRM", desc: "Airtable, Supabase, PostgreSQL, HubSpot, GoHighLevel — data management and customer relationship automation." },
              ].map((t, i) => (
                <div className="premium-feature" key={i}>
                  <div className="pf-icon">{t.icon}</div>
                  <div className="pf-title">{t.title}</div>
                  <div className="pf-desc">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "60px" }}>
            <p className="section-label">Expertise</p>
            <h2 className="section-title" style={{ fontSize: "clamp(24px, 4vw, 36px)", marginBottom: "24px" }}>Core Skills & Capabilities</h2>
          </div>
          <div className="timing-table">
            <div className="timing-row header"><span>Skill</span><span>Proficiency</span><span>Context</span></div>
            {[
              { skill: "AI Workflow Automation", stars: "★★★★★", ctx: "n8n, Make, Zapier — complex multi-step business workflows", cls: "c-purple" },
              { skill: "RAG & AI Agents", stars: "★★★★★", ctx: "Retrieval-Augmented Generation, vector databases, autonomous agents", cls: "c-teal" },
              { skill: "API Integration", stars: "★★★★★", ctx: "REST APIs, webhooks, custom HTTP nodes, OAuth flows", cls: "c-orange" },
              { skill: "Data Pipeline Automation", stars: "★★★★☆", ctx: "ETL processes, data transformation, database orchestration", cls: "c-gold" },
              { skill: "Python Scripting", stars: "★★★★☆", ctx: "Custom scripts, data processing, API wrappers, web scraping", cls: "c-pink" },
              { skill: "SEO & Digital Marketing", stars: "★★★★☆", ctx: "On-page, off-page, technical SEO, content strategy automation", cls: "c-blue" },
            ].map((r, i) => (
              <div className="timing-row" key={i}>
                <span className={`timing-day ${r.cls}`}>{r.skill}</span>
                <span className="timing-time">{r.stars}</span>
                <span className="timing-why">{r.ctx}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" style={{ marginBottom: "20px" }}>
          <p className="section-label">My Process</p>
          <h2 className="section-title">How I Build Your<br />Automation System</h2>
        </section>
        <div className="authority-list" style={{ marginBottom: "80px" }}>
          {[
            { num: "01", title: "Discovery & Audit", desc: "We start with a deep-dive into your current workflows. I identify bottlenecks, repetitive tasks, and opportunities where automation can save you the most time and money." },
            { num: "02", title: "Strategy & Architecture", desc: "I design a custom automation blueprint tailored to your business. Every workflow is mapped out before a single node is placed — no guesswork, just precision." },
            { num: "03", title: "Build & Integrate", desc: "I build the automation system, connect all your tools, set up error handling, and ensure everything runs smoothly in production. Tested. Reliable. Bulletproof." },
            { num: "04", title: "Launch & Optimize", desc: "Once live, I monitor performance, optimize for speed, and iterate based on real data. Automation isn't set-and-forget — it's set-and-improve." },
          ].map((item, i) => (
            <div className="authority-item" key={i}>
              <div className="authority-num">{item.num}</div>
              <div><h3 className="authority-title">{item.title}</h3><div className="authority-desc">{item.desc}</div></div>
            </div>
          ))}
        </div>

        {/* EXPERIENCE */}
        <section id="experience" style={{ marginBottom: "20px" }}>
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I&apos;ve Made<br />An Impact</h2>
        </section>
        <div className="week-grid" style={{ marginBottom: "80px" }}>
          {[
            { name: "Spider Themes", nameCls: "c-purple", tag: "Current", tagCls: "tag-purple", role: "Automation Specialist", dotCls: "bg-purple", roleCls: "c-purple", desc: "Building and managing intelligent automation workflows for the entire product ecosystem. CRM automation, support ticket routing, deployment pipelines.", date: "Sep 2025 – Present · Full-time" },
            { name: "n8n", nameCls: "c-teal", tag: "Freelance", tagCls: "tag-teal", role: "Developer", dotCls: "bg-teal", roleCls: "c-teal", desc: "Designing and developing custom n8n workflows for businesses worldwide. AI automation, API integrations, data pipeline orchestration, and RAG-based AI agents.", date: "Aug 2024 – Present · 1yr 7mos" },
            { name: "Freelance SEO", nameCls: "c-orange", tag: "Self Employed", tagCls: "tag-orange", role: "SEO Specialist", dotCls: "bg-orange", roleCls: "c-orange", desc: "On-Page, Off-Page, Technical & Local SEO. Keyword research, meta optimization, backlink building, and implementing SEO strategies for client projects.", date: "Feb 2024 – Present · 2yrs+" },
            { name: "Education", nameCls: "c-gold", tag: "Bachelor's", tagCls: "tag-gold", role: "Brahmanbaria Govt. College", dotCls: "bg-gold", roleCls: "c-gold", desc: "Bachelor's Degree in Islamic Studies. Winner of the Annual Quran Recitation Competition.", date: "2020 – 2024" },
          ].map((exp, i) => (
            <div className="day-card" key={i}>
              <div className="day-header">
                <span className={`day-name ${exp.nameCls}`}>{exp.name}</span>
                <span className={`day-theme-tag ${exp.tagCls}`}>{exp.tag}</span>
              </div>
              <div className="day-body">
                <div className="post-item">
                  <span className={`post-type-dot ${exp.dotCls}`}></span>
                  <div className="post-content">
                    <div className={`post-type ${exp.roleCls}`}>{exp.role}</div>
                    <div className="post-hook">{exp.desc}</div>
                    <div className="post-note">{exp.date}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SHOWCASE */}
        <section id="showcase" style={{ marginBottom: "20px" }}>
          <p className="section-label">Work Showcase</p>
          <h2 className="section-title">See My Automations<br />in Action</h2>
        </section>
        <div className="showcase-intro" style={{ marginBottom: "40px" }}>
          <p style={{ color: "var(--muted)", fontSize: "14px", maxWidth: "600px", lineHeight: "1.7" }}>Real workflows. Real results. Watch how I build intelligent automation systems using n8n, AI agents, and API integrations that save hours every day.</p>
        </div>
        <div className="video-grid" style={{ marginBottom: "80px" }}>
          <VideoCard videoId="YOUR_YOUTUBE_VIDEO_ID_1" tag="n8n Workflow" tagClass="tag-purple" title="AI Lead Generation Automation" desc="Full end-to-end lead capture, qualification, and CRM sync using n8n and OpenAI agents." />
          <VideoCard videoId="YOUR_YOUTUBE_VIDEO_ID_2" tag="AI Agent" tagClass="tag-teal" title="RAG-Based Knowledge Base Agent" desc="Custom AI agent with retrieval-augmented generation — answers questions from your own documents." />
          <VideoCard videoId="YOUR_YOUTUBE_VIDEO_ID_3" tag="API Integration" tagClass="tag-orange" title="Multi-App Data Pipeline" desc="Connecting CRM, email, spreadsheet, and payment systems into one unified automation pipeline." />
          <VideoCard videoId="YOUR_YOUTUBE_VIDEO_ID_4" tag="Chatbot" tagClass="tag-pink" title="Intelligent Customer Support Bot" desc="AI-powered chatbot that handles inquiries, routes tickets, and integrates with your helpdesk 24/7." />
        </div>

        {/* WHY ME */}
        <section style={{ marginBottom: "20px" }}>
          <p className="section-label">Why Me</p>
          <h2 className="section-title">What You Get When<br />You Work With Me</h2>
        </section>
        <div className="hooks-grid" style={{ marginBottom: "80px" }}>
          {[
            { num: "01 — SPEED", text: '"Your automation isn\'t done in months — it\'s done in days. I move fast because I\'ve built it before."', ctx: "Fast turnaround without cutting corners", tag: "Delivery", tagCls: "tag-purple" },
            { num: "02 — RELIABILITY", text: '"Every workflow has error handling, fallbacks, and monitoring built in. It doesn\'t just work — it stays working."', ctx: "Production-grade systems, not prototypes", tag: "Trust", tagCls: "tag-teal" },
            { num: "03 — ROI FOCUSED", text: '"I don\'t automate for the sake of automating. Every workflow is designed to save time, cut costs, or generate revenue."', ctx: "Business results, not just technical output", tag: "Results", tagCls: "tag-orange" },
            { num: "04 — COMMUNICATION", text: '"You\'ll always know what\'s happening — clear updates, documented workflows, and zero surprises."', ctx: "Transparent collaboration from start to finish", tag: "Clarity", tagCls: "tag-blue" },
            { num: "05 — AI NATIVE", text: '"I don\'t just use AI buzzwords — I build real AI agents with RAG, vector search, and intelligent decision-making."', ctx: "Cutting-edge AI that actually delivers", tag: "Innovation", tagCls: "tag-pink" },
            { num: "06 — FULL STACK", text: '"From strategy to deployment to optimization — I handle the entire automation lifecycle, end to end."', ctx: "One expert for the whole journey", tag: "Complete", tagCls: "tag-gold" },
          ].map((h, i) => (
            <div className="hook-card" key={i}>
              <div className="hook-number">{h.num}</div>
              <div className="hook-text">{h.text}</div>
              <div className="hook-context">{h.ctx}</div>
              <span className={`problem-tag ${h.tagCls}`}>{h.tag}</span>
            </div>
          ))}
        </div>

        {/* TESTIMONIALS */}
        <section style={{ marginBottom: "20px" }}>
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">What Clients<br />Say About Me</h2>
        </section>
        <div className="testimonials-grid" style={{ marginBottom: "80px" }}>
          {[
            { stars: "★★★★★", text: "Shafiqur built us a complete lead capture and CRM automation in under a week. What used to take my team 3 hours daily now runs on autopilot. Absolutely game-changing for our agency.", name: "James Mitchell", role: "Founder · Digital Agency, USA", initials: "JM", avatarStyle: { background: "rgba(108,71,255,0.15)", color: "var(--accent)" }, tag: "n8n", tagCls: "tag-purple" },
            { stars: "★★★★★", text: "The RAG-based AI agent he built for our knowledge base is impressive — it answers support tickets with context from our docs. Our response time dropped by 70%. Highly recommend.", name: "Sophie Raines", role: "CTO · SaaS Company, UK", initials: "SR", avatarStyle: { background: "rgba(0,212,170,0.15)", color: "var(--accent3)" }, tag: "AI Agent", tagCls: "tag-teal" },
            { stars: "★★★★★", text: "Professional, fast, and communicates clearly throughout the project. He automated our entire e-commerce reporting pipeline — from orders to Google Sheets to Slack. Zero manual work now.", name: "Adam Klein", role: "E-commerce Owner · Europe", initials: "AK", avatarStyle: { background: "rgba(255,107,53,0.15)", color: "var(--accent2)" }, tag: "Make", tagCls: "tag-orange" },
          ].map((t, i) => (
            <div className="testimonial-card fade-in" key={i}>
              <div className="testimonial-stars" aria-label="5 out of 5 stars">{t.stars}</div>
              <div className="testimonial-text">{t.text}</div>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={t.avatarStyle}>{t.initials}</div>
                <div><div className="testimonial-name">{t.name}</div><div className="testimonial-role">{t.role}</div></div>
                <span className={`testimonial-tag ${t.tagCls}`}>{t.tag}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CONTACT */}
        <section id="contact" style={{ marginBottom: "20px" }}>
          <p className="section-label">Get Started</p>
          <h2 className="section-title">Ready to Automate<br />Your Business?</h2>
        </section>
        <div className="premium-section" style={{ marginBottom: "80px", textAlign: "center" }}>
          <div style={{ maxWidth: "650px", margin: "0 auto" }}>
            <p style={{ color: "var(--text)", fontSize: "17px", lineHeight: "1.8", marginBottom: "24px", fontFamily: "'Instrument Serif', serif" }}>
              Stop wasting hours on tasks a machine can do better. Let&apos;s build an automation system that runs your business on autopilot — smarter, faster, and cheaper.
            </p>
            <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: "1.7", marginBottom: "28px" }}>Book a free 30-minute strategy call. I&apos;ll audit your current workflows and show you exactly where automation can save you time and money.</p>
            <div style={{ marginBottom: "32px" }}>
              <a href="mailto:shafiqur.dev@gmail.com?subject=Free%20Strategy%20Call%20Request" className="btn-book-call" id="contact-book-call">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Book a Free 30-Min Strategy Call
              </a>
            </div>
            <div className="trust-badges">
              <a href="https://www.fiverr.com/YOUR_FIVERR_USERNAME" target="_blank" rel="noopener" className="trust-badge fiverr-badge" id="contact-fiverr-badge" title="View Fiverr Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-1.33C19.948 7.724 16.187 4 11.5 4H5V2H3v2H1.996a.996.996 0 0 0 0 1.991H3V8H1.996a.996.996 0 0 0 0 1.992H3v1.632C1.302 12.21 0 13.968 0 16.05c0 2.773 2.249 5.02 5.02 5.02 2.765 0 5.01-2.239 5.02-5h1.418c.462 3.133 3.14 5.537 6.375 5.537 3.565 0 6.458-2.897 6.458-6.462h1.108a.996.996 0 0 0 .996-.996v-1.27a.997.997 0 0 0-.387-.996z" /></svg>
                <div className="trust-badge-info"><span className="trust-badge-name">Fiverr</span><span className="trust-badge-rating">⭐ 5.0 · Top Rated</span></div>
              </a>
              <a href="https://www.upwork.com/freelancers/YOUR_UPWORK_PROFILE" target="_blank" rel="noopener" className="trust-badge upwork-badge" id="contact-upwork-badge" title="View Upwork Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H8.557v7.094c-.002 1.408-1.144 2.549-2.555 2.549-1.408 0-2.553-1.14-2.555-2.549V3.492H1.434v7.094c0 2.695 2.199 4.886 4.92 4.886 2.72 0 4.918-2.191 4.918-4.886V9.77c.528 1.107 1.187 2.244 1.968 3.281L12.055 19.58h2.021l1.05-3.636c.923.667 1.948 1.013 3.035 1.013 2.821 0 5.117-2.295 5.117-5.115 0-2.821-2.296-5.117-5.117-5.117z" /></svg>
                <div className="trust-badge-info"><span className="trust-badge-name">Upwork</span><span className="trust-badge-rating">⭐ Top Rated</span></div>
              </a>
            </div>
            <div className="contact-info-grid">
              <div className="contact-info-item">
                <div className="contact-info-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg></div>
                <div className="contact-info-label">Email</div>
                <a href="mailto:shafiqur.dev@gmail.com" className="contact-info-value">shafiqur.dev@gmail.com</a>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" /></svg></div>
                <div className="contact-info-label">Phone</div>
                <a href="tel:+8801600534507" className="contact-info-value">+8801600-534507</a>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg></div>
                <div className="contact-info-label">WhatsApp</div>
                <a href="https://wa.me/8801600534507" target="_blank" rel="noopener" className="contact-info-value">Chat on WhatsApp</a>
              </div>
            </div>
            <div className="contact-social-bar">
              {[
                { href: "https://www.linkedin.com/in/automation-by-shafiq/", cls: "linkedin", title: "LinkedIn", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                { href: "https://facebook.com/YOUR_FACEBOOK", cls: "facebook", title: "Facebook", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
                { href: "https://wa.me/8801600534507", cls: "whatsapp", title: "WhatsApp", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener" className={`social-icon-link ${s.cls}`} title={s.title}>{s.icon}</a>
              ))}
            </div>
          </div>
        </div>

        {/* METRICS */}
        <section style={{ marginBottom: "20px" }}>
          <p className="section-label">Impact</p>
          <h2 className="section-title">Numbers That Speak</h2>
        </section>
        <div className="strategy-grid" style={{ marginBottom: "80px" }}>
          {[
            { icon: "🚀", title: "50+ Workflows Built", desc: "Complex multi-step automation systems deployed across industries — from e-commerce to SaaS to agencies.", cls: "teal" },
            { icon: "⏱️", title: "1000+ Hours Saved", desc: "Cumulative time saved for clients by eliminating manual, repetitive tasks through intelligent automation.", cls: "purple" },
            { icon: "🌍", title: "20+ Global Clients", desc: "Working with businesses from the US, UK, Europe, and Asia — building automation without borders.", cls: "orange" },
          ].map((m, i) => (
            <div className={`strategy-card ${m.cls}`} key={i}>
              <div className="card-icon">{m.icon}</div>
              <h3 className="card-title">{m.title}</h3>
              <div className="card-desc">{m.desc}</div>
            </div>
          ))}
        </div>

        <Footer />
      </div>

      <ScrollToTop />
      <MobileBottomNav />
    </>
  );
}
