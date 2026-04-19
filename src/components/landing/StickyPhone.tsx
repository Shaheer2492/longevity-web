"use client";

import { Screen1, Screen2, Screen3 } from "./PhoneScreens";

type Props = { activeStep: number };

export default function StickyPhone({ activeStep }: Props) {
  const rotation = (activeStep - 1) * 1.5;

  return (
    <div
      className="sticky-phone"
      style={{
        position: "sticky",
        top: "14vh",
        height: "72vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 320,
          aspectRatio: "9 / 19",
          borderRadius: 42,
          background: "var(--ink)",
          padding: 10,
          boxShadow:
            "0 30px 80px -20px rgba(0,0,0,0.25), 0 0 0 1px var(--hair)",
          position: "relative",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: "50%",
            transform: "translateX(-50%)",
            width: 86,
            height: 22,
            borderRadius: 999,
            background: "var(--ink)",
            zIndex: 5,
          }}
        />

        {/* Screen */}
        <div
          style={{
            borderRadius: 34,
            background: "var(--bg)",
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {[Screen1, Screen2, Screen3].map((S, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                opacity: activeStep === i ? 1 : 0,
                transition: "opacity 500ms ease",
                pointerEvents: activeStep === i ? "auto" : "none",
              }}
            >
              <S />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
