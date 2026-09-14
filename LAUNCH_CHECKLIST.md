# Production launch checklist

## Repository

- [x] `npm install` succeeds
- [x] `npm run check` reports 0 errors, 0 warnings, 0 hints
- [x] `npm run build` succeeds and outputs `dist`
- [x] `dist/404.html` is generated
- [x] No secrets, tokens, `.env` files, fake publisher IDs, or fake analytics IDs are committed
- [x] No placeholder, under-construction, or fake image content is present
- [x] Current branch is `main`

## Cloudflare Pages — external setup required

- [ ] Connect the `emfls/emfls-food` GitHub repository
- [ ] Set build command to `npm run build`
- [ ] Set output directory to `dist`
- [ ] Use a supported Node.js version compatible with `package-lock.json`
- [ ] Add custom domain `food.emfls.com`
- [ ] Configure DNS and confirm HTTPS certificate
- [ ] Check production 200 responses for `/`, `/categories/`, Recipe, Knowledge, tool, About, Privacy, Contact, and `/404.html`
- [ ] Confirm trailing-slash URLs are the canonical public URLs

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

- Production domain and Cloudflare connection are not configured in this repository.
- No real operating contact channel is configured; Contact intentionally does not show an invented email address.
- GA4 Measurement ID and AdSense publisher ID were not provided and must not be fabricated.
- Existing production dependency audit has 1 low, 1 high, and 1 critical issue requiring an Astro major upgrade; review separately before launch and do not use `npm audit fix --force` blindly.
