<img src=".github/assets/banner_github.jpg" width="100%" />

# [Benjamin Oddou Photographe](https://www.benjaminoddou-photographe.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/b4f86ea8-7cc1-45f7-aba6-ea1b2cc7855b/deploy-status)](https://app.netlify.com/sites/benjaminoddou-photographe/deploys)
[![made with heart by Benjamin Oddou](https://img.shields.io/badge/made%20with%20%E2%99%A5%20by-benjamin%20oddou-ff8f5d.svg?style=flat)](https://github.com/BenjaminOddou)
[![saythanks](https://img.shields.io/badge/say-thanks-d2d4e0.svg?style=flat)](https://saythanks.io/to/BenjaminOddou)

Welcome to the repository of my personal website dedicated to **Photography** 📸

## 🦾 Main Technologies

- **Design** : <img src=".github/assets/figma.png" height="13" /> [Figma](https://www.figma.com), <img src=".github/assets/photoshop.png" height="13" /> [Adobe Photoshop](https://www.adobe.com/fr/products/photoshop.html)
- **Framework** : <img src=".github/assets/nuxt.png" height="10" /> [Nuxt 4](https://nuxt.com) with [Nuxt Fonts](https://fonts.nuxt.com), [Nuxt Image](https://image.nuxt.com) and [Color Mode](https://color-mode.nuxtjs.org)
- **Style** : <img src=".github/assets/tailwindcss.png" height="13" /> [Tailwind CSS 4](https://tailwindcss.com)
- **Images** : <img src=".github/assets/imagekit.png" height="12" /> [ImageKit CDN](https://imagekit.io) and <img src=".github/assets/photoswipe.png" height="12" /> [PhotoSwipe](https://photoswipe.com) (lightbox)
- **Smooth scrolling** : [Lenis](https://lenis.darkroom.engineering)
- **Animations** : home-made, with CSS transitions and a tiny animation helper (no animation library)
- **Contact form** : <img src=".github/assets/formspark.png" height="14" /> [Formspark](https://formspark.io) and <img src=".github/assets/botpoison.png" height="12" /> [Botpoison](https://botpoison.com)
- **Hosting** : <img src=".github/assets/github.png" height="12" /> [GitHub](https://github.com) + <img src=".github/assets/netlify.png" height="14" /> [Netlify](https://www.netlify.com)

## ✨ Code Usage

The project is open source so you can use part of the code but <u>**not entirely**</u>. Also, <u>**don't use the style**</u> (CSS and assets) as it is personal and makes this website unique.

This code is under [MIT Licence](LICENSE) ⚖️

## 🛠️ Setup

1. Install the current LTS version of [Node.js](https://nodejs.org) (for example with [nvm](https://github.com/nvm-sh/nvm) : `nvm install --lts`).
2. Install [pnpm](https://pnpm.io/installation). The version used by the project is pinned in the `packageManager` field of `package.json` (pnpm switches to it automatically).
3. Create your `.env` file from the template, then fill in the keys (each one is documented in the file) :

   ```sh
   cp .env.example .env
   ```

4. Install the dependencies :

   ```sh
   pnpm install
   ```

> pnpm settings (supply-chain protections, packages allowed to run install scripts…) live in `pnpm-workspace.yaml`.

## 📜 Scripts

| Command            | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| `pnpm dev`         | Development server (also reachable from your local network) |
| `pnpm build`       | Production build (server-side rendering)                    |
| `pnpm generate`    | Pre-render every page into static HTML files                |
| `pnpm preview`     | Preview the production build on port 8000                   |
| `pnpm lint`        | Check the code with [ESLint](https://eslint.org)            |
| `pnpm lint:fix`    | Fix the code style automatically                            |
| `pnpm update-deps` | Update every dependency to its latest version               |

## 🏗️ Structure

```sh
.
├── app
│   ├── app.vue              # Shell : SEO, preloader, menu, cursor and page transitions
│   ├── error.vue            # Error page (404, 500…)
│   ├── assets
│   │   ├── css/main.css     # Tailwind configuration (colors, breakpoints, easings) + reveal animations
│   │   └── svg/             # Checkbox checkmark
│   ├── components
│   │   ├── icon/            # Static icons (logo, arrow)
│   │   ├── menu/            # Menu links, draggable photos and animated social icons
│   │   ├── MasonryWall.vue  # Home-made masonry grid (gallery)
│   │   ├── SplitText.vue    # Splits a text into chars / words / lines to animate them
│   │   └── …
│   ├── composables          # Smooth scroll, page intro, wave transition, alerts, drag & throw…
│   ├── pages                # index (home), gallery, about
│   ├── plugins              # Lenis instance + `v-reveal` directive
│   ├── types                # Extra typings (page meta)
│   └── utils                # Animation helpers (easings, tweens, SVG morphing / drawing)
├── public                   # Static files (icons, manifest, Baron Neue font…)
├── server
│   ├── api/images.get.ts    # GET /api/images?folder=… (ImageKit proxy, cached 10 min)
│   ├── routes/sitemap.xml.ts
│   └── utils/imagekit.ts
├── shared                   # Code shared by the app and the server (site info, types)
├── .env.example             # Template of the environment variables (copy it to .env)
├── netlify.toml             # Netlify configuration
├── nuxt.config.ts           # Nuxt configuration
└── pnpm-workspace.yaml      # pnpm settings
```

## 🎬 How the animations work

- **Reveal animations** are plain CSS transitions. An element with a `reveal-*` class (`reveal-up`, `reveal-fade`, `reveal-scale`…, see `main.css`) reaches its final state when it, or one of its parents, gets the `is-revealed` class. Durations and delays are tuned per element with CSS variables (`[--delay:0.8s]`, `[--stagger:70ms]`…).
- `is-revealed` is added either by the **`v-reveal` directive** (when the element scrolls into view) or by **`usePageIntro()`** (when the page becomes visible, after the preloader or the page transition).
- **`<SplitText>`** splits a text into chars, words or lines so that each piece slides up one after the other.
- Effects that follow the scroll (parallax, rotating star, drawn line…) use **`useScrollFrame()`**.
- The few JavaScript animations (wave, SVG morphing of the menu icons, drag & throw) rely on the small helpers of `app/utils/motion.ts`.

## 🚀 Deploy

The website is hosted on <img src=".github/assets/netlify.png" height="14" /> [Netlify](https://www.netlify.com), connected to this repository. [Nitro](https://nitro.build/deploy/providers/netlify) detects Netlify automatically.

- Build command : `pnpm build` (Netlify detects pnpm from `pnpm-lock.yaml` and installs the version pinned in `package.json`)
- Environment variables : the three keys of `.env.example` (or their runtime equivalent `NUXT_IMAGEKIT_API`, `NUXT_PUBLIC_FORM_SPARK_ACTION_URL`, `NUXT_PUBLIC_BOTPOISON_PK`).

In production, pages and the images API are cached for 10 minutes (stale-while-revalidate), so ImageKit is not called on every visit.

## 🙏 Credits

- Baron Neue font by Frank Hemmekam (free for personal use, contact the designer for commercial use).
- [Roboto](https://fonts.google.com/specimen/Roboto) font by Google (self-hosted at build time by Nuxt Fonts).

## ⚖️ License

[MIT License](LICENSE) © Benjamin Oddou
