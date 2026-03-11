# Portfolio

Welcome to the source code for my portfolio!

This repository was recently migrated from a React Single Page Application (SPA) to a highly optimized, static **Astro** site. 

## 🚀 Architecture Highlights

- **Astro Static Site Generation (SSG)**: The vast majority of the website is pre-rendered into pure HTML/CSS at build-time, drastically improving load times and SEO.
- **React Islands (`client:visible` / `client:only="react"`)**: Interactive components (like the Projects carousel, the Interactive Background, and the Back To Top button) are strategically hydrated only when needed, keeping the JavaScript payload minimal.
- **Tailwind CSS v4**: Utility-first styling.
- **Native Internationalization (i18n)**: Multi-language support (`/en/` and `/tr/`) using Astro's built-in routing and View Transitions (`ClientRouter`) for a seamless, SPA-like navigation experience without full page reloads.
- **Build-Time Localization**: Replaced heavy React Context providers with build-time data resolution scripts.
- **Optimized SEO**: Automatically generated OpenGraph tags, valid `hreflang` links, and `sitemap-index.xml`.

## 🧞 Development Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 🐳 Deployment (Dokploy & Weak VPS Optimized)

This project has been heavily optimized to run on constrained environments (like a weak VPS) using Dokploy. 

Instead of running a persistent Node server, the deployment uses a **Multi-Stage Dockerfile**:
1. **Builder Stage**: `node:20-alpine` runs `npm run build` to generate the static files.
2. **Server Stage**: `nginx:alpine` copies the static output and serves it natively. 
3. **Nginx Optimization**: The custom `nginx.conf` enables aggressive `gzip` compression and `Cache-Control` (`max-age=31536000`) caching to minimize bandwidth and CPU cycles.

To deploy via Dokploy:
1. Point your Dokploy application to this Git repository.
2. Dokploy will automatically detect the `Dockerfile` in the root and build it.
3. Exposed Port: `80` (handled automatically by Dokploy's load balancer).

## 🗄️ Legacy Version
The original React SPA version of this portfolio has been archived in the `/old/` directory for reference.
