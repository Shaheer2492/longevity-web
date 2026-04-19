"use client";

import { useState } from "react";
import Reveal from "../ui/Reveal";
import ScoreRing from "./ScoreRing";

type Pillar = {
  key: string;
  name: string;
  value: number;
  color: string;
  subline: string;
  contributors: string[];
};

const PILLARS: Pillar[] = [
  {
    key: "cardio",
    name: "Cardio",
    value: 82,
    color: "var(--terra)",
    subline: "HRV, resting HR, recovery",
    contributors: [
      "Heart rate variability",
      "Resting heart rate",
      "Heart rate recovery",
      "Aerobic capacity trend",
    ],
  },
  {
    key: "fuel",
    name: "Fuel",
    value: 67,
    color: "var(--gold)",
    subline: "nutrition, hydration, timing",
    contributors: [
      "Protein adequacy",
      "Micronutrient gaps",
      "Meal timing consistency",
      "Hydration",
    ],
  },
  {
    key: "sleep",
    name: "Sleep",
    value: 91,
    color: "var(--sage)",
    subline: "deep, REM, consistency",
    contributors: [
      "Deep sleep minutes",
      "REM rhythm",
      "Onset consistency",
      "Efficiency %",
    ],
  },
  {
    key: "activity",
    name: "Activity",
    value: 74,
    color: "var(--ink)",
    subline: "volume, zone 2, balance",
    contributors: [
      "Weekly volume",
      "Zone 2 minutes",
      "VO2max trend",
      "Recovery balance",
    ],
  },
];

const DEFAULT_WIDTHS = [75, 58, 84, 66];

export default function ScoreBreakdown() {
  const [active, setActive] = useState(0);
  const pillar = PILLARS[active];

  return (
    <section id="score" className="section">
      <div className="wrap">
        <div
          className="score-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div>
            <Reveal>
              <div className="mono" style={{ marginBottom: 16 }}>
                THE SCORE
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-section" style={{ marginBottom: 28 }}>
                A number
                <br />
                with a <em className="accent-em">why.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="body-lg" style={{ marginBottom: 36 }}>
                Every morning, one number tells you how your body is doing
                today. Four pillars underneath, each explained, each
                actionable. The score isn&apos;t the point. It&apos;s the
                starting line.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div
                className="pillar-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {PILLARS.map((p, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      type="button"
                      key={p.key}
                      onClick={() => setActive(i)}
                      style={{
                        textAlign: "left",
                        padding: 18,
                        borderRadius: 16,
                        background: isActive
                          ? "color-mix(in oklab, var(--bg-card) 92%, transparent)"
                          : "var(--bg-card)",
                        border: `1px solid ${
                          isActive
                            ? `color-mix(in oklab, ${p.color} 55%, var(--hair))`
                            : "var(--hair)"
                        }`,
                        boxShadow: isActive
                          ? `0 6px 18px -10px ${
                              p.color === "var(--ink)"
                                ? "rgba(27,28,24,0.35)"
                                : "rgba(0,0,0,0.2)"
                            }`
                          : "none",
                        transform: isActive ? "translateY(-2px)" : "none",
                        cursor: "pointer",
                        color: "var(--ink)",
                        fontFamily: "inherit",
                        transition:
                          "transform 220ms ease, border-color 220ms ease, background 220ms ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            background: p.color,
                          }}
                        />
                        <span
                          className="mono"
                          style={{ color: "var(--ink-2)" }}
                        >
                          {p.name}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: 32,
                          lineHeight: 1,
                          color: "var(--ink)",
                          letterSpacing: "-0.01em",
                          marginBottom: 8,
                        }}
                      >
                        {p.value}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--muted)",
                          lineHeight: 1.4,
                        }}
                      >
                        {p.subline}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 32,
            }}
          >
            <Reveal>
              <ScoreRing
                value={pillar.value}
                color={pillar.color}
                label={pillar.name.toUpperCase()}
              />
            </Reveal>

            <Reveal delay={120}>
              <div
                style={{
                  maxWidth: 380,
                  width: "100%",
                  padding: 22,
                  background: "var(--bg-card)",
                  border: "1px solid var(--hair)",
                  borderRadius: 18,
                }}
              >
                <div
                  className="mono"
                  style={{ color: "var(--muted)", marginBottom: 16 }}
                >
                  WHAT&apos;S BEHIND YOUR {pillar.name.toUpperCase()} SCORE
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  {pillar.contributors.map((label, i) => {
                    const w = DEFAULT_WIDTHS[i];
                    return (
                      <div key={label}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            marginBottom: 6,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 13,
                              color: "var(--ink-2)",
                            }}
                          >
                            {label}
                          </span>
                          <span
                            className="mono"
                            style={{ color: "var(--muted)" }}
                          >
                            {w}%
                          </span>
                        </div>
                        <div
                          style={{
                            height: 3,
                            borderRadius: 3,
                            background: "var(--hair)",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            key={`${pillar.key}-${i}`}
                            style={{
                              height: "100%",
                              width: `${w}%`,
                              background: pillar.color,
                              borderRadius: 3,
                              transform: "translateX(-100%)",
                              animation:
                                "growbar 600ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards",
                              animationDelay: `${i * 80}ms`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .score-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @keyframes growbar {
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
