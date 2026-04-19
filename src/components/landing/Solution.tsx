"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "../ui/Reveal";
import StickyPhone from "./StickyPhone";

const STEPS = [
  {
    eyebrow: "STEP 01",
    tag: "· 2 min",
    title: "Connect everything",
    body: "Sync your watch, ring, or health app. Upload any lab PDF. Log meals or connect your nutrition tracker. Two minutes, then done.",
  },
  {
    eyebrow: "STEP 02",
    tag: "· Overnight",
    title: "We do the hard part",
    body: "Our engine cross-references your HRV, sleep architecture, meal timing, workout load, and lab markers using peer-reviewed longevity research. Not an average. A weighted model that understands how your systems interact.",
  },
  {
    eyebrow: "STEP 03",
    tag: "· Every Sunday",
    title: "Get your weekly focus",
    body: "Every week, one specific, actionable insight based on your data. No dashboards to decode. No guesswork. Just the one thing to change.",
  },
];

export default function Solution() {
  const [active, setActive] = useState(0);
  const refs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    // Triggers when the step crosses the viewport center line.
    const observers: IntersectionObserver[] = [];
    refs.forEach((r, idx) => {
      if (!r.current) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setActive((prev) => {
                if (prev === idx) return prev;
                if (typeof window !== "undefined") {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (window as any).dataLayer?.push?.({
                    event: "solution_step_view",
                    step: idx,
                  });
                }
                return idx;
              });
            }
          });
        },
        { threshold: 0, rootMargin: "-48% 0px -48% 0px" }
      );
      io.observe(r.current);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="solution" className="section" style={{ position: "relative" }}>
      <div className="wrap">
        <Reveal>
          <div className="mono" style={{ marginBottom: 16 }}>
            HOW IT WORKS
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="h-section" style={{ marginBottom: 80, maxWidth: 820 }}>
            From scattered data
            <br />
            to a single <em className="accent-em">focus.</em>
          </h2>
        </Reveal>

        <div
          className="solution-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "stretch",
          }}
        >
          {/* Left column: steps */}
          <div className="solution-steps">
            {STEPS.map((s, i) => (
              <div
                ref={refs[i]}
                key={s.title}
                className="solution-step"
                style={{
                  minHeight: "80vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  maxWidth: 520,
                  opacity: active === i ? 1 : 0.35,
                  transition: "opacity 500ms ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <span className="mono">{s.eyebrow}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: 14,
                      color: "var(--muted)",
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(36px, 4.5vw, 56px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.015em",
                    color: "var(--ink)",
                    marginBottom: 20,
                  }}
                >
                  {s.title}
                </h3>
                <p className="body-lg" style={{ maxWidth: 520 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* Right column: sticky phone */}
          <div className="solution-phone-col" style={{ height: "100%" }}>
            <StickyPhone activeStep={active} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .solution-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .solution-phone-col {
            order: -1;
          }
          .solution-phone-col :global(.sticky-phone) {
            position: relative !important;
            top: auto !important;
            height: auto !important;
            padding: 20px 0;
          }
          .solution-step {
            min-height: auto !important;
            padding: 40px 0 !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
