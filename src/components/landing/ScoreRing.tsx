"use client";

import { useEffect, useState } from "react";

type Props = {
  value: number;
  color: string;
  label: string;
  size?: number;
};

export default function ScoreRing({
  value,
  color,
  label,
  size = 260,
}: Props) {
  const [progress, setProgress] = useState(0);
  const r = size / 2 - 10;
  const C = 2 * Math.PI * r;

  useEffect(() => {
    setProgress(0);
    const id = requestAnimationFrame(() => setProgress(value));
    return () => cancelAnimationFrame(id);
  }, [value]);

  const offset = C - (progress / 100) * C;

  return (
    <div
      className="breathe"
      style={{
        position: "relative",
        width: size,
        height: size,
        margin: "0 auto",
      }}
    >
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="var(--hair)"
          strokeWidth={10}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={10}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          style={{
            transition:
              "stroke-dashoffset 900ms cubic-bezier(0.2, 0.7, 0.2, 1), stroke 400ms ease",
          }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap",
        }}
      >
        <span
          className="mono"
          style={{ color: "var(--muted)", marginBottom: 6 }}
        >
          {label} · SCORE
        </span>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 86,
            lineHeight: 1,
            color: "var(--ink)",
            letterSpacing: "-0.02em",
          }}
        >
          {Math.round(progress)}
        </span>
        <span
          style={{
            fontSize: 11,
            color: "var(--muted)",
            marginTop: 4,
          }}
        >
          of 100
        </span>
      </div>
    </div>
  );
}
