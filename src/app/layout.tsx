import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Longevity: Know what to do about your health this week",
  description:
    "Longevity connects your wearables, labs, and habits, then tells you the single most important thing to change this week. Backed by longevity science. Not guesswork.",
  openGraph: {
    title: "Longevity: Know what to do about your health this week",
    description:
      "Longevity connects your wearables, labs, and habits, then tells you the single most important thing to change this week. Backed by longevity science. Not guesswork.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body data-palette="warm" className="grain antialiased">
        {children}
      </body>
    </html>
  );
}
