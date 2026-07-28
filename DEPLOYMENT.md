# OutfitAI Landing — Deployment Notes

Target host: **GitHub Pages**. Status: verified compatible, not yet deployed.

## Verdict

The page can be hosted on GitHub Pages **with no changes to the code**. It is a genuinely
static site — no build step, no bundler, no backend, no server-side routing.

| Requirement | Status |
|---|---|
| Static files only | ✅ `index.html` + CSS + JSX fetched at runtime |
| No backend | ✅ All demo data is hard-coded in React state |
| Relative asset paths | ✅ `./assets/images/…`, `styles.css` — works under `user.github.io/repo/` and a custom domain |
| HTTPS-only externals | ✅ unpkg + Google Fonts are `https://` — no mixed-content blocking |
| Case-sensitive filesystem | ✅ verified — every `.png` referenced in the JSX matches a real file exactly |
| No SPA routing | ✅ single page, hash anchors only — no 404 fallback needed |

`<script type="text/babel" src="…">` is safe on Pages: browsers never fetch unknown-type
scripts, Babel standalone pulls them via XHR, and XHR does not enforce MIME types — so
`.jsx` being served as `text/jsx` is a non-issue.

## Repo layout

GitHub Pages serves only from the **repo root** or **`/docs`** — not an arbitrary subfolder.
This project currently sits at `export/landing/`, so the repo must be initialised **inside
`landing/`**, making `landing/` the repo root. Do not make `export/` the repo root.

## Deploy steps

1. `git init` inside `landing/`
2. Commit — `.nojekyll` and `.gitignore` are already prepared
3. Create the GitHub repo and push
4. Settings → Pages → Source: `main` / `/` (root)

`.nojekyll` is not strictly required (Jekyll only renders files carrying YAML front matter,
and none here do) but it removes all ambiguity and speeds up the deploy.

## Open decisions

### Performance — RESOLVED, no optimisation for now

**Deployed as-is on 2026-07-28. Judged acceptable on the live URL — not slow. No
optimisation work is planned.** The React development builds and in-browser Babel stay.

Caveat on that verdict: it is a developer-machine impression, not an instrumented
measurement, and the page had likely been loaded before. A first-time visitor on a phone
or a slow connection downloads all 19 MB cold. Since this is a conversion page aimed
squarely at first-time visitors, revisit if analytics show mobile bounce or slow loads.

Standing suspect if that day comes — **the images, not the JS**:

- `assets/images/demo/` totals **19 MB** across 15 PNGs.
- The 9 closet cutouts are **1122×1402** each but render into **46px** thumbnails
  (see `LANDING_PAGE_SPEC.md` §Step 1) — roughly a 24× oversample, about 11 MB of the 19 MB.
- The 3 flat-lays are 1254×1254 and the 3 model shots 1122×1402.

Secondary suspect: `index.html` loads `react.development.js` / `react-dom.development.js`,
and Babel transpiles ~32 KB of JSX in the browser on every page load. Swapping to
`react.production.min.js` requires new SRI hashes. Precompiling the JSX would remove Babel
entirely but breaks the "no build step" property `README.md` is deliberate about.

If the live page is slow, resize the images before touching the JS.

### "Get the app" CTA — intentionally unwired

The **Get the app** buttons are visual-only with no store URL, as noted in
`LANDING_PAGE_SPEC.md` §Dependencies. This is **blocked on pending changes to the web page
itself**, not an oversight. Wire it up once those changes land.
