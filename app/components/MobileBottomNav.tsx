"use client";
import { useEffect, useState } from "react";

export default function MobileBottomNav() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const map: Record<string, string> = { hero: "home", about: "about", services: "services", showcase: "work", contact: "contact" };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting && map[e.target.id]) setActive(map[e.target.id]); });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    document.querySelectorAll("section[id], header[id]").forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  const link = (id: string, label: string, icon: React.ReactNode, isCta = false) => (
    <a href={`#${id === "home" ? "hero" : id === "work" ? "showcase" : id}`}
      className={`mbn-link${isCta ? " mbn-cta" : ""}${active === id && !isCta ? " active" : ""}`}
      onClick={(e) => { e.preventDefault(); const t = document.querySelector(`#${id === "home" ? "hero" : id === "work" ? "showcase" : id}`); if (t) window.scrollTo({ top: (t as HTMLElement).getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" }); }}>
      {icon}{label}
    </a>
  );
  return (
    <nav className="mobile-bottom-nav" id="mobile-bottom-nav" aria-label="Mobile bottom navigation">
      <div className="mobile-bottom-nav-inner">
        {link("home", "Home", <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>)}
        {link("about", "About", <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" /></svg>)}
        {link("services", "Services", <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>)}
        {link("work", "Work", <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>)}
        {link("contact", "Talk", <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 4.69 13 19.5 19.5 0 0 1 1.62 3.62 2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" /></svg>, true)}
      </div>
    </nav>
  );
}
