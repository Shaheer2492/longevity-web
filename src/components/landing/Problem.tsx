"use client";

import Reveal from "../ui/Reveal";
import DisconnectedCluster from "./DisconnectedCluster";

const STATS = [
  { value: "78%", label: "of wearable owners feel overwhelmed by data" },
  { value: "3.4", label: "health apps per user, on average" },
  { value: "0", label: "apps that connect them" },
];

export default function Problem() {
  return (
    <section
      id="problem"
      className="section"
      style={{
        background: "var(--bg-2)",
      }}
    >
      <div className="wrap">
        <div
          className="problem-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.05fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <Reveal>
            <DisconnectedCluster />
          </Reveal>

          <Reveal stagger>
            <div className="mono" style={{ marginBottom: 18 }}>
              THE PROBLEM
            </div>
            <h2 className="h-section" style={{ marginBottom: 28 }}>
              Five apps.
              <br />
              <em className="accent-em">Zero</em> answers.
            </h2>
            <p className="body-lg" style={{ marginBottom: 28 }}>
              Your watch tracks your heart rate. An app logs your meals. Your
              lab results sit in a PDF you opened once. They don&apos;t talk to
              each other, and none of them tell you what actually matters.
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(26px, 3vw, 38px)",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                maxWidth: "20ch",
                marginBottom: 36,
                color: "var(--ink)",
              }}
            >
              You&apos;re collecting data. You&apos;re not getting{" "}
              <em className="accent-em">healthier.</em>
            </p>

            <div
              className="stats-row"
              style={{
                display: "flex",
                gap: 28,
                flexWrap: "wrap",
                paddingTop: 24,
                borderTop: "1px solid var(--hair)",
              }}
            >
              {STATS.map((s) => (
                <div key={s.label} style={{ maxWidth: 160 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 28,
                      color: "var(--ink)",
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .problem-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
