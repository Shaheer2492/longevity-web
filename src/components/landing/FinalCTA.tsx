"use client";

import Reveal from "../ui/Reveal";
import WaitlistForm from "../ui/WaitlistForm";
import Icon from "../ui/Icon";

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      style={{
        position: "relative",
        padding: "160px 0 100px",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "80%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 460,
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--accent) 22%, transparent) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        className="wrap-tight"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Reveal>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 28,
            }}
          >
            <span className="dot-accent breathe" />
            <span className="mono">THE WAITLIST OPENS SOON</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2
            className="h-display"
            style={{ fontSize: "clamp(42px, 7vw, 86px)", marginBottom: 28 }}
          >
            Stop collecting data.
            <br />
            Start <em className="accent-em">using</em> it.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="body-lg" style={{ maxWidth: "46ch", marginBottom: 32, marginInline: "auto" }}>
            Get early access. Your first week of full insights is on us. No
            credit card. No commitment.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WaitlistForm source="final" id="final-waitlist" />
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div
            style={{
              display: "flex",
              gap: 22,
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 32,
              color: "var(--muted)",
              fontSize: 12,
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Icon name="apple" size={14} strokeWidth={1.4} />
              iOS app at launch
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Icon name="android" size={14} strokeWidth={1.4} />
              Android shortly after
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span className="dot-accent" />
              Encrypted &amp; never sold
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
