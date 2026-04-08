"use client";
import { useEffect, useState } from "react";

export default function HeroTitle() {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(-1);
  const slides = [
    { text: ["Intelligent", "Automation", "Expert"], gradient: "linear-gradient(135deg, #ffffff 30%, #6c47ff 100%)" },
    { text: ["AI Workflow", "Architect"], gradient: "linear-gradient(135deg, #00d4aa 20%, #38bdf8 100%)" },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setExiting(current);
      const next = (current + 1) % slides.length;
      setCurrent(next);
      setTimeout(() => setExiting(-1), 650);
    }, 3500);
    return () => clearInterval(interval);
  }, [current]);
  return (
    <div className="hero-title-wrapper">
      <h1 className="hero-rotating-title">
        {slides.map((slide, i) => (
          <span key={i} className={`title-slide${i === current ? " active" : ""}${i === exiting ? " exit" : ""}`}
            style={{ background: slide.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {slide.text.map((line, j) => (<span key={j}>{line}{j < slide.text.length - 1 && <br />}</span>))}
          </span>
        ))}
      </h1>
    </div>
  );
}
