"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

/* ─── Screen Data ─── */
const screens = [
    {
        label: "Cardiovascular Health",
        heading: "Your Heart,\nDecoded",
        description:
            "Track HRV, resting heart rate, and heart rate zones to understand your cardiovascular fitness at a glance.",
        screen: {
            title: "Cardio",
            scoreLabel: "Cardio Score",
            score: 82,
            color: "#E74C5E",
            colorLight: "#FDE8EB",
            metrics: [
                { label: "HRV", value: "65.1", unit: "ms" },
                { label: "Resting HR", value: "52", unit: "bpm" },
            ],
            timeline: { icon: "heart", label: "Heart Rate Zones", detail: "Zone 2 · 42 min today" },
        },
        cards: [
            { label: "Resting HRV", value: "65.1", unit: "ms", status: "Optimal", color: "#E74C5E" },
            { label: "Resting HR", value: "52", unit: "bpm", status: "Excellent", color: "#E74C5E" },
        ],
    },
    {
        label: "Nutrition & Fuel",
        heading: "Fuel That\nFits You",
        description:
            "See your calorie balance, macro breakdown, and hydration — so you know exactly what your body needs today.",
        screen: {
            title: "Nutrition",
            scoreLabel: "Fuel Score",
            score: 68,
            color: "#F5A623",
            colorLight: "#FFF4E0",
            metrics: [
                { label: "Calories", value: "1,840", unit: "kcal" },
                { label: "Protein", value: "124", unit: "g" },
            ],
            timeline: { icon: "nutrition", label: "Hydration", detail: "2.4L · 80% of goal" },
        },
        cards: [
            { label: "Net Calories", value: "1,840", unit: "kcal", status: "On Track", color: "#F5A623" },
            { label: "Protein", value: "124", unit: "g", status: "92% Goal", color: "#F5A623" },
        ],
    },
    {
        label: "Sleep Quality",
        heading: "Sleep That\nRestores",
        description:
            "Understand your sleep architecture — duration, quality, REM and deep sleep cycles — to wake up truly recovered.",
        screen: {
            title: "Sleep",
            scoreLabel: "Sleep Score",
            score: 91,
            color: "#6C63FF",
            colorLight: "#EEEDFF",
            metrics: [
                { label: "Duration", value: "7h 42m", unit: "" },
                { label: "Quality", value: "92", unit: "%" },
            ],
            timeline: { icon: "moon", label: "Deep Sleep", detail: "1h 48m · Above average" },
        },
        cards: [
            { label: "Sleep Duration", value: "7h 42m", unit: "", status: "Optimal", color: "#6C63FF" },
            { label: "Sleep Quality", value: "92", unit: "%", status: "Excellent", color: "#6C63FF" },
        ],
    },
];

/* ─── Sparkline SVG ─── */
function Sparkline({ color = "#4CAF7D" }: { color?: string }) {
    return (
        <svg width="100%" height="32" viewBox="0 0 120 32" fill="none" preserveAspectRatio="none">
            <path
                d="M0 24 C10 22, 15 26, 25 20 S40 10, 50 14 S65 24, 75 18 S90 8, 100 12 S110 20, 120 16"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M0 24 C10 22, 15 26, 25 20 S40 10, 50 14 S65 24, 75 18 S90 8, 100 12 S110 20, 120 16 V32 H0 Z"
                fill={`${color}15`}
            />
        </svg>
    );
}

/* ─── Floating Metric Card ─── */
function MetricCard({
    label,
    value,
    unit,
    status,
    color,
}: {
    label: string;
    value: string;
    unit: string;
    status: string;
    color: string;
}) {
    return (
        <div
            style={{
                width: 180,
                padding: 18,
                borderRadius: 16,
                background: "#FFFFFF",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
            }}
        >
            <span style={{ fontSize: 12, fontWeight: 500, color: "#AAAAAA", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {label}
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: "#1A1A1A" }}>{value}</span>
                {unit && <span style={{ fontSize: 13, fontWeight: 500, color: "#6B6B6B" }}>{unit}</span>}
            </div>
            <Sparkline color={color} />
            <span
                style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: color,
                    background: `${color}18`,
                    padding: "4px 10px",
                    borderRadius: 20,
                    alignSelf: "flex-start",
                }}
            >
                {status}
            </span>
        </div>
    );
}

/* ─── Phone Screen Content ─── */
function PhoneScreen({
    screen,
    isActive,
}: {
    screen: (typeof screens)[number]["screen"];
    isActive: boolean;
}) {
    const circleRadius = 50;
    const circumference = 2 * Math.PI * circleRadius;
    const strokeDash = circumference * (screen.score / 100);

    const iconPaths: Record<string, React.ReactNode> = {
        heart: (
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={screen.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ),
        nutrition: (
            <path d="M18 8h1a4 4 0 010 8h-1M5 8h12v9a4 4 0 01-4 4H9a4 4 0 01-4-4V8zM12 2v4" stroke={screen.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ),
        moon: (
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke={screen.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ),
    };

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                padding: "18px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.5s ease",
                pointerEvents: isActive ? "auto" : "none",
            }}
        >
            {/* Status bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>9:41</span>
                <div style={{ display: "flex", gap: 4 }}>
                    <div style={{ width: 16, height: 10, borderRadius: 2, background: "#1A1A1A", opacity: 0.4 }} />
                    <div style={{ width: 20, height: 10, borderRadius: 3, border: "1.5px solid #1A1A1A", opacity: 0.4, position: "relative" }}>
                        <div style={{ position: "absolute", right: 2, top: 2, bottom: 2, width: 10, borderRadius: 1, background: screen.color }} />
                    </div>
                </div>
            </div>

            {/* Header */}
            <div>
                <span style={{ fontSize: 11, fontWeight: 500, color: "#AAAAAA", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Today
                </span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1A1A1A", marginTop: 2 }}>
                    {screen.title}
                </h3>
            </div>

            {/* Score circle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "6px 0" }}>
                <div style={{ position: "relative", width: 100, height: 100 }}>
                    <svg width="100" height="100" viewBox="0 0 130 130">
                        <circle cx="65" cy="65" r={circleRadius} stroke={screen.colorLight} strokeWidth="10" fill="none" />
                        <circle
                            cx="65"
                            cy="65"
                            r={circleRadius}
                            stroke={screen.color}
                            strokeWidth="10"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${strokeDash} ${circumference}`}
                            transform="rotate(-90 65 65)"
                            style={{ transition: "stroke-dasharray 0.6s ease, stroke 0.5s ease" }}
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
                        }}
                    >
                        <span style={{ fontSize: 28, fontWeight: 800, color: "#1A1A1A" }}>{screen.score}</span>
                        <span style={{ fontSize: 10, fontWeight: 500, color: "#AAAAAA", marginTop: -2 }}>{screen.scoreLabel}</span>
                    </div>
                </div>
            </div>

            {/* Metrics row */}
            <div style={{ display: "flex", gap: 8 }}>
                {screen.metrics.map((m) => (
                    <div key={m.label} style={{ flex: 1, padding: "10px", borderRadius: 10, background: "#F7F6F3" }}>
                        <span style={{ fontSize: 10, color: "#AAAAAA", fontWeight: 500 }}>{m.label}</span>
                        <div style={{ fontSize: 17, fontWeight: 700, color: "#1A1A1A", marginTop: 2 }}>
                            {m.value}{" "}
                            {m.unit && <span style={{ fontSize: 11, fontWeight: 400, color: "#6B6B6B" }}>{m.unit}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <button
                style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 10,
                    border: "none",
                    background: screen.color,
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "default",
                    fontFamily: "inherit",
                    transition: "background 0.5s ease",
                }}
            >
                View {screen.title} Insights
            </button>

            {/* Timeline item */}
            <div>
                <span style={{ fontSize: 10, fontWeight: 500, color: "#AAAAAA", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Timeline
                </span>
                <div
                    style={{
                        marginTop: 6,
                        padding: "8px 10px",
                        borderRadius: 10,
                        background: "#F7F6F3",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <div
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: screen.colorLight,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.5s ease",
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            {iconPaths[screen.timeline.icon]}
                        </svg>
                    </div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{screen.timeline.label}</div>
                        <div style={{ fontSize: 11, color: "#AAAAAA" }}>{screen.timeline.detail}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Progress Dots ─── */
function ProgressDots({ activeIndex }: { activeIndex: number }) {
    return (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
            {screens.map((s, i) => (
                <div
                    key={s.label}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 14px",
                        borderRadius: 20,
                        background: i === activeIndex ? "#1A1A1A" : "#F0F0F0",
                        color: i === activeIndex ? "#FFFFFF" : "#999999",
                        fontSize: 12,
                        fontWeight: 600,
                        transition: "all 0.4s ease",
                        cursor: "default",
                    }}
                >
                    {s.label}
                </div>
            ))}
        </div>
    );
}

/* ─── Main Section ─── */
export default function FeatureRecovery() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress to active screen index
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.33) setActiveIndex(0);
        else if (latest < 0.66) setActiveIndex(1);
        else setActiveIndex(2);
    });

    const activeScreen = screens[activeIndex];

    return (
        <section
            ref={sectionRef}
            style={{
                position: "relative",
                height: "300vh", // 3 scroll "pages"
            }}
        >
            {/* Sticky container */}
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#FFFFFF",
                    overflow: "hidden",
                    padding: "20px 24px",
                }}
            >
                {/* Header text — transitions with active screen */}
                <div
                    style={{
                        textAlign: "center",
                        maxWidth: 600,
                        marginBottom: 20,
                    }}
                >
                    <motion.span
                        key={`label-${activeIndex}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            display: "inline-block",
                            fontSize: 13,
                            fontWeight: 600,
                            color: activeScreen.screen.color,
                            background: `${activeScreen.screen.color}15`,
                            padding: "6px 16px",
                            borderRadius: 20,
                            marginBottom: 16,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            transition: "color 0.4s ease, background 0.4s ease",
                        }}
                    >
                        {activeScreen.label}
                    </motion.span>

                    <motion.h2
                        key={`heading-${activeIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                            fontSize: "clamp(32px, 4vw, 52px)",
                            fontWeight: 800,
                            color: "#1A1A1A",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                            marginBottom: 16,
                            whiteSpace: "pre-line",
                        }}
                    >
                        {activeScreen.heading}
                    </motion.h2>

                    <motion.p
                        key={`desc-${activeIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{ fontSize: 17, color: "#6B6B6B", lineHeight: 1.65 }}
                    >
                        {activeScreen.description}
                    </motion.p>
                </div>

                {/* Phone + floating cards composition */}
                <div
                    style={{
                        position: "relative",
                        maxWidth: 800,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {/* Left metric card */}
                    <motion.div
                        key={`left-card-${activeIndex}`}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: "20%",
                            zIndex: 2,
                        }}
                    >
                        <MetricCard {...activeScreen.cards[0]} />
                    </motion.div>

                    {/* iPhone frame */}
                    <div
                        style={{
                            width: 240,
                            minHeight: 460,
                            borderRadius: 38,
                            background: "#0A0A0A",
                            padding: 10,
                            boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        {/* Screen area */}
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 30,
                                background: "#FFFFFF",
                                position: "relative",
                                overflow: "hidden",
                                minHeight: 440,
                            }}
                        >
                            {screens.map((s, i) => (
                                <PhoneScreen
                                    key={s.label}
                                    screen={s.screen}
                                    isActive={i === activeIndex}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right metric card */}
                    <motion.div
                        key={`right-card-${activeIndex}`}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        style={{
                            position: "absolute",
                            right: 0,
                            top: "20%",
                            zIndex: 2,
                        }}
                    >
                        <MetricCard {...activeScreen.cards[1]} />
                    </motion.div>
                </div>

                {/* Progress indicator */}
                <ProgressDots activeIndex={activeIndex} />
            </div>
        </section>
    );
}
