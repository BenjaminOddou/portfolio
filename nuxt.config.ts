import tailwindcss from '@tailwindcss/vite'

// Documentation : https://nuxt.com/docs/4.x/api/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',

  modules: [
    '@nuxt/fonts', // auto-hébergement des polices (Roboto + Baron Neue)
    '@nuxt/image', // images responsives servies par ImageKit
    '@nuxtjs/color-mode', // thème clair / sombre
  ],

  // Tailwind CSS v4 : branché directement sur Vite, la configuration vit dans le CSS
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      meta: [
        { name: 'keywords', content: 'photographe, mariage, portrait, couple, corporate, paris, ile de france, france, photo studio' },
        { name: 'msapplication-TileColor', content: '#2a2a2a' },
        { name: 'theme-color', content: '#FFFFFF', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#2A2A2A', media: '(prefers-color-scheme: dark)' },
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#fca87f' },
      ],
    },
  },

  // Clés privées (serveur) et publiques (navigateur), lues dans le fichier .env.
  // En production, elles peuvent être surchargées par NUXT_IMAGEKIT_API, NUXT_PUBLIC_…
  runtimeConfig: {
    imagekitApi: process.env.IMAGEKIT_API,
    public: {
      formSparkActionUrl: process.env.FORMSPARK_ACTION_URL,
      // L'ancienne clé s'appelait « boitpoisonPk » : on relit aussi cette variable au build.
      botpoisonPk: process.env.BOTPOISON_PK || process.env.NUXT_PUBLIC_BOITPOISON_PK,
    },
  },

  nitro: {
    compressPublicAssets: { brotli: true, gzip: false },
  },

  routeRules: {
    '/api/**': { cors: true },
  },

  // En production, les pages et l'API sont mises en cache 10 min (stale-while-revalidate) :
  // l'API ImageKit n'est plus appelée à chaque visite.
  $production: {
    routeRules: {
      '/': { swr: 600 },
      '/about': { swr: 600 },
      '/gallery': { swr: 600 },
      '/api/**': { cors: true, swr: 600 },
    },
  },

  fonts: {
    families: [
      // Téléchargée depuis Google Fonts au build puis servie par le site (police variable 100 → 700)
      {
        name: 'Roboto',
        provider: 'google',
        weights: ['100 700'],
        styles: ['normal', 'italic'],
        subsets: ['latin'],
      },
      // Fichier local : public/fonts/baron-neue.woff2
      {
        name: 'Baron Neue',
        provider: 'local',
        weights: [400],
        styles: ['normal'],
      },
    ],
    // Aucun autre fournisseur n'est interrogé
    providers: {
      bunny: false,
      fontshare: false,
      fontsource: false,
      adobe: false,
      npm: false,
    },
  },

  image: {
    provider: 'imagekit',
    imagekit: { baseURL: 'https://ik.imagekit.io/palladium' },
    screens: {
      'sm': 575,
      'md': 767,
      'lg': 991,
      'xl': 1199,
      '2xl': 1679,
    },
  },

  colorMode: {
    classSuffix: '', // classe « dark » sur <html>, utilisée par Tailwind
  },
})
