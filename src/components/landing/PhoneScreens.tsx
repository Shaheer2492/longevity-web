"use client";

import Icon from "../ui/Icon";

/* ========== Shared chrome ========== */
const ScreenBase = ({
  children,
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: React.ReactNode;
}) => (
  <div
    style={{
      padding: "42px 22px 22px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      gap: 14,
    }}
  >
    <span
      className="mono"
      style={{ color: "var(--muted)", fontSize: 9, marginTop: 10 }}
    >
      {eyebrow}
    </span>
    <h3
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: 24,
        lineHeight: 1.15,
        color: "var(--ink)",
        letterSpacing: "-0.01em",
      }}
    >
      {title}
    </h3>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
      {children}
    </div>
  </div>
);

/* ========== Screen 1: Connect your data ========== */
const SOURCES: {
  iconName: "watch" | "drop" | "lab" | "fork" | "bolt";
  name: string;
  status: "Connected" | "Syncing…" | "Uploaded" | "Connect";
  on: boolean;
  syncing?: boolean;
}[] = [
  { iconName: "watch", name: "Apple Watch", status: "Connected", on: true },
  {
    iconName: "drop",
    name: "Oura Ring",
    status: "Syncing…",
    on: true,
    syncing: true,
  },
  { iconName: "lab", name: "Bloodwork PDF", status: "Uploaded", on: true },
  { iconName: "fork", name: "MyFitnessPal", status: "Connect", on: false },
  { iconName: "bolt", name: "Strava", status: "Connect", on: false },
];

export function Screen1() {
  return (
    <ScreenBase
      eyebrow="CONNECT YOUR DATA"
      title={
        <>
          Five sources,
          <br />
          two minutes.
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {SOURCES.map((s) => {
          const bg = s.on
            ? "color-mix(in oklab, var(--sage) 10%, transparent)"
            : "transparent";
          const border = s.on
            ? "1px solid color-mix(in oklab, var(--sage) 40%, transparent)"
            : "1px solid var(--hair)";
          const statusColor = s.on ? "var(--sage)" : "var(--muted)";
          return (
            <div
              key={s.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                background: bg,
                border,
                borderRadius: 12,
              }}
              className={s.syncing ? "breathe" : undefined}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: s.on
                    ? "color-mix(in oklab, var(--sage) 20%, var(--bg-card))"
                    : "var(--bg-card)",
                  border: "1px solid var(--hair)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ink)",
                  flexShrink: 0,
                }}
              >
                <Icon name={s.iconName} size={14} strokeWidth={1.6} />
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: "var(--ink)",
                  flex: 1,
                }}
              >
                {s.name}
              </span>
              <span
                className="mono"
                style={{ color: statusColor, fontSize: 9 }}
              >
                {s.status}
              </span>
            </div>
          );
        })}
      </div>
    </ScreenBase>
  );
}

/* ========== Screen 2: Correlation engine ========== */
const NODES = [
  { name: "Sleep", x: 110, y: 40, color: "var(--sage)" },
  { name: "HRV", x: 200, y: 140, color: "var(--terra)" },
  { name: "Fuel", x: 170, y: 280, color: "var(--gold)" },
  { name: "Move", x: 50, y: 280, color: "var(--sage)" },
  { name: "Labs", x: 20, y: 140, color: "var(--terra)" },
];

export function Screen2() {
  const cx = 110;
  const cy = 160;
  return (
    <ScreenBase
      eyebrow="CORRELATION ENGINE"
      title={
        <>
          Analyzing how your
          <br />
          systems <em className="accent-em">interact.</em>
        </>
      }
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 220 340"
          style={{ width: "100%", height: "100%", maxHeight: 320 }}
          aria-hidden
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor="var(--accent)"
                stopOpacity="0.35"
              />
              <stop
                offset="100%"
                stopColor="var(--accent)"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>

          {/* connection lines */}
          {NODES.map((n, i) => (
            <line
              key={n.name + "line"}
              x1={n.x}
              y1={n.y}
              x2={cx}
              y2={cy}
              stroke={n.color}
              strokeWidth={0.9}
              strokeDasharray="3 4"
              style={{
                opacity: 0.7,
                animation: `dashflow 2.6s linear infinite ${i * 0.12}s`,
              }}
            />
          ))}

          {/* center glow */}
          <circle cx={cx} cy={cy} r={46} fill="url(#glow)" />
          <circle
            cx={cx}
            cy={cy}
            r={26}
            fill="var(--bg-card)"
            stroke="var(--accent)"
            strokeWidth={1.4}
          />
          <text
            x={cx}
            y={cy - 2}
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="var(--font-serif)"
            fontSize="10"
          >
            Your
          </text>
          <text
            x={cx}
            y={cy + 11}
            textAnchor="middle"
            fill="var(--accent)"
            fontFamily="var(--font-serif)"
            fontStyle="italic"
            fontSize="11"
          >
            focus
          </text>

          {/* nodes */}
          {NODES.map((n, i) => (
            <g
              key={n.name}
              style={{
                opacity: 0,
                animation: `fadein 700ms ease forwards ${i * 0.12}s`,
              }}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={14}
                fill="var(--bg-card)"
                stroke={n.color}
                strokeWidth={1.4}
              />
              <text
                x={n.x}
                y={n.y + 2}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="7"
                fill="var(--ink)"
                letterSpacing="0.1em"
              >
                {n.name.toUpperCase()}
              </text>
            </g>
          ))}

          <style>{`@keyframes fadein { to { opacity: 1; } }`}</style>
        </svg>
      </div>
      <div
        style={{
          borderTop: "1px dashed var(--hair)",
          paddingTop: 8,
        }}
      >
        <span className="mono" style={{ color: "var(--muted)", fontSize: 10 }}>
          Referenced across 217 peer-reviewed studies
        </span>
      </div>
    </ScreenBase>
  );
}

/* ========== Screen 3: Your focus, this week ========== */
export function Screen3() {
  return (
    <ScreenBase
      eyebrow=""
      title={
        <>
          Your focus,
          <br />
          this week.
        </>
      }
    >
      {/* Move eyebrow to top split row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: -12,
          marginBottom: 4,
        }}
      >
        <span className="mono" style={{ color: "var(--muted)", fontSize: 9 }}>
          SUNDAY · WEEK 07
        </span>
        <span
          className="mono"
          style={{
            color: "var(--accent)",
            fontSize: 9,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span className="dot-accent" />
          LIVE
        </span>
      </div>

      <div
        style={{
          background: "var(--bg-2)",
          borderRadius: 14,
          padding: 14,
          border: "1px solid var(--hair)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="moon" size={14} stroke="var(--accent)" strokeWidth={1.6} />
          <span className="mono" style={{ fontSize: 9, color: "var(--ink-2)" }}>
            SLEEP × NUTRITION
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            lineHeight: 1.25,
            color: "var(--ink)",
          }}
        >
          Your deep sleep drops 22% on nights you eat after 9 pm.
        </p>
        <p style={{ fontSize: 10, color: "var(--muted)", lineHeight: 1.4 }}>
          Try a 3-hour cutoff before bed this week. Recovery should improve by
          roughly 8% within 5 nights.
        </p>
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          <button
            type="button"
            style={{
              fontSize: 10,
              padding: "6px 10px",
              borderRadius: 999,
              background: "var(--ink)",
              color: "var(--bg)",
              border: "none",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Start this week
          </button>
          <button
            type="button"
            style={{
              fontSize: 10,
              padding: "6px 10px",
              borderRadius: 999,
              background: "transparent",
              color: "var(--ink)",
              border: "1px solid var(--hair)",
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Why this?
          </button>
        </div>
      </div>

      {/* Pager */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                background: i === 0 ? "var(--accent)" : "var(--hair)",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 9, color: "var(--muted)" }}>
          Supporting insights unlock tomorrow
        </span>
      </div>
    </ScreenBase>
  );
}
