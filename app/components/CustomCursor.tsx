"use client";
import { useEffect } from "react";

export default function CustomCursor() {
    useEffect(() => {
        const ring = document.getElementById("cursor-ring");
        if (!ring) return;

        // Disable on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            ring.style.display = "none";
            return;
        }

        let mouseX = -200, mouseY = -200;
        let ringX = -200, ringY = -200;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        document.addEventListener("mousemove", onMove);

        let raf: number;
        const animateRing = () => {
            // Smooth lag follow for the ring
            ringX += (mouseX - ringX) * 0.14;
            ringY += (mouseY - ringY) * 0.14;
            ring.style.left = ringX + "px";
            ring.style.top = ringY + "px";
            raf = requestAnimationFrame(animateRing);
        };
        animateRing();

        // Hover effect on interactive elements
        const addHover = (el: Element) => {
            el.addEventListener("mouseenter", () => ring.classList.add("hover"));
            el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
        };
        document.querySelectorAll("a, button").forEach(addHover);

        return () => {
            document.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            {/* cursor-dot is hidden via CSS; only the decorative ring is shown */}
            <div className="cursor-dot" id="cursor-dot" />
            <div className="cursor-ring" id="cursor-ring" />
        </>
    );
}
