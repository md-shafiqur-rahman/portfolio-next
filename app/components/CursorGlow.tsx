"use client";
import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    const el = document.getElementById("cursor-glow");
    if (!el) return;
    let mx = 0, my = 0, gx = 0, gy = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMove);
    let raf: number;
    const animate = () => {
      gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08;
      el.style.left = gx + "px"; el.style.top = gy + "px";
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return <div id="cursor-glow"></div>;
}
