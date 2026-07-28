# OutfitAI — Landing Page

Immersive marketing landing page for OutfitAI, in the app's **Warm Stone** design language. The page tells a linear story: add your clothes → generate a look → try it on → pricing → get the app.

## Framework & tools

**No build step.** This is a static page:

- Plain HTML entry (`index.html`)
- **React 18** loaded from CDN as UMD scripts (pinned + SRI hashes)
- **Babel standalone** transpiles the `.jsx` files in the browser (`<script type="text/babel" src="…">`)
- Design tokens as CSS custom properties (`styles.css`)
- Fonts (Plus Jakarta Sans, Playfair Display, DM Sans) and Material Symbols Rounded icons from Google Fonts

There is no bundler, no Tailwind, no npm dependencies at runtime. `package.json` exists only for the convenience `start` script.

## Run locally

The JSX files are fetched at runtime, so you need any static file server (opening `index.html` via `file://` will not work):

```bash
# option 1
npm start            # runs `npx serve .`

# option 2
npx serve .

# option 3
python3 -m http.server 8080
```

Then open the printed URL (e.g. http://localhost:3000).

## Files

| File | Role |
|---|---|
| `index.html` | Entry: fonts, CDN scripts, global CSS (blobs, keyframes), mounts `<Landing/>` |
| `styles.css` | All design tokens (colors, type, spacing, radii, shadows, gradients) |
| `components.jsx` | Reusable UI primitives: Icon, Button, Chip, SectionHeader, PageDots, PickCard |
| `experience.section.jsx` | The interactive demo (Steps 1–3: add clothes, generate, try on) |
| `landing.page.jsx` | Page shell: Nav, Hero, Pricing, GetApp, Footer |
| `assets/images/demo/` | Garment cutouts (`cut-item-*`), outfit flat-lays (`outfit-*`), AI try-on model shots (`cut-model-*`) |
| `DESIGN_SYSTEM.md` | Full design-system documentation |
| `LANDING_PAGE_SPEC.md` | Section-by-section page spec |

## Notes

- Internet access is required at runtime (React/Babel CDN + Google Fonts).
- `experience.section.jsx` loads before `landing.page.jsx`; components are shared via `window`.
- Images: `cut-*.png` are true-alpha cutouts; `outfit-*.png` keep their photo background and are blended with `mix-blend-mode: multiply` onto the warm stage.
