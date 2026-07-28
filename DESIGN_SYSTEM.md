# OutfitAI — Warm Stone Design System

Design documentation for the OutfitAI landing page (and the mobile app it markets). Everything below is implemented as CSS custom properties in `styles.css` — always reference tokens, never hard-code values.

## 1. Brand / style direction

- **Vibe:** a quiet, premium personal stylist. Warm, editorial, restrained — never "tech product".
- **Philosophy:** *garment photography provides the color; the accent is reserved for actions and highlights.* Chrome is warm cream/stone; the only loud element on any view is the single gold→brown CTA.
- **Voice:** calm second person, sentence case everywhere ("Try this on", "See why"). Contractions, no exclamation marks, no hype. Facts stated plainly ("4 pieces").
- **Emoji:** never in the landing page (the app uses exactly five rack emoji 👕🧥👖👟👜 — nowhere else).

## 2. Color palette

Backgrounds
- `--canvas` **#F6F0E6** — page wash
- `--canvas-deep` / `--surface` / `--tile` **#EAE0D0** — cards, sheets, garment tiles
- `--surface-elevated` **#F2EAD8** — modals/popovers

Text (warm ink ramp)
- `--ink` **#2A2018** — headlines, body
- `--ink-muted` **#7A6450** — subtitles, captions
- `--ink-tertiary` **#AA9880** — placeholder, disabled

Action & accent
- `--action` **#6B4C38** (brown, primary CTA + text links) · pressed/hover `--action-light` **#8C6A54**
- `--on-action` **#FFF8F4** — text on action
- `--accent` **#B87A3A** (gold) · `--accent-light` **#D4A060** — badges, highlights, ambient blobs

Borders & glass
- `--line` rgba(212,196,170,.40) — the universal hairline
- `--border` **#D4C4AA**, `--border-subtle` **#E2D6C4**
- `--glass-card` rgba(234,224,208,.80) · hover .90 · glass borders rgba(212,196,170,.20/.40)

Semantic (used sparingly)
- success #4A7A3A / #EAF3DE · warning #D4A017 · error #A32D2D / #FCEBEB

Gradients
- `--grad-page` 135° #F6F0E6→#EAE0D0 — app/page backdrop
- `--grad-mesh-base` 165° #EADDC4→#E0CFB0 — ambient mesh base (hero, CTA band)
- `--grad-cta` 90° #B87A3A→#6B4C38 — primary buttons
- `--grad-premium-dark` 135° #2A2018→#6B4C38 40%→#B87A3A — dark feature/pricing cards
- Ambient blob fills: #F6E3BE, rgba(184,122,58,.28–.40), rgba(212,160,96,.35–.40)

**Never** use navy, periwinkle, violet, or cool greys.

## 3. Typography

Families
- `--font-ui` **Plus Jakarta Sans** (400–800) — the workhorse: headings, UI, buttons, chips
- `--font-display` **Playfair Display** (500) — editorial hero/section display lines
- `--font-body` **DM Sans** (400–700) — long-form prose

Scale (weight size/line-height · tracking)
- Display hero (landing h1): Playfair 500 **56/1.1**
- Display band title: Playfair 500 **40/1.15**
- `--text-hero` Jakarta 800 26/1.2 · −0.6px
- `--text-title` Jakarta 800 20/1.25 · −0.5px (section titles, card titles)
- `--text-section-head` Jakarta 800 18/1.3 · −0.5px
- `--text-overline` Jakarta 700 11/1.4 · **+1.2px, UPPERCASE** (eyebrows)
- `--text-chip` Jakarta 600 13 (chips, text links)
- `--text-body-md` Jakarta 500 14/1.5 · `--text-caption` 500 11
- `--text-prose` DM Sans 400 14/1.6 (landing body runs 15–17px)

Signature pattern: **eyebrow + title** — tracked-out uppercase overline in `--ink-muted`, bold Jakarta title 2–4px below.

## 4. Spacing

4-px base scale: `--space-xs` 4 · `sm` 8 · `md` 12 · `lg` 16 · `xl` 20 · `xxl` 24 · `xxxl` 32.
Screen gutter = 24px on the landing page (20px in the app). Section vertical padding: 56–88px.

## 5. Layout / grid

- Content max-width **1080px**, centered, `padding: 0 24px`.
- Two-column feature grids: `grid-template-columns: 1.1fr 0.9fr` (or mirrored), `gap: 56–64px`, `align-items: center`.
- Cards-in-a-row: CSS grid `repeat(3, 1fr)`, gap 12–20.
- Sticky pill nav floats 16px from top over content (z-index 10).

## 6. Border radii

Exactly three radii + pill: `--radius-sm` **12** (chips, small tags) · `--radius-md` **20** (buttons, inputs, list cards) · `--radius-lg` **28** (cards, stages, sheets) · `--radius-pill` **100** (nav bar). Micro-elements (icon squares, badges) use 12–16.

## 7. Shadows & effects

Always **warm, double-layer** (ink ambient + gold tint) — never cool grey:
- `--shadow-glass` 0 8 32 rgba(42,32,24,.08) + 0 2 8 rgba(184,122,58,.10) — panels, nav
- `--shadow-card` 0 14 30 −16 rgba(42,32,24,.16) — stage cards
- `--shadow-elevated` 0 16 48 rgba(42,32,24,.12) + 0 4 16 rgba(184,122,58,.15) — dark pricing card
- `--shadow-cta` 0 5 14 −3 rgba(184,122,58,.35) — the gold CTA glow

Glass/blur: real `backdrop-filter: blur(14px)` is reserved for **fixed chrome only** (the sticky nav). Everywhere else, translucency is faked with rgba fills + hairline borders.

Ambient mesh: a `--grad-mesh-base` panel with 2–3 absolutely-positioned circular blobs, `filter: blur(60px)`, drifting on 14–16s alternate ease-in-out loops (gated by `prefers-reduced-motion`).

Imagery blending: garment cutouts (true alpha) sit directly on stages; flat-lay *photos* use `mix-blend-mode: multiply` so their off-white background disappears into the warm canvas.

## 8. Buttons

Primary (`Button`, variant `primary`)
- Fill `--grad-cta`, radius `--radius-md` (20), height **46** (compact **36**)
- Label: Jakarta 700, 14px (compact 13), color `--on-action`, sentence case, verb-first
- Shadow `--shadow-cta`; pressed swaps to lighter gradient (accent-light→action-light)
- Loading: spinner replaces label, taps ignored. `block` stretches full-width.
- **One primary CTA per view region.**

Text action (variant `text`)
- Jakarta 600 13, color `--action`, no background; pressed = 60% opacity.

## 9. Cards & components

- **Stage card:** `--surface` fill, 1px `--line`, radius-lg 28, `--shadow-card`, 16px padding. Inside: a "stage" — `radial-gradient(115% 100% at 50% 22%, #FBF7EF 0%, var(--canvas) 55%, var(--tile) 100%)`, radius-lg, holding a cutout image.
- **Chip:** canvas fill (82% alpha over imagery), 1px `--line`, radius-sm 12, padding 4×10, Jakarta 600 12, optional 13px icon.
- **Item card (closet):** 14×16 padding, radius-md 20; unselected = `--surface` + `--line`; **selected = 2px `--action` border + white 86% fill + warm shadow + brown check disc** (24px).
- **Perk row:** surface card, radius-md, 40px icon square (canvas fill, hairline, 20px `--action` icon).
- **Dark feature/pricing card:** `--grad-premium-dark`, white text, gold badge chip (rgba(184,122,58,.25) fill, .4 border), `--shadow-elevated`.
- **Step header:** 44px numbered square (radius 16) — surface+hairline while pending, `--grad-cta` with check when done — beside an eyebrow+title pair.
- **PageDots:** active 18×6 `--action` pill, inactive 6×6 `--line` dots.

## 10. Navbar

Sticky pill: `rgba(246,240,230,0.7)` + `backdrop-filter: blur(14px)`, 1px `--glass-border-strong`, radius 100, `--shadow-glass`, padding 12×24, max-width 1080 centered, floats 16px below top. Contents: wordmark (Jakarta 800 20, −0.5px) · spacer · text links (Jakarta 600 13, `--ink-muted`) · compact primary CTA.

## 11. Hero

Full-bleed ambient mesh behind a 1.1fr/0.9fr grid (84px top / 96px bottom padding): left = overline eyebrow, Playfair 56px two-line headline, 17px muted prose (max 440px), CTA row (primary + text), 3 translucent icon chips; right = a `PickCard` (360px max) showing today's look with piece chips and CTA.

## 12. Motion & interaction

- Ambient blobs: 14–16s alternate drift loops; staggered `animation-delay`.
- Content reveals: `.x-fadein` — 0.5s ease, fade + 10px rise.
- Spinners: 0.8s linear rotation.
- Generating/trying delays are simulated at 1.1s/1.4s.
- Gating: later steps sit at `opacity: .35; pointer-events: none` until prerequisites complete (0.4s ease transition).
- Hover/press: buttons lighten (never darken); text actions drop to 60% opacity; smooth scroll for in-page nav.
- Respect `prefers-reduced-motion` for all looping animation.

## 13. Iconography & imagery

- Icons: **Material Symbols Rounded** (Google Fonts), weight 400; FILL=1 for solid contexts. Sizes: 12–13 in chips/badges, 15–20 in rows, 40 for empty states. Never hand-drawn SVGs, never emoji as icons.
- Imagery: warm-toned garment photography. Items/models are background-removed cutouts (`cut-*.png`); flat-lays are photos blended via multiply. Garments always sit on a lit radial stage or neutral stone tile.
- Logo: **none exists** — the brand renders as the plain wordmark "OutfitAI" in Jakarta 800 (UI) or Playfair 500 (editorial). Do not invent a mark.

## 14. Responsive behavior

The current implementation is desktop-first (1080px container; grids in fixed fr units). Intended adaptation:
- **Tablet (≤1024px):** two-column grids collapse to single column, media first; closet grid 3→2 columns; hero headline 44–48px.
- **Mobile (≤640px):** everything single-column; gutter 20px; hero 36px; nav keeps wordmark + CTA only; closet grid 2 columns; step content loses its 60px left indent; stages ~280px tall.
- Buttons never shrink below 44px hit height on touch.

## 15. Do's and don'ts

**Do**
- Use tokens for every color, radius, shadow, and font.
- Keep one gold→brown CTA per region; everything else quiet.
- Use eyebrow+title for every section header; sentence case everywhere.
- Keep shadows warm; keep hairlines at `--line`.
- Put cutout garments on stages/tiles; multiply-blend photo flat-lays.

**Don't**
- No cool greys, blues, purples, or neutral #eee borders.
- No real blur inside scrollable content (fixed chrome only).
- No Title Case, ALL-CAPS (except overlines), exclamation marks, or hype copy.
- No emoji, no hand-rolled SVG icons, no invented logo.
- No new radii/shadows/spacings outside the token set.
