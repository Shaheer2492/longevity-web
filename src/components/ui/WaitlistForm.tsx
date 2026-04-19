"use client";

import { useState } from "react";
import Icon from "./Icon";

const SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbyAej5VQR5NC_2xEopoQRmfAgzcWdPTuoR1huTdwZCE2wcDFOf2oAur8ObZzBe9d6AH0A/exec";

type Props = {
  compact?: boolean;
  source?: string;
  id?: string;
};

export default function WaitlistForm({ compact = false, source, id }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Optimistic: show confirmation immediately.
    setStatus("done");
    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: source ?? "landing" }),
      });
      if (typeof window !== "undefined") {
        const evt = source === "final" ? "final_cta_submit" : "hero_cta_click";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).dataLayer?.push?.({ event: evt, email });
      }
    } catch {
      // Optimistic UI - keep "done" state.
    }
  };

  if (status === "done") {
    return (
      <div
        id={id}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 22px",
          borderRadius: 999,
          background: "var(--ink)",
          color: "var(--bg)",
          fontSize: 14,
          fontWeight: 500,
          maxWidth: 460,
        }}
      >
        <Icon name="check" size={18} stroke="var(--bg)" strokeWidth={2} />
        You&apos;re on the list. We&apos;ll email you at launch.
      </div>
    );
  }

  const btnPadding = compact ? "10px 18px" : "14px 26px";

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="email-form"
      style={{
        display: "flex",
        gap: 8,
        padding: "6px 6px 6px 20px",
        background: "var(--bg-card)",
        border: "1px solid var(--hair)",
        borderRadius: 999,
        maxWidth: 460,
        width: "100%",
        alignItems: "center",
      }}
    >
      <input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          flex: "1 1 0",
          minWidth: 0,
          width: "100%",
          border: "none",
          outline: "none",
          background: "transparent",
          color: "var(--ink)",
          fontSize: 15,
          fontFamily: "inherit",
          padding: "8px 0",
        }}
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          padding: btnPadding,
          borderRadius: 999,
          border: "none",
          background: "var(--ink)",
          color: "var(--bg)",
          fontSize: 14,
          fontWeight: 500,
          cursor: status === "loading" ? "wait" : "pointer",
          whiteSpace: "nowrap",
          fontFamily: "inherit",
          letterSpacing: "0.01em",
          transition: "transform 180ms ease, background 180ms ease",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          flexShrink: 0,
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.transform = "translateY(-1px)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")
        }
      >
        Get early access →
      </button>
    </form>
  );
}
