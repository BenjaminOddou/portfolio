<script setup lang="ts">
import 'photoswipe/style.css'

definePageMeta({
  title: 'Galerie',
  description: 'Galerie de photos en ligne de Benjamin Oddou. Découvrez mes dernières images !',
})

/** Albums proposés (le tag `*` est porté par toutes les photos de la galerie) */
const FILTERS = [
  { tag: '*', label: 'Tout' },
  { tag: 'paysage', label: 'Paysage' },
  { tag: 'mariage', label: 'Mariage' },
  { tag: 'portrait', label: 'Portrait' },
  { tag: 'nature', label: 'Nature' },
  { tag: 'architecture', label: 'Architecture' },
  { tag: 'astrophotographie', label: 'Astrophotographie' },
]

/** Nombre de photos affichées au départ, puis à chaque clic sur « Voir plus » */
const PAGE_SIZE = 25

const introStarted = usePageIntro()
const scroll = useSmoothScroll()

// ---------------------------------------------------------------------------
// Photos, albums et pagination
// ---------------------------------------------------------------------------
const { data: images } = await useFetch('/api/images', {
  query: { folder: 'galerie-page' },
  // Les fichiers sont numérotés : les plus récents en premier
  transform: images => [...images].reverse(),
  default: () => [],
})

const activeTag = ref('*')
const limit = ref(PAGE_SIZE)

const filteredImages = computed(() =>
  activeTag.value === '*' ? images.value : images.value.filter(image => image.tags?.includes(activeTag.value)),
)
const visibleImages = computed(() => filteredImages.value.slice(0, limit.value))
const hasMore = computed(() => limit.value < filteredImages.value.length)

function selectAlbum(tag: string) {
  scroll.scrollTo(0, { duration: 1, easing: ease.expo.out })
  activeTag.value = tag
}

const scrollToTop = () => scroll.scrollTo(0, { duration: 2, easing: ease.power3.inOut })

// ---------------------------------------------------------------------------
// Visionneuse plein écran (PhotoSwipe, chargé au premier clic)
// ---------------------------------------------------------------------------
const thumbnails = new Map<string, HTMLElement>() // miniatures, pour l'animation d'ouverture / fermeture

async function openViewer(index: number) {
  const { default: PhotoSwipe } = await import('photoswipe')
  const viewer = new PhotoSwipe({
    index,
    dataSource: visibleImages.value.map((image) => {
      const element = thumbnails.get(image.filePath)
      return {
        src: image.url,
        width: image.width,
        height: image.height,
        element,
        msrc: element?.querySelector('img')?.currentSrc, // miniature affichée pendant le chargement
      }
    }),
    errorMsg: 'Oups, il semblerait que l\'image se soit perdue en chemin !',
  })
  viewer.on('destroy', scroll.unlock)
  scroll.lock()
  viewer.init()
}

// ---------------------------------------------------------------------------
// Sur téléphone et sur les écrans peu hauts, les filtres se cachent pendant
// le défilement et un bouton « Retour en haut » apparaît.
// ---------------------------------------------------------------------------
const photosColumn = useTemplateRef('photosColumn')
const areFiltersHidden = ref(false)
const isBackToTopVisible = ref(false)
let phoneQuery: MediaQueryList | undefined
let shortScreenQuery: MediaQueryList | undefined

useScrollFrame(({ y }) => {
  phoneQuery ??= matchMedia('(max-width: 575px)')
  shortScreenQuery ??= matchMedia('(min-width: 576px) and (max-height: 767px)')
  const photosTop = photosColumn.value?.getBoundingClientRect().top ?? 0

  if (phoneQuery.matches) {
    areFiltersHidden.value = photosTop < 0.35 * window.innerHeight
    isBackToTopVisible.value = photosTop < 0
  }
  else if (shortScreenQuery.matches) {
    areFiltersHidden.value = y > 20
    isBackToTopVisible.value = y > 200
  }
  else {
    areFiltersHidden.value = false
    isBackToTopVisible.value = false
  }
})
</script>

<template>
  <div :class="{ 'is-revealed': introStarted }">
    <button
      type="button"
      aria-label="Retourner en Haut de la Page"
      class="back-to-top fixed right-7.5 bottom-5 z-4 size-12.5 rounded-full bg-jet/55 transition-colors duration-500 after:absolute after:top-5.25 after:left-4.75 after:size-3 after:-rotate-45 after:border-t-2 after:border-r-2 after:border-white after:content-[''] sm:av:hidden dark:bg-white/55 dark:after:border-jet"
      :class="{ 'is-visible': isBackToTopVisible }"
      @click="scrollToTop"
    />

    <div
      class="z-0 mx-auto flex min-h-screen w-full max-w-[3600px] flex-col [--initsize:32px] sm:grid sm:grid-cols-[30%_70%] md:grid-cols-[25%_75%] xl:grid-cols-[22.5%_77.5%] 2xl:grid-cols-[20%_80%] lt:md:[--initsize:4.5vw] lt:xl:[--initsize:54px]"
    >
      <!-- ============ Colonne de gauche, collée en haut de l'écran ============ -->
      <div class="sticky top-0 h-105 shrink-0 sm:z-2 sm:h-screen sm:self-start">
        <!-- Titre vertical + signature -->
        <div class="absolute top-25 right-0 min-h-80 sm:top-[15vh]">
          <h1 class="ml-[20%] grid cursor-vertical-text gap-2 leading-none [writing-mode:vertical-rl]">
            <span class="overflow-hidden font-baron text-(length:--initsize)">
              <span class="reveal-left block [--ease:var(--ease-power2-out)]">photographies</span>
            </span>
            <span class="overflow-hidden text-[calc(var(--initsize)*2/3)] font-thin text-dark-lavender dark:text-dark-orange">
              <span class="reveal-left block [--ease:var(--ease-power2-out)]">BENJAMIN ODDOU</span>
            </span>
          </h1>
          <svg
            class="signature m-0 h-[calc(var(--initsize)*1.5)] w-[calc(var(--initsize)*3)] translate-x-[calc(-0.9*var(--initsize))] translate-y-[calc(-2.3*var(--initsize))] rotate-90 fill-none stroke-current stroke-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1299 566"
            aria-hidden="true"
          >
            <path style="--length: 930; --duration: 1s; --delay: 1.9s" stroke-linecap="round" d="M296 426c-4 4-5 14-1 19 3 3 7 4 11 2l10-7c3-3 3-8 3-13l-2-9c-1-3-4-2-7-2-5 0-8 5-9 10-1 3-2 7 2 7 8 2 15-6 24-7l2-1-1 2-2 9c0 5 4 8 8 8h4l5-5c2-2 4-5 4-8 0-2 1-4-1-5-2-2-4-4-7-4-4-1-11 0-12 6-1 2-3 9-1 11 3 2 4 4 7 4l7-2c3-1 5-5 7-8 6-11 9-24 12-36l6-20 1-4 3-8-2 7-7 23-4 16-4 15v8c1 3 6 2 9 1 2 0 3-2 5-3l6-3c2-1 3-2 3-4v-1l-1 3c-1 2 0 6 1 6 4 2 8 2 12 0 4-3 9-8 6-13l-7-7c-2-2-7-2-9 0l-4 10c0 3 2 8 6 8 5 0 10 0 13-5l4-10 7-28 6-25 2-10v3l-3 13-11 42c-1 5-5 12-1 15 2 2 6 1 8 0 4-2 8-5 10-9l1-5v-1 8c1 3 4 5 7 6 6 1 12-4 16-7 3-4 7-9 6-14-1-3-5-6-7-7-3-1-9-3-12-1-3 1-3 8-4 11 0 4 2 6 5 6 7 1 13-4 17-8l6-4v2c0 6 7 6 11 6 13 1 25-8 35-15l3-2h3c10 0 19-4 29-6s19 1 29 1" />
            <path style="--length: 1824; --duration: 0.3s; --delay: 2.9s; --ease: linear" stroke-linecap="round" d="M560 387c-24 0-45 7-67 14-84 26-168 55-251 83-57 19-113 36-171 48l-42 9h1l17-7c37-18 76-32 115-47 136-50 273-98 414-136 137-37 276-67 415-94 51-10 102-19 152-32 13-3 24-6 36-11 5-2 11-3 15-6 57-26-17 8 11-8" />
            <path style="--length: 2980; --duration: 1s; --delay: 0.9s" stroke-linecap="round" d="M337 363c15-9 27-23 36-38 26-38 44-81 53-125 10-51 16-104 16-156 0-13 4-52-1-40-9 25-11 55-15 81-15 104-23 209-27 314-2 51-1 206-1 155 0-20-1-40-5-60-9-43-18-92-46-129-18-22-35-38-65-40-18-2-33 2-48 10-39 21-77 47-111 74l-73 68c-15 16-35 33-46 52-6 11 4 6 15 4l97-28c123-35 246-67 371-95 235-52 472-93 710-133 32-5 67-14 100-14l-4 4-43 21" />
          </svg>
        </div>

        <!-- Albums -->
        <nav
          aria-label="Albums"
          class="filters absolute top-25 w-3/4 px-5 pb-5 text-xl leading-8 font-thin text-grey-gallery sm:top-[15vh] sm:right-[-70vw] sm:w-[70vw] sm:text-base md:right-[-75vw] md:w-[75vw] md:text-lg xl:right-[-77.5vw] xl:w-[77.5vw] xl:text-xl 2xl:right-[-80vw] 2xl:w-[80vw] av:sm:top-auto av:sm:right-auto av:sm:bottom-0 av:sm:w-full av:sm:max-w-100"
          :class="{ 'filters-hidden': areFiltersHidden }"
        >
          <div class="overflow-hidden font-baron text-xs leading-6 text-jet dark:text-white">
            <div class="filter-label reveal-up">
              albums
            </div>
          </div>
          <button
            v-for="(filter, i) in FILTERS"
            :key="filter.tag"
            type="button"
            class="overflow-hidden pr-1"
            :class="{ 'font-light text-jet dark:text-white': activeTag === filter.tag }"
            :aria-pressed="activeTag === filter.tag"
            @click="selectAlbum(filter.tag)"
          >
            <span class="filter-label reveal-up block">{{ filter.label }}{{ i < FILTERS.length - 1 ? ' /' : '' }}</span>
          </button>
        </nav>
      </div>

      <!-- ============ Photos ============ -->
      <div
        ref="photosColumn"
        class="relative z-3 bg-white px-6 transition-colors duration-500 sm:z-0 sm:pt-[calc(15vh+93px)] it:pt-[calc(15vh+65px)] av:sm:pt-[15vh] dark:bg-jet"
      >
        <!-- Largeur mini d'une colonne : 340 px, espacement compris -->
        <MasonryWall
          class="reveal-fade-up pb-6 [--duration:1.2s] [--ease:var(--ease-power3-out)] [--from-y:80px]"
          :items="visibleImages"
          :column-width="316"
          :gap="24"
          :ratio="image => image.height / image.width"
          :item-key="image => image.filePath"
        >
          <template #default="{ item: image, index }">
            <a
              :ref="element => element ? thumbnails.set(image.filePath, element as HTMLElement) : thumbnails.delete(image.filePath)"
              :href="image.url"
              target="_blank"
              rel="noreferrer"
              aria-label="Agrandir la photo"
              data-cursor="ignore"
              @click.prevent="openViewer(index)"
            >
              <NuxtImg
                :src="image.filePath"
                :width="700"
                :height="Math.round(700 * image.height / image.width)"
                alt=""
                loading="lazy"
                class="w-full"
              />
            </a>
          </template>
        </MasonryWall>

        <div class="mx-auto mt-2 w-auto max-w-55">
          <button v-if="hasMore" type="button" class="button flex w-full justify-center p-2" @click="limit += PAGE_SIZE">
            Voir plus
          </button>
          <p v-else class="w-full p-2 text-center text-grey-gallery">
            Fin des images
          </p>
        </div>

        <TheFooter />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ----- Bouton « Retour en haut » ----- */
.back-to-top {
  scale: 0;
  transition: scale 1s var(--ease-back-in-out);
}

.back-to-top.is-visible {
  scale: 1;
}

/* ----- Signature : chaque trait se dessine à son tour ----- */
.signature path {
  stroke-dasharray: var(--length);
  stroke-dashoffset: var(--length);
  transition: stroke-dashoffset var(--duration) var(--ease, var(--ease-sine-in-out)) var(--delay);
}

.is-revealed .signature path {
  stroke-dashoffset: 0;
}

/* ----- Albums ----- */
.filter-label {
  --duration: 1s;
  --delay: 0.2s;
  --ease: var(--ease-back-in-out);
}

.filters {
  transition:
    opacity 0.5s var(--ease-power2-out),
    visibility 0.5s;
}

/* Téléphone : les albums redescendent dans leur masque */
@media (max-width: 575px) {
  .filters-hidden .filter-label {
    translate: 0 100%;
    transition-delay: 0s;
  }
}

/* Écran large mais peu haut : les albums s'effacent */
@media (min-width: 576px) and (max-height: 767px) {
  .filters-hidden {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
