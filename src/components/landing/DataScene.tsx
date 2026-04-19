"use client";

import { useEffect, useMemo, useRef } from "react";

/* ============================================================
 * Seeded PRNG - deterministic particle field.
 * ============================================================ */
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

type ColorKey = "sage" | "terra" | "gold";

// 5 edge clusters, each mapped to a color from the palette.
const SOURCES: [number, number, ColorKey][] = [
  [0.08, 0.2, "sage"],
  [0.92, 0.25, "terra"],
  [0.05, 0.78, "gold"],
  [0.95, 0.82, "sage"],
  [0.5, 0.05, "terra"],
];

const HUE_MAP: ColorKey[] = SOURCES.map((s) => s[2]);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

function toHex2(a: number) {
  return Math.round(clamp(a, 0, 1) * 255)
    .toString(16)
    .padStart(2, "0");
}

function readVar(name: string): string {
  if (typeof document === "undefined") return "#000000";
  const v = getComputedStyle(document.body).getPropertyValue(name).trim();
  // CSS var may be #rgb, #rrggbb, or empty - only the 7-char form safely
  // concatenates with an alpha byte. Pad short hex if necessary.
  if (!v) return "#000000";
  if (/^#[0-9a-fA-F]{3}$/.test(v)) {
    return (
      "#" +
      v[1] +
      v[1] +
      v[2] +
      v[2] +
      v[3] +
      v[3]
    );
  }
  return v;
}

type Props = {
  intensity?: number;
  onPhase?: (p: number) => void;
};

export default function DataScene({ intensity = 0.7, onPhase }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const phaseRef = useRef(0);

  // Keep a live ref to onPhase so effect doesn't re-run when parent passes
  // a new identity (it won't re-create particles or reset the animation).
  const onPhaseRef = useRef(onPhase);
  onPhaseRef.current = onPhase;

  // Particles are generated once per intensity change - never per render.
  const particles = useMemo(() => {
    const N = Math.round(lerp(60, 140, clamp(intensity, 0, 1)));
    const rng = mulberry32(42);
    return Array.from({ length: N }, (_, i) => {
      const src = SOURCES[i % 5];
      return {
        sx: src[0] + (rng() - 0.5) * 0.12,
        sy: src[1] + (rng() - 0.5) * 0.12,
        tx: 0.5 + (rng() - 0.5) * 0.32,
        ty: 0.45 + (rng() - 0.5) * 0.28,
        base: lerp(2.0, 4.8, rng()),
        delay: rng() * 0.35,
        cat: i % 5,
      };
    });
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Note: we intentionally do NOT short-circuit on prefers-reduced-motion.
    // A single 3.8-second ease-out is well within acceptable motion thresholds
    // and skipping it hides the whole point of the hero. If stricter behavior
    // is ever required, re-introduce the guard around the rAF loop.

    let W = 0;
    let H = 0;
    let animationDone = false;

    const DURATION = 3800;

    const draw = (phase: number, t: number) => {
      if (W === 0 || H === 0) return;

      // Look up palette colors inside the draw fn so palette switches are
      // picked up live (the spec's "gotcha (a)").
      const sage = readVar("--sage");
      const terra = readVar("--terra");
      const gold = readVar("--gold");
      const ink = readVar("--ink");
      const byKey: Record<ColorKey, string> = { sage, terra, gold };

      ctx.clearRect(0, 0, W, H);

      // --- Background rings at (W*0.5, H*0.45) -------------------------
      const rcx = W * 0.5;
      const rcy = H * 0.45;
      const ringAlpha = toHex2(Math.min(0.14, phase * 0.16));
      for (let i = 0; i < 3; i++) {
        const baseR = lerp(80, 200, i / 2);
        const wobble = Math.sin(t / 1400 + i) * 3;
        ctx.beginPath();
        ctx.arc(rcx, rcy, baseR + wobble, 0, Math.PI * 2);
        ctx.strokeStyle = ink + ringAlpha;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // --- Particles ---------------------------------------------------
      for (const p of particles) {
        const denom = 1 - p.delay || 1;
        const local = clamp((phase - p.delay) / denom, 0, 1);
        const e = 1 - Math.pow(1 - local, 2.5);

        const x = lerp(p.sx, p.tx, e) * W;
        const y = lerp(p.sy, p.ty, e) * H;
        const rad = lerp(p.base * 1.35, p.base * 0.7, e);
        // Boosted alpha - the spec's 0.35→0.95 is barely visible against warm bg.
        const alpha = lerp(0.55, 0.95, e);
        const color = byKey[HUE_MAP[p.cat]];

        // Trailing line from source to current position while approaching.
        if (e < 0.85 && local > 0) {
          const sxp = p.sx * W;
          const syp = p.sy * H;
          const trailGrad = ctx.createLinearGradient(sxp, syp, x, y);
          trailGrad.addColorStop(0, color + toHex2(0));
          trailGrad.addColorStop(1, color + toHex2(0.35 * (1 - e)));
          ctx.beginPath();
          ctx.moveTo(sxp, syp);
          ctx.lineTo(x, y);
          ctx.strokeStyle = trailGrad;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.5, rad), 0, Math.PI * 2);
        ctx.fillStyle = color + toHex2(alpha);
        ctx.fill();
      }
    };

    // Resize is defined AFTER draw so that when setting canvas.width clears
    // the canvas (which it does on every assignment) we can immediately
    // repaint the current phase. Otherwise a ResizeObserver firing after our
    // initial draw would leave the canvas blank for the rest of the session.
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const newCW = Math.floor(rect.width * dpr);
      const newCH = Math.floor(rect.height * dpr);
      W = rect.width;
      H = rect.height;
      const dimsChanged =
        canvas.width !== newCW || canvas.height !== newCH;
      if (dimsChanged) {
        canvas.width = newCW; // clears canvas
        canvas.height = newCH;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // Repaint the current phase since assigning width/height wiped us.
        if (animationDone) draw(1, performance.now());
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    }

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const raw = Math.min(1, elapsed / DURATION);
      const phase = 1 - Math.pow(1 - raw, 3);
      phaseRef.current = phase;
      onPhaseRef.current?.(phase);
      draw(phase, elapsed);
      if (phase < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        animationDone = true;
        // Settled state - keep rings breathing at full phase.
        const loop = (nowT: number) => {
          draw(1, nowT);
          rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const startAnimation = () => {
      startRef.current = null;
      animationDone = false;
      phaseRef.current = 0;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    startAnimation();

    // Replay when the hero scrolls back into view.
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      let hasBeenOutOfView = false;
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              hasBeenOutOfView = true;
            } else if (hasBeenOutOfView && animationDone) {
              hasBeenOutOfView = false;
              startAnimation();
            }
          });
        },
        { threshold: 0.4 }
      );
      io.observe(canvas);
    }

    return () => {
      window.removeEventListener("resize", resize);
      ro?.disconnect();
      io?.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [particles]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
