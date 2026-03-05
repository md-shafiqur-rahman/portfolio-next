"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ blogPage = false }: { blogPage?: boolean }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = 100;
                const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top, behavior: "smooth" });
            }
            setMenuOpen(false);
        }
    };

    const prefix = blogPage ? "/" : "";

    return (
        <nav id="main-nav" className={scrolled ? "nav-scrolled" : ""}>
            <div className="nav-brand">
                <div className="logo-wrapper">
                    <Link href="/">
                        <Image src="/logo-shafiqur.png" alt="Shafiqur Logo" width={280} height={280} className="logo-img" />
                    </Link>
                </div>
            </div>
            <div className={`nav-links${menuOpen ? " mobile-open" : ""}`}>
                <Link href={`${prefix}#hero`} className="nav-link" onClick={(e) => !blogPage && handleNavClick(e, "#hero")}>Home</Link>
                <Link href={`${prefix}#about`} className="nav-link" onClick={(e) => !blogPage && handleNavClick(e, "#about")}>About</Link>
                <Link href={`${prefix}#services`} className="nav-link" onClick={(e) => !blogPage && handleNavClick(e, "#services")}>Services</Link>
                <Link href={`${prefix}#skills`} className="nav-link" onClick={(e) => !blogPage && handleNavClick(e, "#skills")}>Skills</Link>
                <Link href={`${prefix}#process`} className="nav-link" onClick={(e) => !blogPage && handleNavClick(e, "#process")}>Process</Link>
                <Link href={`${prefix}#experience`} className="nav-link" onClick={(e) => !blogPage && handleNavClick(e, "#experience")}>Experience</Link>
                <Link href={`${prefix}#showcase`} className="nav-link" onClick={(e) => !blogPage && handleNavClick(e, "#showcase")}>Showcase</Link>
                <Link href="/blog" className={`nav-link${blogPage ? " active" : ""}`}>Blog</Link>
                <Link href={`${prefix}#contact`} className="nav-link cta-link" onClick={(e) => !blogPage && handleNavClick(e, "#contact")}>Let&apos;s Talk</Link>
            </div>
            <button
                className={`mobile-menu-btn${menuOpen ? " is-open" : ""}`}
                id="mobile-menu-btn"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span><span></span><span></span>
            </button>
        </nav>
    );
}
