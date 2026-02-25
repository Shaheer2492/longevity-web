"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Cardiologist, Stanford Medical",
    quote:
      "Longevity bridges the gap between clinical data and daily wellness. The recovery insights are remarkably accurate.",
    avatar: "SC",
  },
  {
    name: "James Thornton",
    role: "Ultra-Marathon Runner",
    quote:
      "I've tried every health app. Longevity is the first one that actually helped me understand my body's readiness day to day.",
    avatar: "JT",
  },
  {
    name: "Dr. Anika Patel",
    role: "Longevity Researcher, MIT",
    quote:
      "The science behind this app is solid. It's the consumer health platform I recommend to anyone serious about healthspan.",
    avatar: "AP",
  },
];

export default function Testimonials() {
  return (
    <section
      style={{
        background: "#F7F6F3",
        padding: "120px 24px",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: "center",
          maxWidth: 600,
          margin: "0 auto 64px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(36px, 4.5vw, 56px)",
            fontWeight: 800,
            color: "#1A1A1A",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Trusted by Experts
        </h2>
        <p style={{ fontSize: 18, color: "#6B6B6B", lineHeight: 1.65 }}>
          Leading physicians, researchers, and athletes rely on Longevity to
          understand their health at the deepest level.
        </p>
      </motion.div>

      {/* Cards */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 28,
        }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              padding: 32,
              borderRadius: 20,
              background: "#FFFFFF",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.05)";
            }}
          >
            {/* Quote icon */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M6 18h6l-4 8h4l4-8V8H6v10zm14 0h6l-4 8h4l4-8V8H20v10z"
                fill="#E8F5EE"
              />
            </svg>

            <p
              style={{
                fontSize: 16,
                color: "#1A1A1A",
                lineHeight: 1.7,
                flex: 1,
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Avatar */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #4CAF7D, #2E7D52)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                {t.avatar}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>
                  {t.name}
                </div>
                <div style={{ fontSize: 13, color: "#AAAAAA" }}>{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
