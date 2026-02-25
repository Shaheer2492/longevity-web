"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

/* ─── Metric Card ─── */
function MetricCard({
    label,
    value,
    unit,
    status,
}: {
    label: string;
    value: string;
    unit: string;
    status: string;
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
                <span style={{ fontSize: 13, fontWeight: 500, color: "#6B6B6B" }}>{unit}</span>
            </div>
            <Sparkline />
            <span
                style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#4CAF7D",
                    background: "#E8F5EE",
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

/* ─── Icon Bubble ─── */
function IconBubble({ icon, delay }: { icon: string; delay: number }) {
    const icons: Record<string, React.ReactNode> = {
        heart: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#4CAF7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        lung: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 4v8m0 0c0 3-2 5-5 7m5-7c0 3 2 5 5 7M7 19c-2 1-4 0-4-3 0-4 2-8 4-10m10 13c2 1 4 0 4-3 0-4-2-8-4-10" stroke="#4CAF7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        leaf: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34M6 19l-3 3M20 2s.95 5.14-1 10.22C16.95 17.3 11.25 20 7.13 20.88" stroke="#4CAF7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        activity: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="#4CAF7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    };

    return (
        <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: "#FFFFFF",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {icons[icon]}
        </motion.div>
    );
}

/* ─── iPhone Mockup ─── */
function IPhoneMockup() {
    const circleRadius = 50;
    const circumference = 2 * Math.PI * circleRadius;
    const strokeDash = circumference * 0.73;

    return (
        <div
            style={{
                width: 280,
                minHeight: 560,
                borderRadius: 44,
                background: "#0A0A0A",
                padding: 12,
                boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
                transform: "perspective(800px) rotateY(-2deg) rotateX(1deg)",
            }}
        >
            {/* Screen */}
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 34,
                    background: "#FFFFFF",
                    padding: "24px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    overflow: "hidden",
                }}
            >
                {/* Status bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>9:41</span>
                    <div style={{ display: "flex", gap: 4 }}>
                        <div style={{ width: 16, height: 10, borderRadius: 2, background: "#1A1A1A", opacity: 0.4 }} />
                        <div style={{ width: 20, height: 10, borderRadius: 3, border: "1.5px solid #1A1A1A", opacity: 0.4, position: "relative" }}>
                            <div style={{ position: "absolute", right: 2, top: 2, bottom: 2, width: 10, borderRadius: 1, background: "#4CAF7D" }} />
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div>
                    <span style={{ fontSize: 11, fontWeight: 500, color: "#AAAAAA", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        Today
                    </span>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1A1A1A", marginTop: 2 }}>
                        Recovery
                    </h3>
                </div>

                {/* Recovery circle */}
                <div style={{ display: "flex", justifyContent: "center", padding: "12px 0" }}>
                    <div style={{ position: "relative", width: 130, height: 130 }}>
                        <svg width="130" height="130" viewBox="0 0 130 130">
                            <circle cx="65" cy="65" r={circleRadius} stroke="#E8F5EE" strokeWidth="10" fill="none" />
                            <circle
                                cx="65"
                                cy="65"
                                r={circleRadius}
                                stroke="#4CAF7D"
                                strokeWidth="10"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${strokeDash} ${circumference}`}
                                transform="rotate(-90 65 65)"
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
                            <span style={{ fontSize: 36, fontWeight: 800, color: "#1A1A1A" }}>73</span>
                            <span style={{ fontSize: 11, fontWeight: 500, color: "#AAAAAA", marginTop: -2 }}>% Recovered</span>
                        </div>
                    </div>
                </div>

                {/* Metrics */}
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ flex: 1, padding: "12px", borderRadius: 12, background: "#F7F6F3" }}>
                        <span style={{ fontSize: 11, color: "#AAAAAA", fontWeight: 500 }}>HRV</span>
                        <div style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", marginTop: 2 }}>
                            65.1 <span style={{ fontSize: 12, fontWeight: 400, color: "#6B6B6B" }}>ms</span>
                        </div>
                    </div>
                    <div style={{ flex: 1, padding: "12px", borderRadius: 12, background: "#F7F6F3" }}>
                        <span style={{ fontSize: 11, color: "#AAAAAA", fontWeight: 500 }}>Resting HR</span>
                        <div style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", marginTop: 2 }}>
                            49.1 <span style={{ fontSize: 12, fontWeight: 400, color: "#6B6B6B" }}>bpm</span>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <button
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: 12,
                        border: "none",
                        background: "#4CAF7D",
                        color: "#FFFFFF",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "default",
                        fontFamily: "inherit",
                    }}
                >
                    View Recovery Insights
                </button>

                {/* Timeline */}
                <div>
                    <span style={{ fontSize: 11, fontWeight: 500, color: "#AAAAAA", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        Timeline
                    </span>
                    <div
                        style={{
                            marginTop: 8,
                            padding: "10px 12px",
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
                                background: "#E8F5EE",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="#4CAF7D" strokeWidth="2" />
                            </svg>
                        </div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>Sleep</div>
                            <div style={{ fontSize: 11, color: "#AAAAAA" }}>7h 42m · 92% quality</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Section ─── */
export default function FeatureRecovery() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Left card: animate from -160 to 0 over scroll range 0.15-0.5
    const leftX = useTransform(scrollYProgress, [0.15, 0.5], [-160, 0]);
    const leftOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);

    // Right card: animate from 160 to 0 over scroll range 0.2-0.55
    const rightX = useTransform(scrollYProgress, [0.2, 0.55], [160, 0]);
    const rightOpacity = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);

    return (
        <section
            ref={sectionRef}
            style={{
                position: "relative",
                background: "#FFFFFF",
                padding: "120px 24px 160px",
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 80px" }}
            >
                <h2
                    style={{
                        fontSize: "clamp(36px, 4.5vw, 56px)",
                        fontWeight: 800,
                        color: "#1A1A1A",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        marginBottom: 20,
                    }}
                >
                    Smarter Recovery
                </h2>
                <p style={{ fontSize: 18, color: "#6B6B6B", lineHeight: 1.65 }}>
                    Understand how your body recovers overnight. Wake up knowing exactly
                    what your body is ready for — powered by HRV, resting heart rate, and
                    sleep analysis.
                </p>
            </motion.div>

            {/* Phone + Cards composition */}
            <div
                style={{
                    position: "relative",
                    maxWidth: 800,
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 600,
                }}
            >
                {/* Left metric card */}
                <motion.div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: "25%",
                        x: leftX,
                        opacity: leftOpacity,
                        zIndex: 2,
                    }}
                >
                    <MetricCard label="Resting HRV" value="50.4" unit="ms" status="Normal" />
                </motion.div>

                {/* Icon bubbles - left side */}
                <div
                    style={{
                        position: "absolute",
                        left: 30,
                        top: "8%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    <IconBubble icon="lung" delay={0.1} />
                    <IconBubble icon="leaf" delay={0.3} />
                </div>

                {/* iPhone */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    style={{ position: "relative", zIndex: 1 }}
                >
                    <IPhoneMockup />
                </motion.div>

                {/* Right metric card */}
                <motion.div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: "25%",
                        x: rightX,
                        opacity: rightOpacity,
                        zIndex: 2,
                    }}
                >
                    <MetricCard label="Resting HR" value="52.5" unit="bpm" status="Normal" />
                </motion.div>

                {/* Icon bubbles - right side */}
                <div
                    style={{
                        position: "absolute",
                        right: 30,
                        top: "8%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    <IconBubble icon="heart" delay={0.2} />
                    <IconBubble icon="activity" delay={0.4} />
                </div>
            </div>
        </section>
    );
}
