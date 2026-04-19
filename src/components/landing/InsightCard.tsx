"use client";

import { useEffect, useState } from "react";

const TEXT = "Your deep sleep drops 22% on nights you eat after 9pm.";

type Props = { visible: boolean };

export default function InsightCard({ visible }: Props) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTyped(TEXT);
      setDone(true);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(TEXT.slice(0, i));
      if (i >= TEXT.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 22);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.94})`,
        opacity: visible ? 1 : 0,
        transition:
          "opacity 700ms ease 200ms, transform 900ms cubic-bezier(0.2, 0.7, 0.2, 1) 200ms",
        width: "min(340px, 88%)",
        padding: 22,
        background: "var(--bg-card)",
        border: "1px solid var(--hair)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: 20,
        boxShadow: "0 30px 80px -30px rgba(0,0,0,0.3)",
        pointerEvents: visible ? "auto" : "none",
        zIndex: 3,
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}
      >
        <span className="dot-accent breathe" />
        <span className="mono" style={{ color: "var(--muted)" }}>
          THIS WEEK&apos;S FOCUS
        </span>
      </div>

      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 22,
          lineHeight: 1.25,
          color: "var(--ink)",
          minHeight: 80,
          marginBottom: 14,
        }}
      >
        {typed}
        {!done && (
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 2,
              height: "0.9em",
              background: "var(--accent)",
              marginLeft: 2,
              transform: "translateY(3px)",
              animation: "caret 900ms steps(2) infinite",
            }}
          />
        )}
      </p>

      <div
        style={{
          borderTop: "1px dashed var(--hair)",
          paddingTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 12, color: "var(--muted)" }}>
          Try a 3-hour cutoff before bed.
        </span>
        <span
          style={{
            fontSize: 11,
            color: "var(--accent)",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          +8% recovery →
        </span>
      </div>

      <style jsx>{`
        @keyframes caret {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
