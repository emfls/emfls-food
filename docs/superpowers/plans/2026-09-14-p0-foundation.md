# emfls-food P0 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the initial static Astro foundation for food.emfls.com with reusable recipe and food-knowledge content structures.

**Architecture:** Astro static output with TypeScript, Astro Content Collections, shared metadata/related-content types, and Vanilla CSS. Pages consume collection data through small typed helpers and shared layouts; no client framework or runtime API is introduced.

**Tech Stack:** Astro, TypeScript, Vanilla CSS, Astro Content Collections, `@astrojs/sitemap`.

**Spec:** User-approved P0 requirements in the conversation.

## Global Constraints

- Use `output: 'static'`.
- Keep recipe and food-knowledge collections separate.
- Do not add React, Vue, Tailwind, database, CMS, analytics, ads, or deployment configuration.
- Keep sample content minimal and avoid placeholders/lorem ipsum.
- Use `food.emfls.com` as the canonical site URL.
- Record major decisions and incomplete work in `PROJECT_HISTORY.md`.

### Task 1: Astro foundation and content schemas

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`
- Create: `src/content.config.ts`
- Create: `src/content/recipes/soy-sauce-egg-rice.md`
- Create: `src/content/knowledge/how-to-store-leafy-greens.md`

- [x] Create the minimal Astro project configuration and separate typed collections with shared metadata and related-content fields.
- [x] Add one recipe and one food-knowledge entry with complete, useful sample copy.
- [x] Run `npm install` and `npm run build` after the foundation is in place.

### Task 2: Shared layout, navigation, and editorial design system

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/layouts/ArticleLayout.astro`
- Create: `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/GuideCard.astro`, `src/components/RecipeFacts.astro`
- Create: `src/styles/global.css`

- [x] Implement semantic document structure, metadata, canonical, Open Graph, and responsive navigation.
- [x] Define the warm editorial recipe-book visual system with reusable card and article patterns.
- [x] Ensure the design works without JavaScript.

### Task 3: Public routes and collection-driven pages

**Files:**
- Create: `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/privacy.astro`, `src/pages/contact.astro`, `src/pages/categories.astro`, `src/pages/404.astro`
- Create: `src/pages/recipes/[...slug].astro`, `src/pages/knowledge/[...slug].astro`
- Create: `public/robots.txt`

- [x] Build the homepage sections: hero, categories, featured guides, cooking knowledge, ingredients/storage, tools teaser, recent guides.
- [x] Build category discovery and collection-driven detail templates.
- [x] Add sitemap integration and robots metadata.

### Task 4: Required project documentation

**Files:**
- Create/update: `AGENTS.md`, `README.md`, `SITE_STRATEGY.md`, `DESIGN_SYSTEM.md`, `TASKS.md`, `PROJECT_HISTORY.md`

- [x] Document mission, audience, topic boundaries, content rules, SEO, monetization direction, and excluded content.
- [x] Document design tokens, layout, navigation, cards, recipe layout, image policy, responsive rules, and forbidden patterns.
- [x] Track P0 completion accurately and leave P1/P2 work explicitly incomplete.

### Task 5: Verification

- [x] Run `npm install`.
- [x] Run `npm run build`.
- [x] Run `npm run check`.
- [x] Inspect generated routes and search for placeholder copy.
- [x] Confirm git status and update `PROJECT_HISTORY.md` with results.
