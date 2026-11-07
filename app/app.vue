<script setup lang="ts">
/**
 * Coquille de l'application : SEO, préchargeur, menu, curseur, alertes
 * et transitions entre les pages.
 */
import type { TransitionProps } from 'vue'

const route = useRoute()
const wave = useWave()
const scroll = useSmoothScroll()
const triggerPageIntro = usePageIntroTrigger()
const menu = useTemplateRef('menu')
const pageWrapper = useTemplateRef('pageWrapper')

// ---------------------------------------------------------------------------
// SEO : chaque page déclare `title` et `description` dans definePageMeta()
// ---------------------------------------------------------------------------
const pageUrl = computed(() => (route.path === '/' ? SITE.url : `${SITE.url}${route.path}`))

useHead({
  title: () => route.meta.title,
  titleTemplate: title => (title ? `${title} | ${SITE.name}` : SITE.name),
  link: [
    { rel: 'canonical', href: pageUrl },
  ],
})

useSeoMeta({
  description: () => route.meta.description,
  ogTitle: () => `${route.meta.title} | ${SITE.name}`,
  ogDescription: () => route.meta.description,
  ogUrl: pageUrl,
})

// Données structurées pour les moteurs de recherche (https://schema.org)
useHead({
  script: [
    {
      key: 'schema-org',
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${SITE.url}/#identity`,
            'name': 'Benjamin Oddou',
            'image': `${SITE.url}/me.jpg`,
            'sameAs': SAME_AS,
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE.url}/#website`,
            'url': SITE.url,
            'name': SITE.name,
            'inLanguage': 'fr',
            'publisher': { '@id': `${SITE.url}/#identity` },
          },
          {
            '@type': 'WebPage',
            '@id': `${pageUrl.value}#webpage`,
            'url': pageUrl.value,
            'name': route.meta.title,
            'description': route.meta.description,
            'inLanguage': 'fr',
            'isPartOf': { '@id': `${SITE.url}/#website` },
          },
        ],
      })),
    },
  ],
})

// ---------------------------------------------------------------------------
// Transitions entre les pages (orchestrées à la main, sans CSS)
// ---------------------------------------------------------------------------
let pageShift: Animation | undefined

/** Départ : la vague couvre l'écran pendant que la page glisse et que le menu s'efface. */
async function onLeave(_element: Element, done: () => void) {
  scroll.lock()
  pageShift = pageWrapper.value?.animate(
    [
      { transform: 'none' },
      { transform: 'translateY(3%)' },
    ],
    { duration: 800, easing: cssEase.power3In, fill: 'forwards' },
  )
  const menuFade = menu.value?.fadeOutContent()

  await wave.cover({ rise: 0.5, fill: 0.3 })
  // Écran couvert : retour en haut et fermeture du menu, sans que cela se voie
  scroll.jumpToTop()
  menu.value?.close()

  await menuFade
  done()
}

/** Arrivée : la vague se retire (la page lance alors son intro) et la page reprend sa place. */
async function onEnter(_element: Element, done: () => void) {
  wave.uncover({ lift: 0.3, settle: 0.5, onLifted: triggerPageIntro })
  const pageReturn = pageWrapper.value?.animate(
    [
      { transform: 'translateY(3%)' },
      { transform: 'none' },
    ],
    { duration: 800, easing: cssEase.power3Out },
  )
  pageShift?.cancel()
  await pageReturn?.finished.catch(() => {})
  done()
}

const pageTransition: TransitionProps = {
  mode: 'out-in',
  css: false,
  onLeave,
  onEnter,
  onAfterEnter: () => setTimeout(scroll.unlock, 100),
}

// Petit clin d'œil dans la console du navigateur 👀
onMounted(() => {
  console.log(
    '%c👀 %cÀ la recherche de quelque chose ?%c 👀',
    'font-size: 16px',
    'font-size: 16px; font-weight: bold; color: #00DC82',
    'font-size: 16px',
  )
})
</script>

<template>
  <ThePreloader />
  <TheCursor />
  <TheMenu ref="menu" />
  <AwwwardsBadge />
  <TheWave />
  <TheAlert />

  <!-- « isolate » : les z-index des pages restent sous le menu, la vague et le curseur -->
  <div ref="pageWrapper" class="relative isolate">
    <NuxtPage :transition="pageTransition" />
  </div>
</template>
