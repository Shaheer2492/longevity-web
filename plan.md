# Longevity Landing Page — REVISED Implementation Plan
# Based on actual Bevel screenshots (bevel.health)

---

## What Bevel Actually Looks Like (From Screenshots)

### Overall Aesthetic
- NOT dark. Bevel is bright, airy, Apple-aesthetic — white backgrounds, natural photography.
- Feels like Apple Health meets editorial photography.
- Ultra-clean typography: large centered bold sans-serif headlines, light body text.
- The app UI (iPhone screenshots) is the hero visual — real, detailed, beautiful.
- Scroll animations are the centrepiece: as you scroll, floating metric cards fly in from the sides.

---

## Section-by-Section Breakdown (from your screenshots)

### Section 1 — Hero (Full-bleed cinematic photo)
- Full-viewport-height background image: cinematic outdoor scene — person running on sunlit golden hill, blue sky.
- Navbar: floats over the image. Left: small logo. Center: frosted glass pill nav ("About us", "Blog", "Download App"). Ultra-minimal.
- Text positioned at bottom-center/bottom-left of hero:
  - H1: "The Everything Health App" — large bold sans-serif (~64px), white
  - Subtitle: 2 lines, white, ~18px, lighter weight
- CTA: Pill-shaped "Download App" button with Apple logo. White/frosted-glass. For our version: "Register for Early Trial" with email input.
- Badges: "Apple Watch Spotlight" + "New and Noteworthy" wreath badges below CTA.

### Section 2 — Feature Section: "Smarter Recovery" (White background)
- Pure white background — clean break from the hero photo.
- Centered layout. Generous whitespace.
- H2: "Smarter Recovery" — large, bold, centered, black (~56px).
- Subtitle: 2 lines centered gray body text below headline.
- Center visual: A hand holding an iPhone showing the real app Recovery screen (73% recovered circle, date, HRV/HR metrics, timeline).
- Scroll-linked floating cards animate in from left and right as user scrolls:
  - Left: "Resting HRV — 50.4ms — Normal" with green sparkline chart
  - Right: "Resting HR — 52.5 bpm — Normal" with green sparkline chart
  - 4 smaller floating icon cards (lung, heart, plant leaf, activity wave) appear around the phone
- Animation: cards are directly tied to scroll position (not just triggered on entry). Smooth, linear, continuous.

### Section 3 — Same Feature Section, Fully Scrolled
- The scroll animation has completed — all cards are in position.
- Both metric cards and all icon cards fully visible.
- The phone/hand mockup stays centered throughout.
- This is the "resting" end-state of the scroll animation.
- In a longer page, this would transition to the next feature (Sleep, Nutrition, etc.).

---

## Design System

### Color Palette
```
Background primary:  #FFFFFF  (pure white)
Background alt:      #F7F6F3  (very subtle warm off-white)
Text primary:        #1A1A1A  (near-black)
Text secondary:      #6B6B6B  (mid-gray body)
Text muted:          #AAAAAA  (labels, metadata)
Accent green:        #4CAF7D  (Bevel's green — status, positive indicators)
Accent green light:  #E8F5EE  (light green card tint)
Card surface:        #FFFFFF  + box-shadow: 0 4px 24px rgba(0,0,0,0.08)
Navbar pill bg:      rgba(255,255,255,0.72) + backdrop-filter: blur(12px)
Hero text:           #FFFFFF
```

### Typography
```
Font family:     "Inter" (via Google Fonts link tag — same approach as current layout.tsx)
Headline:        Inter 700-800, -0.03em tracking, clamp(44px, 5.5vw, 72px)
Body:            Inter 400, 1.65 line-height, 18px
```

### Motion Design
- Scroll-linked (not scroll-triggered): `useScroll` + `useTransform` from framer-motion.
- Cards tied DIRECTLY to scrollYProgress — movement feels physical/analog.
- Left card: x from -160px to 0, opacity 0 to 1 over scroll range [0.15, 0.5]
- Right card: x from +160px to 0, opacity 0 to 1 over scroll range [0.2, 0.55]
- Icon cards: scale 0.7→1, opacity 0→1 at staggered scroll offsets [0.1..0.6]
- Phone: fade+slide up on page load (Framer Motion `initial`/`animate`), then static center.
- Hero: full-bleed `<img>` with object-cover. Bottom text fades in on load.

---

## Full Rewrite Plan

### Files to rewrite
1. `src/app/globals.css`       — light theme, Inter font, remove all dark tokens
2. `src/app/layout.tsx`        — swap font to Inter, light body
3. `src/components/Navbar.tsx` — frosted pill nav, minimal, floats over hero
4. `src/components/Hero.tsx`   — cinematic full-bleed photo, bottom text + email CTA + badges
5. `src/components/FeatureRecovery.tsx` — NEW: white bg, centered title, iPhone hand mockup, scroll-animated floating metric cards
6. `src/components/Testimonials.tsx` — rewrite with light theme
7. `src/app/page.tsx`          — wire all sections

### Key implementation details

**Hero photo strategy:**
Use a free Unsplash image URL (loaded via `<img>` or next/image with `unoptimized`). Best option: a person running/walking in a lush outdoor landscape. Specific Unsplash URL to use:
https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=2000&q=80
(runner on path through green hills — very Bevel-appropriate)

**iPhone mockup strategy:**
Build as a pure React/CSS component — no image needed.
- Outer shell: rounded black rectangle, CSS border-radius ~44px, border 1px solid #333
- Screen: white inner area showing:
  - "Recovery" heading + date
  - Large SVG circle: green arc showing "73%" in center
  - Two metric rows: "Resting HRV: 65.1ms" | "Resting HR: 49.1 bpm"
  - "View Recovery Insights" button
  - "Timeline" label + primary sleep entry
- Wrapped in a container that applies a subtle 3D tilt

**Floating metric cards (CSS components):**
- White rounded card, subtle shadow, 160px wide
- Icon (green tint circle) + label + large value + colored status badge
- Mini sparkline SVG (simple path, green stroke)

**Email CTA in hero:**
- Same pill shape as Bevel's "Download App" button
- White/semi-transparent fill, dark text
- Single button: "Register for Early Trial →"
- On click: expands (Framer Motion layout animation) to show email input inline
- OR: simple pill with email input + submit — depends on how clean it reads

**Badges:**
SVG wreath decoration around icon + label text. Two badges side by side below CTA.
