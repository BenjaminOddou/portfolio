<script setup lang="ts">
/**
 * Menu plein écran : liens des pages, photos déplaçables et réseaux sociaux.
 * Son ouverture et sa fermeture se font derrière la vague (useWave).
 * Pendant un changement de page, app.vue appelle `fadeOutContent()` puis `close()`.
 */
import { MenuIconGithub, MenuIconInstagram, MenuIconMail, MenuIconYoutube } from '#components'

const PAGES = [
  { to: '/', label: 'accueil' },
  { to: '/gallery', label: 'galerie' },
  { to: '/about', label: 'à propos' },
]

const SOCIALS = [
  {
    href: LINKS.instagram,
    label: 'Lien vers mon compte Instagram',
    icon: MenuIconInstagram,
    external: true,
  },
  {
    href: LINKS.youtube,
    label: 'Lien vers ma chaine YouTube',
    icon: MenuIconYoutube,
    external: true,
  },
  {
    href: LINKS.github,
    label: 'Lien vers le répertoire GitHub',
    icon: MenuIconGithub,
    external: true,
  },
  {
    href: LINKS.mail,
    label: 'Lien vers mon Mail',
    icon: MenuIconMail,
    external: false,
  },
]

const route = useRoute()
const wave = useWave()
const scroll = useSmoothScroll()

const isOpen = ref(false)
const isToggling = ref(false) // ouverture / fermeture en cours
const isFading = ref(false) // contenu en train de disparaître
const dragArea = useTemplateRef('dragArea')
const linkList = useTemplateRef('linkList')

// ---------------------------------------------------------------------------
// Photos : deux images du dossier « navbar » tirées au hasard.
// Chargées dans le navigateur seulement (le menu est fermé au chargement).
// ---------------------------------------------------------------------------
const { data: navbarImages } = useFetch<SiteImage[]>('/api/images', {
  query: { folder: 'navbar' },
  server: false,
  default: () => [],
})

const images = computed(() => pickRandom(navbarImages.value, 2))
const frontImage = ref(0) // la dernière photo attrapée passe devant

function pickRandom<T>(items: T[], count: number) {
  const pool = [...items]
  const picked: T[] = []
  while (picked.length < count && pool.length)
    picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]!)
  return picked
}

// ---------------------------------------------------------------------------
// Animations du contenu (Web Animations API)
// ---------------------------------------------------------------------------
const linkElements = () => Array.from(linkList.value?.children ?? []) as HTMLElement[]

/** Liens et photos s'effacent vers le haut (fermeture du menu ou changement de page). */
async function fadeOutContent() {
  isFading.value = true
  const animations = [
    ...linkElements().map((link, i) => link.animate(
      [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'translateY(-100px)' },
      ],
      {
        duration: 800,
        delay: i * 50,
        easing: cssEase.power2InOut,
        fill: 'forwards',
      },
    )),
    dragArea.value?.animate(
      [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'translateY(-200px)' },
      ],
      { duration: 1000, easing: cssEase.power3InOut, fill: 'forwards' },
    ),
  ]
  await Promise.allSettled(animations.map(animation => animation?.finished))
  isFading.value = false
}

/** Liens (du dernier au premier) et photos arrivent par le bas, après `delay` secondes. */
function fadeInContent(delay: number) {
  const links = linkElements()
  links.forEach((link, i) => link.animate(
    [
      { opacity: 0, transform: 'translateY(150px)' },
      { opacity: 1, transform: 'none' },
    ],
    {
      duration: 800,
      delay: (delay + (links.length - 1 - i) * 0.05) * 1000,
      easing: cssEase.power4Out,
      fill: 'both',
    },
  ))
  dragArea.value?.animate(
    [
      { opacity: 0, transform: 'translateY(300px)' },
      { opacity: 1, transform: 'none' },
    ],
    {
      duration: 1000,
      delay: delay * 1000,
      easing: cssEase.power4Out,
      fill: 'both',
    },
  )
}

// ---------------------------------------------------------------------------
// Ouverture / fermeture
// ---------------------------------------------------------------------------
async function toggle() {
  if (isToggling.value)
    return
  isToggling.value = true
  const isOpening = !isOpen.value

  if (!isOpening)
    fadeOutContent()

  // La vague couvre l'écran, on bascule le menu derrière elle, puis elle se retire
  await wave.cover({ rise: 0.5, fill: 0.2 })
  isOpen.value = isOpening
  if (isOpening) {
    scroll.lock()
    fadeInContent(0.2)
  }
  else {
    scroll.unlock()
  }
  await wave.uncover({ lift: 0.2, settle: 0.5 })

  isToggling.value = false
}

/** Un lien vers la page courante ne navigue pas : on referme simplement le menu. */
function onLinkClick(to: string) {
  if (to === route.path)
    toggle()
}

defineExpose({
  fadeOutContent,
  /** Ferme le menu instantanément (l'écran est alors caché par la vague) */
  close: () => (isOpen.value = false),
})
</script>

<template>
  <div>
    <TheHeader :menu-open="isOpen" @toggle-menu="toggle" />

    <nav
      v-show="isOpen"
      aria-label="Menu principal"
      class="fixed inset-0 z-10 min-h-80 min-w-80 bg-white font-baron text-[2rem] transition-colors duration-500 sm:lt:text-[6vw] lg:lt:text-[calc(6px*992/100)] dark:bg-jet"
    >
      <div ref="dragArea" class="flex h-full items-center justify-center">
        <!-- Photos déplaçables -->
        <div class="flex items-center justify-center">
          <MenuImage
            v-for="(image, i) in images"
            :key="image.filePath"
            :image
            :bounds="dragArea"
            class="menu-image"
            :style="{ zIndex: frontImage === i ? 2 : 1 }"
            @grab="frontImage = i"
          />
        </div>

        <!-- Pages -->
        <ul ref="linkList" class="absolute grid" :class="{ 'pointer-events-none': isToggling || isFading }">
          <MenuLink v-for="page in PAGES" :key="page.to" v-bind="page" @click="onLinkClick(page.to)" />
        </ul>

        <!-- Réseaux sociaux -->
        <div class="absolute bottom-0 mb-1 flex h-[10vh] min-h-[60px] w-full justify-center md:lt:min-h-[70px]">
          <div class="grid w-1/2 grid-cols-[repeat(4,55px)] items-center justify-center gap-[10px] md:grid-cols-[repeat(4,70px)] md:gap-[30px]">
            <a
              v-for="social in SOCIALS"
              :key="social.href"
              :href="social.href"
              :aria-label="social.label"
              :target="social.external ? '_blank' : undefined"
              :rel="social.external ? 'noopener' : undefined"
              class="size-[55px] md:lt:size-[70px]"
            >
              <component :is="social.icon" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* Les deux photos sont décalées en diagonale */
.menu-image:nth-child(1) {
  margin: 0 0 30vh 0;
}

.menu-image:nth-child(2) {
  margin: 30vh 0 0 40vw;
}

@media (max-width: 575px) and (min-height: 576px) {
  .menu-image:nth-child(1) {
    margin: 0 0 50vh 0;
  }

  .menu-image:nth-child(2) {
    margin: 45vh 0 0 20vw;
  }
}

@media (max-width: 399px) {
  .menu-image:nth-child(1) {
    margin: 0 0 55vh 0;
  }

  .menu-image:nth-child(2) {
    margin: 50vh 0 0 15vw;
  }
}
</style>
