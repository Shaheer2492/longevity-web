"use client";

import { useState } from "react";
import Reveal from "../ui/Reveal";

const ITEMS: { q: string; a: string }[] = [
  {
    q: "I already have an Apple Watch or Oura ring. Why do I need this?",
    a: "Those are great at collecting data. Longevity is what makes sense of it. We connect what your watch knows about your heart to what your meal log knows about your diet to what your lab results say about your blood. No single device does that.",
  },
  {
    q: "Is this actually based on science?",
    a: "Yes. Our models are built on peer-reviewed research in longevity, sleep science, exercise physiology, and metabolic health. We don't invent scores. We weight them based on published evidence, and show you which studies back each insight.",
  },
  {
    q: "What happens to my health data?",
    a: "Your data is encrypted, stored securely, and never sold. We don't run ads and we don't share your data with third parties. You can export or delete everything at any time.",
  },
  {
    q: "Is the free version actually useful?",
    a: "Yes. You get your daily score, wearable sync, and a basic daily insight, forever free. Pro unlocks the deep weekly analysis, lab integration, and trend reports.",
  },
  {
    q: "What if I only have one wearable?",
    a: "That's enough. Longevity works with any wearable, or none. You can also manually log meals and upload lab PDFs. The more data you connect, the smarter your insights get.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);

  const toggle = (i: number) => {
    const next = open === i ? -1 : i;
    setOpen(next);
    if (next !== -1 && typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer?.push?.({
        event: "faq_open",
        questionIndex: next,
      });
    }
  };

  return (
    <section id="faq" className="section">
      <div className="wrap-narrow">
        <div
          className="faq-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: 60,
            alignItems: "start",
          }}
        >
          <div>
            <Reveal>
              <div className="mono" style={{ marginBottom: 14 }}>
                QUESTIONS
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-section">
                Before you
                <br />
                <em className="accent-em">sign up.</em>
              </h2>
            </Reveal>
          </div>

          <Reveal>
            <div>
              {ITEMS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={item.q}
                    style={{
                      padding: "24px 0",
                      borderBottom: "1px solid var(--hair)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        width: "100%",
                        padding: 0,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        color: "var(--ink)",
                        fontFamily: "inherit",
                      }}
                    >
                      <span
                        style={{
                          flex: 1,
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(20px, 2.5vw, 26px)",
                          lineHeight: 1.2,
                          color: "var(--ink)",
                        }}
                      >
                        {item.q}
                      </span>
                      <span
                        style={{
                          flexShrink: 0,
                          width: 32,
                          height: 32,
                          borderRadius: 999,
                          border: "1px solid var(--hair)",
                          background: isOpen ? "var(--accent)" : "transparent",
                          color: isOpen ? "var(--bg)" : "var(--ink)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition:
                            "transform 300ms ease, background 300ms ease, color 300ms ease",
                        }}
                        aria-hidden
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                    <div
                      id={`faq-a-${i}`}
                      role="region"
                      style={{
                        maxHeight: isOpen ? 300 : 0,
                        opacity: isOpen ? 1 : 0,
                        overflow: "hidden",
                        transition:
                          "max-height 500ms ease, opacity 400ms ease, margin 500ms ease",
                        marginTop: isOpen ? 14 : 0,
                      }}
                    >
                      <p
                        className="body"
                        style={{ maxWidth: "60ch" }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
