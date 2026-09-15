# EMFLS Network Baseline v1 for emfls-food Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align emfls-food with shared infrastructure baseline requirements while preserving its independent editorial recipe-book design and content architecture.

**Architecture:** Keep Astro static output, the existing two Content Collections, and the existing shared BaseLayout. Extend metadata and JSON-LD through BaseLayout props, add one Food-specific editorial trust page and internal policy document, and keep GA4 loading conditional on the production hostname at runtime.

**Tech Stack:** Astro, TypeScript, Astro Content Collections, Vanilla CSS, native browser APIs.

**Spec:** Current user request for EMFLS Network Baseline v1 on emfls-food.

## Global Constraints

- Do not copy another EMFLS project's visual design, content templates, analytics IDs, sitemap, or Cloudflare settings.
- Keep `output: 'static'`, `trailingSlash: 'always'`, no React/Vue/Tailwind/new analytics dependencies.
- Do not add recipes, knowledge articles, images, AdSense, GA4 IDs, or new product features.
- Preserve the existing sitemap architecture if it already meets requirements, extending only for the new editorial-policy route.
- Verify with `npm run check`, `npm run build`, generated artifact audits, and production HTTP checks where available.

### Task 1: Baseline documentation and trust policy

**Files:**
- Create: `CONTENT_POLICY.md`
- Modify: `src/pages/editorial-policy.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/sitemap.xml.ts`

- [ ] Add the public Food Editorial Policy page covering scope, source priority, update rules, food-safety limits, AI review, image rights, and correction requests without inventing contact details.
- [ ] Link the page from Footer and About.
- [ ] Add `/editorial-policy/` to the existing sitemap static route list.
- [ ] Add internal CONTENT_POLICY.md covering Recipe, Knowledge, safety language, source, AI, image, linking, and update rules.

### Task 2: Shared metadata, production analytics, structured data, accessibility baseline

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/layouts/ArticleLayout.astro`
- Modify: `src/pages/recipes/[...slug].astro`
- Modify: `src/styles/global.css`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`

- [ ] Expand BaseLayout props with defaults/overrides for canonical, noindex, OG/Twitter metadata, theme-color, and jsonLd.
- [ ] Load GA4 only when runtime hostname is exactly `food.emfls.com`; do not load it on localhost, pages.dev, workers.dev, or preview hosts.
- [ ] Add WebSite JSON-LD to the homepage and Recipe JSON-LD using only existing collection fields.
- [ ] Add skip link, explicit header/main/footer landmarks, and reduced-motion/focus/touch-target CSS without changing Food's visual identity.
- [ ] Preserve image omission when no real image exists.

### Task 3: Documentation and verification

**Files:**
- Modify: `PROJECT_HISTORY.md`
- Modify: `TASKS.md`
- Modify: `SITE_STRATEGY.md`
- Modify: `DESIGN_SYSTEM.md`
- Modify: `LAUNCH_CHECKLIST.md`
- Modify: `README.md` only if current route/analytics documentation needs correction.

- [ ] Record the baseline decisions, unchanged sitemap/trailing slash status, production-only analytics rule, metadata contract, Editorial/Content Policy, structured data scope, accessibility checks, AdSense non-application, and remaining work.
- [ ] Run checks, build, artifact audits, and production smoke checks.
- [ ] Commit and push only after fresh verification evidence.

