"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function WreathBadge({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderRadius: 50,
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      {/* Wreath SVG */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 21c-2-1-4-4-4-8 0-3 1.5-5.5 3-7"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M16 21c2-1 4-4 4-8 0-3-1.5-5.5-3-7"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="8" r="3" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
        <path d="M12 11v3" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "rgba(255,255,255,0.9)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const [email, setEmail] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setExpanded(false);
        setEmail("");
      }, 2500);
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 700,
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=2000&q=80"
        alt="Runner on sunlit hills"
        fill
        priority
        unoptimized
        style={{
          objectFit: "cover",
          objectPosition: "center 30%",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.7) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 24px 80px",
          maxWidth: 720,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(44px, 5.5vw, 72px)",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 20,
          }}
        >
          One Score.
          <br />
          Complete Clarity.
        </h1>

        <p
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.65,
            marginBottom: 36,
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Your wearables, workouts, and lab results — unified into a single,
          living health score. See exactly where you stand, what changed
          this week, and the one thing to focus on next.
        </p>

        {/* CTA */}
        <div
          id="register"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.button
                key="cta"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setExpanded(true)}
                style={{
                  padding: "16px 36px",
                  borderRadius: 50,
                  border: "none",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "background 0.2s ease, transform 0.2s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.25)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                }}
              >
                Register for Early Trial
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, scale: 0.95, width: 260 }}
                animate={{ opacity: 1, scale: 1, width: 420 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 50,
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  style={{
                    flex: 1,
                    padding: "14px 20px",
                    border: "none",
                    background: "transparent",
                    color: "#FFFFFF",
                    fontSize: 15,
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    margin: 4,
                    borderRadius: 50,
                    border: "none",
                    background: submitted ? "#4CAF7D" : "#FFFFFF",
                    color: submitted ? "#FFFFFF" : "#1A1A1A",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background 0.2s ease",
                    fontFamily: "inherit",
                  }}
                >
                  {submitted ? "✓ Registered!" : "Join →"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <WreathBadge label="Apple Watch Spotlight" />
            <WreathBadge label="New and Noteworthy" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
