"use client";
import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener("resize", resize);

        const COLORS = ["rgba(108, 71, 255,", "rgba(0, 212, 170,", "rgba(255, 107, 53,"];
        const COUNT = 55;

        class Particle {
            x = 0; y = 0; size = 0; speedX = 0; speedY = 0;
            color = ""; alpha = 0; life = 0; maxLife = 0;
            twinkle = 0; currentAlpha = 0;
            constructor() { this.reset(true); }
            reset(randomY = false) {
                this.x = Math.random() * canvas!.width;
                this.y = randomY ? Math.random() * canvas!.height : canvas!.height + 10;
                this.size = Math.random() * 1.8 + 0.4;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = -(Math.random() * 0.5 + 0.2);
                this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
                this.alpha = Math.random() * 0.5 + 0.1;
                this.life = 0; this.maxLife = Math.random() * 300 + 200;
                this.twinkle = Math.random() * Math.PI * 2;
            }
            update() {
                this.x += this.speedX; this.y += this.speedY; this.life++;
                this.twinkle += 0.03;
                this.currentAlpha = this.alpha * (0.7 + 0.3 * Math.sin(this.twinkle));
                if (this.life > this.maxLife || this.y < -10) this.reset();
            }
            draw() {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx!.fillStyle = this.color + this.currentAlpha + ")";
                ctx!.fill();
            }
        }

        const particles = Array.from({ length: COUNT }, () => new Particle());
        let raf: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            raf = requestAnimationFrame(animate);
        };
        animate();

        return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
    }, []);

    return <canvas ref={canvasRef} id="particle-canvas"></canvas>;
}
