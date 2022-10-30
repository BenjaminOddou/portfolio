// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: false
    }
  },
  app: {
    pageTransition: false,
    layoutTransition: false
  },
  runtimeConfig: {
    IMAGEKIT_B64_API: process.env.IMAGEKIT_B64_API,
    public: {
      FORMSPARK_ACTION_URL: process.env.FORMSPARK_ACTION_URL,
      BOTPOISON_PK: process.env.BOTPOISON_PK
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/image-edge',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    'nuxt-schema-org'
  ],
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs'
  },
  schemaOrg: {
    meta: {
      host: 'https://www.benjaminoddou-photographe.com',
      inLanguage: 'fr-FR'
    }
  },
  image: {
    provider: 'imagekit',
    imagekit: {
      baseURL: 'https://ik.imagekit.io/palladium'
    },
    screens: {
      sm: 575,
      md: 767,
      lg: 991,
      xl: 1199,
      '2xl': 1679
    }
  },
  colorMode: {
    classSuffix: '',
    dataValue: 'theme'
  },
  pwa: {
    workbox: {
      enabled: true
    },
    icon: {
      source: './assets/pwa-512x512.png'
    },
    meta: {
      lang: 'fr',
      name: '',
      author: 'Benjamin Oddou',
      ogSiteName: 'Benjamin Oddou Photographe',
      ogHost: 'benjaminoddou-photographe.com',
      ogImage: {
        path: '/banner.jpg',
        width: 1874,
        height: 1150,
        type: 'image/jpeg'
      },
      twitterCard: 'summary_large_image',
      twitterCreator: '@benjamin_oddou',
      twitterSite: '@benjamin_oddou'
    },
    manifest: {
      name: 'Benjamin Oddou Photographe',
      short_name: 'Benjamin Oddou',
      description:
        'Galerie en ligne de Benjamin Oddou, photographe en quête de nouveaux challenges. Réservez une séance !',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      lang: 'fr'
    }
  },
  typescript: {
    shim: false
  }
})
