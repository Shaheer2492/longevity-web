"use client";

import Logo from "../ui/Logo";

const COLS: { title: string; links: string[] }[] = [
  { title: "Product", links: ["Waitlist", "How it works", "The science", "Pricing"] },
  { title: "Company", links: ["About", "Careers", "Press kit", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "Data handling"] },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--hair)",
        padding: "80px 0 40px",
      }}
    >
      <div className="wrap">
        <div
          className="footer-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 60,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 420 }}>
            <div style={{ marginBottom: 20 }}>
              <Logo size={38} fontSize={38} />
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: 380 }}>
              Health intelligence for people who already track their health,
              and want to know what to do with it.
            </p>
          </div>

          <div
            className="footer-cols"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(120px, 1fr))",
              gap: 48,
            }}
          >
            {COLS.map((c) => (
              <div key={c.title}>
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    color: "var(--muted)",
                    marginBottom: 14,
                  }}
                >
                  {c.title}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        style={{
                          fontSize: 13,
                          color: "var(--ink-2)",
                          textDecoration: "none",
                        }}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 60,
            paddingTop: 24,
            borderTop: "1px solid var(--hair)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 12,
            color: "var(--muted)",
          }}
        >
          <span>
            © 2026 Longevity. Not a medical device. Insights are educational,
            not diagnostic.
          </span>
          <span className="mono">v0.1 · Pre-launch</span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 700px) {
          .footer-cols {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </footer>
  );
}
