"use client";
import { useEffect, useState } from "react";

export default function Subtitle() {
  const [typed, setTyped] = useState("");
  const afterText = " — I build smart, scalable automation systems using n8n, Make, Zapier, APIs, and AI Agents that save time and multiply results for businesses.";
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < afterText.length) { setTyped(afterText.slice(0, ++i)); } else clearInterval(interval);
      }, 26);
      return () => clearInterval(interval);
    }, 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <p className="subtitle" id="hero-subtitle">
      I&apos;m <strong style={{ color: "var(--text)" }}>Md Shafiqur Rahman</strong>{typed}
    </p>
  );
}
