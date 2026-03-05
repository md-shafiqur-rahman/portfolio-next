"use client";
import { useEffect } from "react";

export default function CustomCursor() {
    useEffect(() => {
        const dot = document.getElementById("cursor-dot");
        const ring = document.getElementById("cursor-ring");
        if (!dot || !ring) return;
        if (window.matchMedia("(pointer: coarse)").matches) {
            dot.style.display = "none";
            ring.style.display = "none";
            document.body.style.cursor = "auto";
            return;
        }
        let mouseX = -200, mouseY = -200, ringX = -200, ringY = -200;
        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX; mouseY = e.clientY;
            dot.style.left = mouseX + "px"; dot.style.top = mouseY + "px";
        };
        document.addEventListener("mousemove", onMove);
        let raf: number;
        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.12; ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + "px"; ring.style.top = ringY + "px";
            raf = requestAnimationFrame(animateRing);
        };
        animateRing();
        const onDown = () => dot.classList.add("clicking");
        const onUp = () => dot.classList.remove("clicking");
        document.addEventListener("mousedown", onDown);
        document.addEventListener("mouseup", onUp);
        const addHover = (el: Element) => {
            el.addEventListener("mouseenter", () => { dot.classList.add("hover"); ring.classList.add("hover"); });
            el.addEventListener("mouseleave", () => { dot.classList.remove("hover"); ring.classList.remove("hover"); });
        };
        document.querySelectorAll("a, button").forEach(addHover);
        return () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("mouseup", onUp);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" id="cursor-dot"></div>
            <div className="cursor-ring" id="cursor-ring"></div>
        </>
    );
}
