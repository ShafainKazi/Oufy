# OutfitAI Landing Page — Specification

## Purpose

Convert visitors into app installs by letting them **experience the product's core loop in the page itself**: add clothes → generate an outfit → try it on — then show pricing and the install CTA. The page is a linear story; later steps unlock as earlier ones complete.

## Section breakdown (in order)

### 1. Nav (sticky pill)
- Component: `Nav` (Landing.jsx)
- Wordmark "OutfitAI" · links **Try it** (→ #experience) and **Pricing** (→ #pricing) · compact primary button **Get the app** (→ #get-app)
- Warm glass pill (blur 14, hairline, glass shadow), sticky 16px from top, max-width 1080
- Links smooth-scroll with a 70px offset

### 2. Hero
- Components: `Hero` + `PickCard`, `Button`, `Chip`
- Ambient mesh background (3 drifting blurred blobs on the 165° beige gradient), full-bleed behind the nav
- Left column:
  - Eyebrow: **YOUR DAILY STYLIST**
  - H1 (Playfair 56): **"Your wardrobe, styled daily"**
  - Prose: "Add the clothes you own. Get a look for today, with the reasoning to see why. Try it on before you get dressed. Walk through it below — for real."
  - Buttons: **Try the demo** (primary → #experience) · **See pricing** (text → #pricing)
  - Chips: Weather-aware · Explainable picks · Virtual try-on (each with a 13px gold icon)
- Right column: PickCard — Smart Casual flat-lay (multiply-blended) on a lit stage, "4 pieces" chip, title **Smart Casual**, piece chips (Navy Shirt, Beige Chinos, White Sneakers), CTA **Try this on** (→ #experience)

### 3. The Experience (id `experience`) — Steps 1–3
Component: `Experience` (Experience.jsx). All step content is indented 60px under a 44px step-number square.

**Step 1 — "Add your clothes"**
- Eyebrow STEP ONE; helper prose: "Your closet, catalogued. Tap the pieces to add them — nine pieces are enough for a week of looks."
- 3×3 grid of `ItemCard`s: thumbnail (46px stone tile with the real cutout), name, brand, +/check disc. Tap toggles.
- Closet (name · brand): Navy Shirt · Uniqlo / Striped White Shirt · Charles Tyrwhitt / Burgundy Knit Polo · COS / Beige Chinos · Dockers / Off-White Chinos · J.Crew / Black Trousers · Theory / White Sneakers · Common Projects / Black Loafers · Meermin / Brown Loafers · Meermin
- Footer row: button **Add all nine** (becomes **Wardrobe ready**) + counter "n of 9 added"
- Step square becomes gradient+check when all 9 added

**Step 2 — "Generate today's look"** (dimmed to 35% until Step 1 complete)
- Left card (stage + info): CTA **Generate** → 1.1s "Styling…" spinner → reveals outfit flat-lay (multiply-blend) with "3 pieces" chip, title, piece chips, and a one-line "why" with a gold sparkle icon. Button label becomes **Generate another**, then **All three styled** (disabled). PageDots + **Previous looks** cycle revealed outfits.
- Outfits (title → pieces → why):
  1. **Smart Casual** — Navy Shirt, Beige Chinos, White Sneakers — "Mild and sunny — breathable cotton, sleeves ready to roll, nothing that fights the weather."
  2. **The Work Fit** — Striped White Shirt, Black Trousers, Black Loafers — "Meetings till six — crisp stripes and black leather read sharp without a jacket."
  3. **Party Wear** — Burgundy Knit Polo, Off-White Chinos, Brown Loafers — "Dinner on the calendar — the knit polo dresses up while the chinos keep it easy."

**Step 3 — try-on card (right of Step 2 grid)**
- Empty state: accessibility icon + "Generate a look first" / "See it on a body, not a bed"
- CTA **Try this on** → 1.4s "Fitting it on you…" spinner → the matching AI model cutout fades in with an "AI try-on" chip; helper copy flips to "That settles it — hang it back or wear it out."; button becomes **Looks right** (inert). Per-outfit tried state is remembered.

### 4. Pricing (id `pricing`)
- Eyebrow PRICING · title **"Try it free, keep it for less than a coffee a week"**
- Left column (stacked):
  - **7-day trial** card (surface): "Free / for a week" — "Full capabilities of the app, with 5 virtual try-ons. No card up front."
  - **Core** card (premium-dark gradient): **$12.99 / month** — "Everything OutfitAI does, in one quiet subscription. Cancel anytime." + button **Start free, then Core** (→ #get-app)
- Right column, three perk rows: Daily outfit recommendations · **25 virtual try-ons a month** · The outfit canvas

### 5. Get the app (id `get-app`)
- Ambient mesh band, centered: Playfair 40 **"Get dressed with intention"**, prose "Start with the pieces you already own.", buttons **Get the app** (primary) + **Try the demo again** (text → #experience)

### 6. Footer
- Hairline top border, canvas fill: wordmark · "© 2026 OutfitAI"

## Interactions summary
- Smooth in-page scrolling; step gating (opacity + pointer-events); simulated generation/try-on latencies with spinners; fade-in reveals; pressed-state color shifts on buttons; per-outfit state (revealed / current / tried) in React state.

## Dependencies & assumptions
- React 18 UMD + Babel standalone from CDN (pinned, SRI); Google Fonts (3 families + Material Symbols Rounded). Internet required.
- Components shared via `window` (`components.jsx` loads first).
- Images in `assets/images/demo/`: `cut-item-*.png` (9 garment cutouts), `outfit-*.png` (3 flat-lay photos, multiply-blended), `cut-model-*.png` (3 AI try-on cutouts).
- All content is pre-decided demo data; no backend. "Get the app" buttons are visual-only (no store URL yet).
- Desktop-first (1080px container); see DESIGN_SYSTEM.md §14 for intended responsive adaptation.
