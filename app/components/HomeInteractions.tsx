"use client";
import { useEffect } from "react";

/**
 * This invisible client component runs DOM side-effects on the server-rendered
 * homepage content: fade-in animations and magnetic button hover effects.
 * It renders nothing — just attaches observers and event listeners after hydration.
 */
export default function HomeInteractions() {
  // ── Fade-in & reveal animations ──
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll(".strategy-card, .day-card, .hook-card, .authority-item, .premium-feature, .highlight-item, .testimonial-card").forEach(el => {
      el.classList.add("fade-in"); obs.observe(el);
    });
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); revObs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
    document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .section-label, .section-title").forEach((el, i) => {
      el.classList.add("reveal-up");
      (el as HTMLElement).style.transitionDelay = (i * 0.05) + "s";
      revObs.observe(el);
    });
    return () => { obs.disconnect(); revObs.disconnect(); };
  }, []);

  // ── Magnetic button hover effect ──
  useEffect(() => {
    const btns = document.querySelectorAll<HTMLElement>(".btn-primary, .btn-secondary, .btn-book-call");
    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];
    btns.forEach(btn => {
      const move = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.25;
        btn.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`;
      };
      const leave = () => {
        btn.style.transition = "transform 0.4s cubic-bezier(0.4,0,0.2,1)";
        btn.style.transform = "";
        setTimeout(() => { btn.style.transition = ""; }, 400);
      };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      handlers.push({ el: btn, move, leave });
    });
    return () => handlers.forEach(({ el, move, leave }) => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); });
  }, []);

  return null;
}
