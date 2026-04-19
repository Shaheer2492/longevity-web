"use client";

import Reveal from "../ui/Reveal";
import Counter from "../ui/Counter";

const JOURNALS = [
  { name: "Nature Medicine", italic: false },
  { name: "The Lancet", italic: true },
  { name: "Cell Metabolism", italic: false },
  { name: "JAMA", italic: true },
  { name: "NEJM", italic: false },
  { name: "Sleep", italic: true },
  { name: "Circulation", italic: false },
  { name: "Nature Aging", italic: true },
  { name: "Science Translational Medicine", italic: false },
];

const STATS: {
  key: string;
  prefix?: string;
  value: number | null;
  display?: string;
  label: string;
}[] = [
  {
    key: "studies",
    value: 217,
    label: "peer-reviewed studies in our reference model",
  },
  {
    key: "biomarkers",
    value: 42,
    label: "biomarkers cross-referenced per insight",
  },
  {
    key: "zero",
    value: null,
    display: "0",
    label: "ads, data sales, or third-party sharing. Ever.",
  },
];

export default function Credibility() {
  return (
    <section
      id="credibility"
      style={{
        background: "var(--bg-2)",
        padding: "100px 0 0",
      }}
    >
      <div className="wrap">
        <div
          className="cred-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <Reveal>
            <div className="mono" style={{ marginBottom: 16 }}>
              BUILT ON SCIENCE
            </div>
            <h2 className="h-section">
              Not <em className="accent-em">vibes.</em>
              <br />
              Research.
            </h2>
          </Reveal>

          <Reveal stagger>
            <p className="body-lg" style={{ marginBottom: 40 }}>
              Every insight is weighted by peer-reviewed evidence in longevity,
              sleep science, exercise physiology, and metabolic health. When a
              claim isn&apos;t well-studied, we tell you, and down-weight it.
            </p>
            <div
              className="stat-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 32,
              }}
            >
              {STATS.map((s) => (
                <div
                  key={s.key}
                  style={{
                    borderLeft: "2px solid var(--accent)",
                    paddingLeft: 18,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(42px, 5vw, 64px)",
                      lineHeight: 1,
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                      marginBottom: 10,
                    }}
                  >
                    {s.display ? s.display : <Counter to={s.value ?? 0} />}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      maxWidth: 200,
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

      {/* Marquee band */}
      <div
        style={{
          marginTop: 80,
          borderTop: "1px solid var(--hair)",
          borderBottom: "1px solid var(--hair)",
          padding: "22px 0",
          overflow: "hidden",
        }}
      >
        <div className="marquee" aria-hidden>
          {[0, 1, 2].map((rep) => (
            <div
              key={rep}
              style={{
                display: "flex",
                gap: 32,
                alignItems: "center",
                paddingRight: 32,
              }}
            >
              {JOURNALS.map((j, i) => (
                <span
                  key={`${rep}-${i}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 32,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: j.italic ? "italic" : "normal",
                      fontSize: 22,
                      color: "var(--muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {j.name}
                  </span>
                  <span style={{ color: "var(--muted)", fontSize: 14 }}>·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .cred-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .stat-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
