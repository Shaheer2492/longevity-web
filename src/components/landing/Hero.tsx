"use client";

import { useEffect, useState } from "react";
import Reveal from "../ui/Reveal";
import WaitlistForm from "../ui/WaitlistForm";
import DataScene from "./DataScene";
import InsightCard from "./InsightCard";

const EDGE_LABELS: { label: string; style: React.CSSProperties }[] = [
  { label: "Sleep stages", style: { left: "2%", top: "14%" } },
  {
    label: "Resting HR",
    style: { left: "98%", top: "18%", transform: "translate(-100%, 0)" },
  },
  { label: "Meal timing", style: { left: "2%", top: "74%" } },
  {
    label: "Workout load",
    style: { left: "98%", top: "78%", transform: "translate(-100%, 0)" },
  },
  {
    label: "Lab markers",
    style: { left: "50%", top: "2%", transform: "translate(-50%, 0)" },
  },
];

const CONNECTS = [
  { text: "your watch", italic: true },
  { text: "your ring", italic: false },
  { text: "your lab PDFs", italic: true },
  { text: "your meals", italic: false },
  { text: "your workouts", italic: true },
  { text: "your sleep", italic: false },
];

export default function Hero() {
  const [phase, setPhase] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="top"
      style={{
        position: "relative",
        paddingTop: 140,
        paddingBottom: 80,
        overflow: "hidden",
      }}
    >
      {/* Ambient gradient background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: mounted ? 1 : 0,
          transition: "opacity 1600ms ease",
          background:
            "radial-gradient(900px 520px at 70% 20%, color-mix(in oklab, var(--accent) 14%, transparent) 0%, transparent 70%), radial-gradient(800px 460px at 10% 80%, color-mix(in oklab, var(--sage) 18%, transparent) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Left column */}
          <div>
            <Reveal delay={0}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 24,
                }}
              >
                <span className="dot-accent breathe" />
                <span className="mono">HEALTH INTELLIGENCE · EST. 2026</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="h-display" style={{ marginBottom: 24 }}>
                Know exactly what to do
                <br />
                about your <em className="accent-em">health</em> this week.
              </h1>
            </Reveal>

            <Reveal delay={240}>
              <p className="body-lg" style={{ marginBottom: 32 }}>
                Longevity connects your wearables, labs, and habits, then tells
                you the single most important thing to change this week. Backed
                by longevity science. Not guesswork.
              </p>
            </Reveal>

            <Reveal delay={340}>
              <WaitlistForm compact source="hero" id="hero-waitlist" />
            </Reveal>

            <Reveal delay={460}>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  flexWrap: "wrap",
                  marginTop: 22,
                }}
              >
                {[
                  "No credit card",
                  "1,240+ on the waitlist",
                  "Works with every wearable",
                ].map((t) => (
                  <span
                    key={t}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 12,
                      color: "var(--muted)",
                    }}
                  >
                    <span className="dot-accent" />
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right column - DataScene + InsightCard */}
          <div
            className="hero-visual"
            style={{
              position: "relative",
              height: 560,
              width: "100%",
            }}
          >
            <p
              style={{
                position: "absolute",
                left: -9999,
                top: -9999,
              }}
            >
              A visualization of health data converging into a single insight.
            </p>

            <DataScene intensity={0.7} onPhase={setPhase} />

            {/* Edge labels */}
            {EDGE_LABELS.map((l) => (
              <span
                key={l.label}
                style={{
                  position: "absolute",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--muted)",
                  whiteSpace: "nowrap",
                  opacity: phase > 0.9 ? 0.5 : 1,
                  transition: "opacity 800ms ease",
                  ...l.style,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    background: "var(--muted)",
                    display: "inline-block",
                    opacity: 0.7,
                  }}
                />
                {l.label}
              </span>
            ))}

            <InsightCard visible={phase > 0.75} />
          </div>
        </div>

        {/* Connects strip */}
        <div
          className="connects-strip"
          style={{
            marginTop: 72,
            paddingTop: 24,
            borderTop: "1px solid var(--hair)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <span className="mono" style={{ color: "var(--muted)" }}>
            CONNECTS WITH
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 18,
              fontFamily: "var(--font-serif)",
              fontSize: 18,
              color: "var(--ink-2)",
            }}
          >
            {CONNECTS.map((c, i) => (
              <span key={c.text} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontStyle: c.italic ? "italic" : "normal" }}>
                  {c.text}
                </span>
                {i < CONNECTS.length - 1 && (
                  <span style={{ color: "var(--muted)", fontSize: 14 }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-visual {
            height: 440px !important;
          }
        }
      `}</style>
    </section>
  );
}
