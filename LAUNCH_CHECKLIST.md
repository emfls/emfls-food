# Production launch checklist

## Repository

- [x] `npm install` succeeds
- [x] `npm run check` reports 0 errors, 0 warnings, 0 hints
- [x] `npm run build` succeeds and outputs `dist`
- [x] `dist/404.html` is generated
- [x] No secrets, tokens, `.env` files, fake publisher IDs, or fake analytics IDs are committed
- [x] No placeholder, under-construction, or fake image content is present
- [x] Current branch is `main`

## Cloudflare Pages

- [x] Connect the `emfls/emfls-food` GitHub repository
- [x] Set build command to `npm run build`
- [x] Set output directory to `dist`
- [x] Use a supported Node.js version compatible with `package-lock.json`
- [x] Add custom domain `food.emfls.com`
- [x] Configure DNS and confirm HTTPS certificate
- [x] Check production 200 responses for `/`, `/categories/`, Recipe, Knowledge, tool, About, Privacy, Contact, and `/404.html`
- [x] Confirm trailing-slash URLs are the canonical public URLs

## Search

- [ ] Add `food.emfls.com` to Google Search Console
- [ ] Submit `https://food.emfls.com/sitemap-index.xml`
- [ ] Inspect representative Recipe, Knowledge, About, and tool URLs

## Analytics — external setup required

- [ ] Create a GA4 property and obtain the real Measurement ID
- [ ] Add the ID through one documented site-wide configuration point
- [ ] Update `Privacy` before enabling analytics
- [ ] Verify consent and privacy requirements for the target audience and jurisdiction

## AdSense — external setup required

- [ ] Confirm the site has a real publisher account and approved publisher ID
- [ ] Decide ad placements after reviewing content readability; do not place ads in navigation or near controls
- [ ] Add real AdSense code only after approval and privacy review
- [ ] Create `public/ads.txt` only with the real publisher line, for example `google.com, pub-REAL_ID, DIRECT, f08c47fec0942fa0`
- [ ] Update Privacy before enabling AdSense and its cookies/identifiers
- [ ] Re-run build and production route checks after integration

## Current blockers

- No real operating contact channel is configured; Contact intentionally does not show an invented email address.
- GA4 Measurement ID and AdSense publisher ID were not provided and must not be fabricated.
- Existing production dependency audit has 1 low, 1 high, and 1 critical issue requiring an Astro major upgrade; review separately before launch and do not use `npm audit fix --force` blindly.

## 2026-09-15 production QA

- `https://food.emfls.com/` DNS lookup failed with `Could not resolve host`; no HTTP response or TLS certificate could be inspected.
- Because the custom domain did not resolve, Cloudflare Pages project identity, GitHub connection, production branch, latest deployment result, and `pages.dev` mapping could not be verified from this environment.
- Production Route smoke tests, browser rendering, Recipe Scaling, Cooking Converter, swap behavior, invalid-input handling, headers/footers, CSS, internal links, canonical tags, sitemap, and robots were not reported as passed. Local artifact checks remain separate and are not a substitute for production QA.
- No source or configuration changes were made during this QA attempt.

## 2026-09-15 deployment verification

- Cloudflare Pages project `emfls-food` is connected to GitHub `emfls/emfls-food`, production branch `main`.
- Build configuration is `npm run build` with output directory `dist`; Astro framework detected.
- Production deployment `70e75954-95a3-4e10-8e52-60a65b07c6ca` completed successfully.
- `emfls-food.pages.dev` returned HTTP 200 and `food.emfls.com` custom domain became active.
- DNS CNAME is `food.emfls.com -> emfls-food.pages.dev`; HTTPS and Cloudflare response headers were verified.
- Route, browser feature, and production SEO QA passed. See `PROJECT_HISTORY.md` for the exact test scope.
