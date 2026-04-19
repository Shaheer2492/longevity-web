"use client";

import { useEffect, useState } from "react";
import Logo from "../ui/Logo";

const LINKS = [
  { href: "#problem", label: "The problem" },
  { href: "#solution", label: "How it works" },
  { href: "#credibility", label: "Science" },
  { href: "#score", label: "The score" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={scrolled ? "scrolled" : ""}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "color-mix(in oklab, var(--bg) 82%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
        borderBottom: scrolled ? "1px solid var(--hair)" : "1px solid transparent",
        transition:
          "background 320ms ease, border-color 320ms ease, backdrop-filter 320ms ease",
      }}
    >
      <a
        href="#top"
        style={{ textDecoration: "none", color: "var(--ink)" }}
        aria-label="Longevity home"
      >
        <Logo fontSize={20} size={22} />
      </a>

      <div
        className="nav-links"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="nav-link"
            style={{
              fontSize: 14,
              color: "var(--ink-2)",
              textDecoration: "none",
              fontWeight: 400,
              transition: "color 160ms ease",
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#final-cta"
          onClick={() => {
            if (typeof window !== "undefined") {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (window as any).dataLayer?.push?.({ event: "nav_cta_click" });
            }
          }}
          style={{
            padding: "10px 18px",
            borderRadius: 999,
            background: "var(--ink)",
            color: "var(--bg)",
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          Get early access →
        </a>
      </div>

      <style jsx>{`
        .nav-link:hover {
          color: var(--ink);
        }
        @media (max-width: 700px) {
          .nav-links :global(.nav-link) {
            display: none;
          }
          .nav-links {
            gap: 12px !important;
          }
        }
      `}</style>
    </nav>
  );
}
