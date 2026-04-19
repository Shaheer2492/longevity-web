"use client";

import { useEffect, useState } from "react";
import Icon from "../ui/Icon";

type Tile = {
  key: string;
  iconName: "watch" | "drop" | "lab" | "fork" | "heart";
  label: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
};

const TILES: Tile[] = [
  { key: "watch", iconName: "watch", label: "WATCH", x: 12, y: 18, dx: -10, dy: -6 },
  { key: "ring", iconName: "drop", label: "RING", x: 68, y: 8, dx: 8, dy: -4 },
  { key: "lab", iconName: "lab", label: "LAB", x: 6, y: 62, dx: -6, dy: 10 },
  { key: "meal", iconName: "fork", label: "MEALS", x: 72, y: 66, dx: 10, dy: 8 },
  { key: "hr", iconName: "heart", label: "HR", x: 40, y: 40, dx: 0, dy: -2 },
];

export default function DisconnectedCluster() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Build line pairs
  const pairs: [Tile, Tile][] = [];
  for (let i = 0; i < TILES.length; i++) {
    for (let j = i + 1; j < TILES.length; j++) {
      pairs.push([TILES[i], TILES[j]]);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 440,
        background: "var(--bg-card)",
        border: "1px solid var(--hair)",
        borderRadius: 24,
        overflow: "hidden",
      }}
    >
      {/* Dashed lines */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        aria-hidden
      >
        {pairs.map((pair, i) => {
          const [a, b] = pair;
          return (
            <line
              key={`${a.key}-${b.key}`}
              x1={a.x + 6}
              y1={a.y + 8}
              x2={b.x + 6}
              y2={b.y + 8}
              stroke="var(--hair)"
              strokeDasharray="0.6 1.4"
              strokeWidth={0.25}
              style={{
                opacity: active ? 0.5 : 0,
                transition: `opacity 1200ms ease ${i * 80}ms`,
              }}
            />
          );
        })}
      </svg>

      {/* Tiles */}
      {TILES.map((tile, i) => (
        <div
          key={tile.key}
          style={{
            position: "absolute",
            left: `${tile.x}%`,
            top: `${tile.y}%`,
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "var(--bg)",
            border: "1px solid var(--hair)",
            boxShadow: "0 8px 20px -12px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            color: "var(--ink)",
            opacity: active ? 1 : 0,
            transform: active
              ? `translate(${tile.dx}px, ${tile.dy}px)`
              : "translate(0, 0)",
            transition: `opacity 700ms ease ${i * 120}ms, transform 2400ms cubic-bezier(0.2, 0.7, 0.2, 1) ${i * 150}ms`,
          }}
        >
          <Icon name={tile.iconName} size={26} strokeWidth={1.4} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.15em",
              color: "var(--muted)",
            }}
          >
            {tile.label}
          </span>
        </div>
      ))}
    </div>
  );
}
