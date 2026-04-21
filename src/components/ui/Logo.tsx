type Props = {
  size?: number;
  fontSize?: number;
  showWordmark?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Ember mark + "Longevity" wordmark.
 *
 * The gradient ID is intentionally static - the gradient is identical across
 * every instance, so all Logos can share the single <radialGradient> defined
 * here without collisions or SSR hydration mismatches.
 */
export default function Logo({
  size = 22,
  fontSize = 20,
  showWordmark = true,
  className,
  style,
}: Props) {
  // SVG viewBox is 160 x 180; preserve aspect ratio when scaling.
  const width = Math.round((size * 160) / 180);

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
        width={width}
        height={size}
        viewBox="0 0 160 180"
        fill="none"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <radialGradient id="ember-grad" cx="50%" cy="65%" r="60%">
            <stop offset="0%" stopColor="#e88956" />
            <stop offset="60%" stopColor="#b25b2e" />
            <stop offset="100%" stopColor="#6f3218" />
          </radialGradient>
        </defs>
        <path
          d="M 80 18 C 115 60, 138 100, 80 168 C 22 100, 45 60, 80 18 Z"
          fill="url(#ember-grad)"
        />
        <path
          d="M 80 40 C 100 70, 114 98, 80 148 C 46 98, 60 70, 80 40 Z"
          fill="none"
          stroke="#f6f1e4"
          strokeWidth="0.8"
          opacity="0.25"
        />
        <circle cx="80" cy="118" r="4" fill="#f6f1e4" opacity="0.85" />
      </svg>
      {showWordmark && (
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize,
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          Longevity
        </span>
      )}
    </span>
  );
}
