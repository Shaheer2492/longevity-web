"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      // Hide when scrolling down past 100px, show when scrolling up
      if (currentY > 100 && currentY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "#4CAF7D",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
            <path d="M12 7v5l3.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: scrolled ? "#1A1A1A" : "#FFFFFF",
            transition: "color 0.3s ease",
            letterSpacing: "-0.02em",
          }}
        >
          Longevity
        </span>
      </div>

      {/* Nav pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 8px",
          borderRadius: 50,
          background: scrolled
            ? "rgba(245,245,245,0.9)"
            : "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "background 0.3s ease",
        }}
      >
        {["About us", "Blog", "Download App"].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              padding: "8px 18px",
              borderRadius: 50,
              fontSize: 14,
              fontWeight: 500,
              color: scrolled ? "#1A1A1A" : "#FFFFFF",
              textDecoration: "none",
              transition: "background 0.2s ease, color 0.3s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = scrolled
                ? "rgba(0,0,0,0.05)"
                : "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            {item}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#register"
        style={{
          padding: "10px 24px",
          borderRadius: 50,
          fontSize: 14,
          fontWeight: 600,
          background: "#4CAF7D",
          color: "#FFFFFF",
          textDecoration: "none",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          boxShadow: "0 2px 12px rgba(76,175,125,0.3)",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.transform = "translateY(-1px)";
          (e.target as HTMLElement).style.boxShadow =
            "0 4px 20px rgba(76,175,125,0.4)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.transform = "translateY(0)";
          (e.target as HTMLElement).style.boxShadow =
            "0 2px 12px rgba(76,175,125,0.3)";
        }}
      >
        Register
      </a>
    </motion.nav>
  );
}
