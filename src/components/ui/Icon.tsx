type IconName =
  | "watch"
  | "lab"
  | "fork"
  | "heart"
  | "moon"
  | "drop"
  | "arrow"
  | "plus"
  | "check"
  | "sparkle"
  | "bolt"
  | "apple"
  | "android";

type Props = {
  name: IconName;
  size?: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Icon({
  name,
  size = 24,
  stroke = "currentColor",
  fill = "none",
  strokeWidth = 1.6,
  className,
  style,
}: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill,
    stroke,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    style,
    "aria-hidden": true,
  };

  switch (name) {
    case "watch":
      return (
        <svg {...common}>
          <rect x="6" y="6" width="12" height="12" rx="3" />
          <path d="M9 3h6M9 21h6" />
          <path d="M12 10v3l2 1.5" />
        </svg>
      );
    case "lab":
      return (
        <svg {...common}>
          <path d="M9 3v5l-4 9a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-4-9V3" />
          <path d="M8 3h8" />
          <path d="M7 14h10" />
        </svg>
      );
    case "fork":
      return (
        <svg {...common}>
          <path d="M7 3v6a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" />
          <path d="M9 11v10" />
          <path d="M15 3c-1.5 0-2.5 2-2.5 5s1 3.5 2.5 3.5V21" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
          <path d="M4 12h4l1.5-3 3 6L14 11h6" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
        </svg>
      );
    case "drop":
      return (
        <svg {...common}>
          <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M4 12l5 5L20 6" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3l1.8 4.8L18 9.6l-4.2 1.8L12 16l-1.8-4.6L6 9.6l4.2-1.8L12 3z" />
          <path d="M19 15l.7 1.9L21.6 18l-1.9.7L19 21l-.7-2.3-1.9-.7 1.9-1.1L19 15z" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case "apple":
      return (
        <svg {...common}>
          <path d="M16 3c-1 0-2 .8-2.5 1.5C13 5 12.5 6 13 7c1 0 2-.8 2.5-1.5.5-.7 1-1.7.5-2.5z" />
          <path d="M17.5 13c0-2 1.5-3 2-3.5-1-1.5-3-2-4-2-1.5 0-2.5.5-3.5.5S9.5 7.5 8 7.5c-2 0-4 1.5-4 4.5 0 3.5 3 8 5 8 1 0 2-.7 3-.7s2 .7 3 .7c1 0 2-1 3-2.5 1-1.5 1-2.5 1-3.5z" />
        </svg>
      );
    case "android":
      return (
        <svg {...common}>
          <path d="M7 10a5 5 0 0 1 10 0v6H7z" />
          <path d="M5 12v4M19 12v4M9 16v3M15 16v3M8.5 8l-1-1.5M15.5 8l1-1.5" />
        </svg>
      );
  }
}
