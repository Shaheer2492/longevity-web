type Props = {
  size?: number;
  fontSize?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Logo({ size = 22, fontSize = 20, className, style }: Props) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        color: "var(--ink)",
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M3.5 12.5h3l1.5-3 2.5 6 2-3.5 1.5 2h6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.6" fill="var(--accent)" />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontSize,
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        Longevity
        <em
          style={{
            color: "var(--accent)",
            fontStyle: "italic",
          }}
        >
          .
        </em>
      </span>
    </span>
  );
}
