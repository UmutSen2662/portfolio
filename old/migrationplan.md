# Portfolio Migration Plan: React SPA → Astro

This document outlines the full migration strategy for converting the portfolio from a **React 19 + Vite SPA** to an **Astro static site** with React islands. The goal is to ship pre-rendered HTML with near-zero JavaScript, while preserving all existing interactivity.

---

## Why Migrate

| Metric | Current (React SPA) | After (Astro) |
|:---|---:|---:|
| `index.html` content | Empty `<div id="root">` | Full rendered HTML (~15-25 KB) |
| JavaScript bundle | **278 KB** (React runtime + all components) | **~20-40 KB** (islands only) |
| CSS | 37 KB | ~37 KB (same Tailwind output) |
| **Total page weight** | **~315 KB** | **~75-100 KB** |
| SEO / bot visibility | ❌ Blank page without JS | ✅ Full content visible |
| Lighthouse Performance | Limited by JS hydration | Near-perfect scores |

---

## Architecture Overview

### Before (React SPA)

```
Browser loads empty HTML → Downloads 278KB JS → React renders everything
```

All content (Hero, Education, Experience, Projects) is invisible until JavaScript executes.

### After (Astro)

```
Browser loads full HTML (content pre-rendered) → Hydrates only interactive islands
```

Content is immediately visible. Only carousel, background animation, and scroll-dependent UI load JS.

### Island Map

After migration, these are the **only** components that ship JavaScript:

| Island Component | Reason | Hydration Directive |
|:---|:---|:---|
| `InteractiveBackground` | Canvas animation, browser globals (`window`) | `client:only="react"` |
| `Projects` (entire section) | Embla carousel, modal open/close state logic | `client:visible` |
| `BackToTop` | Scroll listener, show/hide state | `client:load` |

**Everything else becomes static HTML at build time** — Hero, Education cards, Experience items, Footer, etc.

---

## Migration Steps

### Phase 1: Project Initialization

#### 1.1 — Create a fresh Astro project

You can either:
- **Option A (recommended):** Create a new Astro project alongside, then port files over.
- **Option B:** Initialize Astro in-place (more complex, risk of breaking git history).

**Option A steps:**

```bash
# From the parent directory of the portfolio
npm create astro@latest portfolio-astro -- --template minimal --no-install
cd portfolio-astro
npm install
```

#### 1.2 — Add integrations

```bash
npx astro add react tailwind
npm install embla-carousel-react react-icons clsx tailwind-merge
npm install -D @types/node
```

This installs:
- `@astrojs/react` — Enables React components as islands
- `@astrojs/tailwind` — Tailwind CSS v4 support
- All existing runtime dependencies

#### 1.3 — Configure `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: {
      prefixDefaultLocale: true, // /en/... and /tr/...
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
```

> **Note:** Tailwind CSS v4 uses the Vite plugin directly rather than the `@astrojs/tailwind` integration. The `@tailwindcss/vite` plugin is passed through Astro's Vite config.

#### 1.4 — Configure `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

### Phase 2: Directory Structure

#### 2.1 — New file tree

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.astro            ← CONVERT from .tsx
│   │   ├── LanguageSwitcher.astro  ← CONVERT from .tsx (just links now)
│   │   ├── Footer.astro            ← CONVERT from .tsx
│   │   ├── InteractiveBackground.tsx  ← KEEP as React (island)
│   │   └── BackToTop.tsx           ← KEEP as React (island)
│   ├── sections/
│   │   ├── Hero.astro              ← CONVERT from .tsx
│   │   ├── Education/
│   │   │   ├── Education.astro     ← CONVERT from index.tsx
│   │   │   └── EducationCard.astro ← CONVERT from .tsx
│   │   ├── Experience/
│   │   │   ├── Experience.astro    ← CONVERT from index.tsx
│   │   │   └── ExperienceItem.astro← CONVERT from .tsx
│   │   └── Projects/
│   │       ├── index.tsx           ← KEEP as React (entire section is island)
│   │       ├── ProjectCard.tsx     ← KEEP as React
│   │       └── ProjectModal.tsx    ← KEEP as React
│   └── ui/
│       ├── Button.astro            ← CONVERT from .tsx
│       ├── Card.astro              ← CONVERT from .tsx
│       └── Tooltip.astro           ← CONVERT from .tsx
├── data/                           ← KEEP as-is (no changes needed)
│   ├── education.ts
│   ├── experience.ts
│   ├── hero.ts
│   ├── projects.ts
│   ├── types.ts
│   └── ui.ts
├── layouts/
│   └── Layout.astro                ← NEW (base HTML shell)
├── lib/                            ← KEEP as-is
│   ├── localization.ts
│   └── utils.ts
├── pages/
│   ├── index.astro                 ← NEW (redirects to /en/)
│   ├── en/
│   │   └── index.astro             ← NEW (English page)
│   └── tr/
│       └── index.astro             ← NEW (Turkish page)
└── styles/
    └── global.css                  ← RENAME from index.css
```

#### 2.2 — Files to DELETE (no longer needed)

| File | Reason |
|:---|:---|
| `src/App.tsx` | Replaced by `pages/*.astro` |
| `src/main.tsx` | Astro handles its own entry point |
| `src/context/LanguageContext.tsx` | Language is now route-based, not runtime context |
| `src/hooks/useData.ts` | Resolution moves to `.astro` frontmatter |
| `vite.config.ts` | Replaced by `astro.config.mjs` |
| `index.html` (root) | Astro generates its own HTML |

---

### Phase 3: Core Systems

#### 3.1 — Layout (`src/layouts/Layout.astro`)

This replaces the shell that was previously in `index.html` + `main.tsx`:

```astro
---
import '@/styles/global.css';
import { ClientRouter } from 'astro:transitions';

interface Props {
  title: string;
  description: string;
  lang: 'en' | 'tr';
}

const { title, description, lang } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    <link rel="canonical" href={canonicalURL.href} />

    <!-- Alternate language links for SEO -->
    <link rel="alternate" hreflang="en" href="/en/" />
    <link rel="alternate" hreflang="tr" href="/tr/" />
    <link rel="alternate" hreflang="x-default" href="/en/" />

    <ClientRouter />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

#### 3.2 — Localization Strategy

The `Poly<T>` type and `resolvePoly` function in `src/lib/localization.ts` remain **unchanged**.

What changes is **where** resolution happens:

| Before (React SPA) | After (Astro) |
|:---|:---|
| `useLanguage()` reads language from React Context | Language comes from the route (`/en/` or `/tr/`) |
| `useData()` resolves `Poly<T>` at runtime in the browser | `.astro` frontmatter resolves `Poly<T>` at **build time** on the server |
| `LanguageContext.tsx` manages state | Deleted — no longer needed |

**Example — how a section resolves data now:**

```astro
---
// src/components/sections/Hero.astro
import { resolvePoly } from '@/lib/localization';
import { HERO } from '@/data/hero';
import type { Language } from '@/data/types';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;

// Resolve at build time (this code runs on the server, not in the browser)
const hero = {
  greeting: resolvePoly(HERO.greeting, lang),
  title: resolvePoly(HERO.title, lang),
  description: resolvePoly(HERO.description, lang),
  location: resolvePoly(HERO.location, lang),
  downloadResume: resolvePoly(HERO.downloadResume, lang),
  viewProjects: resolvePoly(HERO.viewProjects, lang),
  resumeDownloadName: resolvePoly(HERO.resumeDownloadName, lang),
  links: {
    ...HERO.links,
    resume: resolvePoly(HERO.links.resume, lang),
  },
};
---

<!-- Render as plain HTML — zero JS -->
<section>
  <p>{hero.greeting}</p>
  <h1>{hero.title.join(' ')}</h1>
  <p>{hero.description}</p>
  <!-- ... rest of Hero markup ... -->
</section>
```

#### 3.3 — Language Switcher (now just links)

The language switcher no longer needs React state. It becomes simple HTML anchor tags:

```astro
---
// src/components/layout/LanguageSwitcher.astro
interface Props {
  currentLang: 'en' | 'tr';
}

const { currentLang } = Astro.props;
const otherLang = currentLang === 'en' ? 'tr' : 'en';
const label = currentLang === 'en' ? 'Türkçe' : 'English';
---

<a href={`/${otherLang}/`} class="...button styles...">
  {label}
</a>
```

Clicking navigates to the other language's pre-rendered page. No JavaScript required.

#### 3.4 — UI Labels

The `UI_LABELS` object in `src/data/ui.ts` stays as-is. Instead of the `t()` function from context, you create a simple helper:

```typescript
// src/lib/localization.ts (add this function)
import { UI_LABELS } from '@/data/ui';
import type { Language } from '@/data/types';

export function t(lang: Language, key: string): string {
  return UI_LABELS[lang][key] || UI_LABELS['en'][key];
}
```

Then use it in `.astro` frontmatter:

```astro
---
import { t } from '@/lib/localization';
const label = t(lang, 'nav.projects'); // resolved at build time
---
```

---

### Phase 4: Page Assembly

#### 4.1 — English page (`src/pages/en/index.astro`)

```astro
---
import Layout from '@/layouts/Layout.astro';
import Navbar from '@/components/layout/Navbar.astro';
import Hero from '@/components/sections/Hero.astro';
import Education from '@/components/sections/Education/Education.astro';
import Experience from '@/components/sections/Experience/Experience.astro';
import { Projects } from '@/components/sections/Projects/Projects';
import Footer from '@/components/layout/Footer.astro';
import { InteractiveBackground } from '@/components/layout/InteractiveBackground';
import { BackToTop } from '@/components/layout/BackToTop';

const lang = 'en';
---

<Layout title="Umut Şen" description="Software developer portfolio" lang={lang}>
  <InteractiveBackground client:only="react" />
  <div class="max-w-3xl mx-auto transition-all duration-200">
    <Navbar lang={lang} />
    <main class="flex flex-col mx-4 pb-20">
      <Hero lang={lang} />
      <Education lang={lang} />
      <Experience lang={lang} />
      <Projects lang={lang} client:visible />
    </main>
    <Footer lang={lang} />
  </div>
  <BackToTop client:load />
</Layout>
```

#### 4.2 — Turkish page (`src/pages/tr/index.astro`)

Identical to above, but with `lang = 'tr'`. Consider extracting a shared component if you want to avoid duplication:

```astro
---
// Option: Create src/components/PageContent.astro and use it in both pages
const lang = 'tr';
---
<!-- Same structure, different lang -->
```

#### 4.3 — Root redirect (`src/pages/index.astro`)

```astro
---
// Redirect root to default language
return Astro.redirect('/en/');
---
```

Alternatively, use Astro's `i18n` config to auto-handle this redirect.

---

### Phase 5: Convert Components

For each component, follow this decision tree:

```
Does the component use React hooks, event handlers, or browser APIs?
  ├── YES → Keep as .tsx, use as island with client:* directive
  └── NO  → Convert to .astro (static HTML, zero JS)
```

#### 5.1 — Components to KEEP as React (islands)

| Component | Interactive Features | Directive |
|:---|:---|:---|
| `InteractiveBackground.tsx` | Canvas rendering, browser globals (`window`), animation | `client:only="react"` |
| `BackToTop.tsx` | Scroll listener (`useEffect`), smooth scroll (`onClick`) | `client:load` |
| `Projects/index.tsx` | Embla carousel, modal open/close state logic | `client:visible` |

**Modifications needed for islands:**

- Remove all `useLanguage()` / `useCanvas()` context usage
- Pass resolved (string) props instead of `Poly<T>` values
- `InteractiveBackground` needs its own internal state for attractors instead of `CanvasContext`, since it'll be a self-contained island. Alternatively, simplify by removing cross-component attractor logic.
- `CanvasContext.tsx` can be **deleted** if attractor registration is moved fully inside the `InteractiveBackground` island (recommended simplification), or kept as a React-only context wrapping just the islands that need it.

#### 5.2 — Components to CONVERT to `.astro`

These become pure templates with zero JavaScript:

- `Navbar.astro` — Static nav links + `LanguageSwitcher.astro`. Smooth scroll links extracted into a small `NavScrollLinks.tsx` island _or_ implemented with plain anchor `<a href="#education">` links (which work natively without JS).
- `Footer.astro` — Pure content, no interactivity
- `Hero.astro` — Pure content
- `Education.astro` + `EducationCard.astro` — Pure content
- `Experience.astro` + `ExperienceItem.astro` — Pure content

**The scroll navigation decision:**

Currently, the `Navbar` uses `scrollIntoView()` via JS click handlers. 
Replace this with `<a href="#education">` anchor links. It works natively and eliminates another island. Add `scroll-behavior: smooth` to global CSS for the same UX.

**For ProjectCard → ProjectModal interaction:**

Keep the entire `Projects` section (`Projects/index.tsx`) as a single React island using the `client:visible` directive. 
Because `ProjectCard` to `ProjectModal` interaction is tightly coupled, separating them adds unnecessary complexity. This ships a bit more JS, but only when the user scrolls down to that section.

#### 5.3 — UI Components

- `Button.astro` — Convert to Astro component that renders a styled `<button>` or `<a>` element. For static usage (Footer, Hero links), this is pure HTML. For island usage (BackToTop, ProjectModal), keep a separate `Button.tsx` for React contexts.
- `Card.astro` — Pure styling wrapper, easy conversion
- `Tooltip.astro` — If it uses hover/JS, consider replacing with CSS-only tooltip or keeping as a small React component

---

### Phase 6: Static Assets

#### 6.1 — Images

Move `public/images/` as-is. Astro serves `/public` content at the root path, same as Vite.

Consider using Astro's `<Image />` component (`astro:assets`) for automatic optimization:
- WebP conversion
- Responsive `srcset`
- Lazy loading
- Width/height attributes (prevents layout shift)

#### 6.2 — Fonts

If using custom fonts (Google Fonts), add them in `Layout.astro`'s `<head>` with `<link rel="preconnect">` and `<link rel="preload">`.

#### 6.3 — Favicon

Keep `public/icon.svg` as-is.

---

### Phase 7: SEO Enhancements

With Astro, you get these for free / easily:

#### 7.1 — Per-language meta tags (built into Layout)
- `<html lang="en">` / `<html lang="tr">` — automatically correct per route
- `<link rel="alternate" hreflang="...">` — tells search engines about language variants
- Unique `<title>` and `<meta name="description">` per language

#### 7.2 — Sitemap

```bash
npx astro add sitemap
```

Auto-generates `sitemap.xml` including both `/en/` and `/tr/` pages.

#### 7.3 — OpenGraph / Social Media

Add OG tags to `Layout.astro`:
```html
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:image" content="/og-image.png" />
```

---

### Phase 8: Build and Deploy

#### 8.1 — Build output

```bash
npm run build
```

Produces a `dist/` folder with:
```
dist/
├── en/
│   └── index.html       ← Full rendered English page
├── tr/
│   └── index.html       ← Full rendered Turkish page
├── _astro/
│   ├── InteractiveBackground.abc123.js  ← Island JS (small)
│   ├── ProjectModal.def456.js           ← Island JS (small)
│   └── ...
├── images/               ← Static images
└── icon.svg
```

#### 8.2 — Deployment

Astro static output works on any static host:
- **GitHub Pages** — Add `@astrojs/sitemap` and configure `site` in `astro.config.mjs`
- **Vercel** — Zero config, auto-detects Astro
- **Cloudflare Pages** — Zero config
- **Netlify** — Zero config

#### 8.3 — Updated `package.json` scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint ."
  }
}
```

---

## Migration Checklist

### Initialization
- [ ] Create new Astro project
- [ ] Install integrations (`@astrojs/react`, Tailwind v4 via Vite plugin)
- [ ] Configure `astro.config.mjs` with i18n routing
- [ ] Configure `tsconfig.json` with path aliases

### Core Systems
- [ ] Create `Layout.astro` (base HTML shell, SEO tags, `<ClientRouter />` for SPA-like transitions)
- [ ] Move `index.css` → `styles/global.css`
- [ ] Add `t()` helper to `localization.ts`
- [ ] Copy `data/` directory as-is
- [ ] Copy `lib/` directory, add `t()` function

### Pages
- [ ] Create `pages/index.astro` (root redirect)
- [ ] Create `pages/en/index.astro`
- [ ] Create `pages/tr/index.astro`

### Convert Static Components (.tsx → .astro)
- [ ] `Navbar.astro` + decide on scroll strategy
- [ ] `LanguageSwitcher.astro` (just `<a>` links)
- [ ] `Footer.astro`
- [ ] `Hero.astro`
- [ ] `Education.astro` + `EducationCard.astro`
- [ ] `Experience.astro` + `ExperienceItem.astro`
- [ ] `Button.astro`, `Card.astro`, `Tooltip.astro`

### Keep as React Islands
- [ ] `InteractiveBackground.tsx` — remove `CanvasContext` dependency, use `client:only="react"` to avoid SSR `window` errors
- [ ] `BackToTop.tsx` — works as-is, just add `client:load`
- [ ] `Projects/index.tsx` (entire section) — pass resolved props, remove context usage, keep as `client:visible`

### Delete
- [ ] `App.tsx`
- [ ] `main.tsx`
- [ ] `context/LanguageContext.tsx`
- [ ] `context/CanvasContext.tsx` (if absorbed into InteractiveBackground)
- [ ] `hooks/useData.ts`
- [ ] `vite.config.ts`
- [ ] Root `index.html`

### SEO & Polish
- [ ] Add sitemap integration
- [ ] Add OpenGraph meta tags
- [ ] Configure canonical URLs
- [ ] Add `scroll-behavior: smooth` to global CSS (if using anchor links for nav)
- [ ] Verify all images load correctly
- [ ] Test both `/en/` and `/tr/` routes

### Validation
- [ ] Run `npm run build` — verify static HTML output
- [ ] Check HTML contains rendered content (not empty `<div id="root">`)
- [ ] Verify JS bundle is island-only (~20-40 KB)
- [ ] Test with JavaScript disabled — content should be fully visible
- [ ] Run Lighthouse audit — target 95+ Performance score
- [ ] Test carousel and interactive background still work
- [ ] Verify language links navigate correctly between `/en/` and `/tr/`
