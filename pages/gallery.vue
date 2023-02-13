<script setup lang="ts">
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
// @ts-expect-error-next-line
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
if (process.client)
  gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother)

const { data: images } = await useFetch<ImageKit[]>('/api/imgkit', {
  transform: (images) => {
    return images
      .filter(image => image.filePath.includes('galerie-page'))
      .sort((imageA, imageB) => (imageA.name < imageB.name ? 1 : -1))
  },
})

let lightbox: any = null
const maxImageNumber = images.value?.length ?? 0
const countImages = ref(0)
const imageNumber = ref(25)
const items = ref(images.value?.slice(0, 25))
const filter = ref('*')
const isRoute = routeStore()

const scrollTop = (duration: number, ease: string) => {
  const Smooth = ScrollSmoother.get() as globalThis.ScrollSmoother
  gsap.to(Smooth, {
    duration,
    scrollTop: 0,
    ease,
  })
}

const reFilter = async (newFilter: string, event: MouseEvent) => {
  scrollTop(1, 'expo.out')
  document
    .querySelectorAll<HTMLButtonElement>('.filters-group-container > button')
    .forEach((button) => {
      button.classList.remove('is-filtered')
    })
  const target = event.currentTarget as HTMLButtonElement
  target.classList.add('is-filtered')
  filter.value = newFilter
  await nextTick()
  ScrollTrigger.refresh()
}

const handleClick = () => {
  countImages.value = 0
  const cacheImageNumber = imageNumber.value
  imageNumber.value = imageNumber.value + 25
  const newItems = images.value?.slice(cacheImageNumber, imageNumber.value)
  items.value = items.value?.concat(newItems as ImageKit[])
}

const refresh = async () => {
  await nextTick()
  ScrollTrigger.refresh()
}

definePageMeta({
  title: 'Galerie',
  url: 'https://www.benjaminoddou-photographe.com/gallery',
  description:
    'Galerie de photos en ligne de Benjamin Oddou. Découvrez mes dernières images !',
})

useHead({
  title: 'Galerie',
})

onMounted(() => {
  if (ScrollTrigger.isTouch === 1) {
    document
      .querySelector<HTMLDivElement>('#return-to-top-container')
      ?.classList.replace(
        'top-[calc(100vh_-_70px)]',
        'top-[calc(100svh_-_70px)]',
      )
  }
  document
    .querySelectorAll<HTMLElement>(
      '#gridgalerie_cell1, #return-to-top-container',
    )
    .forEach((Element) => {
      ScrollTrigger.create({
        trigger: Element,
        start: 0,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        endTrigger: '#gridgalerie',
      })
    })

  if (!lightbox) {
    lightbox = new PhotoSwipeLightbox({
      gallery: '#galerie-masonry',
      children: 'a:not([style*="display: none"])',
      pswpModule: () => import('photoswipe'),
      errorMsg: 'Oups, il semblerait que l\'image se soit perdue en chemin !',
    })
    lightbox.init()
  }

  const filters = document.querySelectorAll(
    '.filters-group-container > * > div',
  )
  const titlegalerie = new SplitText('#header-content > div', {
    type: 'words',
  })

  const tl1 = gsap.timeline()
  tl1.pause()
  isRoute.$subscribe(() => {
    tl1.play()
  })

  tl1
    .from(
      titlegalerie.words,
      {
        xPercent: -100,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          titlegalerie.revert()
        },
      },
    )
    .from(
      '#galerie-masonry',
      {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
      },
      0,
    )
    .from(
      filters,
      {
        yPercent: 100,
        duration: 1,
        ease: 'back.inOut(1.4)',
      },
      '<+0.2',
    )
    .from(
      '#f-back',
      {
        strokeDashoffset: 2980,
        duration: 1,
        ease: 'sine.inOut',
      },
      '>-0.3',
    )
    .from(
      '#oddou',
      {
        strokeDashoffset: 930,
        duration: 1,
        ease: 'sine.inOut',
      },
    )
    .from(
      '#dash',
      {
        strokeDashoffset: 1824,
        duration: 0.3,
        ease: 'none',
      },
    )

  window.addEventListener('orientationchange', () => {
    delay(100).then(() => {
      ScrollTrigger.refresh()
    })
  })

  const mm = gsap.matchMedia()
  mm.add(
    {
      vsm: '(max-width: 575px)',
      sm: '(min-width: 576px)',
      av: '(max-height: 767px)',
    },
    (context) => {
      const { vsm, sm, av } = context.conditions as gsap.Conditions
      if (vsm || (sm && av)) {
        gsap.fromTo(
          filters,
          {
            display: 'block',
            y: '0%',
            opacity: 1,
          },
          {
            y: vsm ? '100%' : '0%',
            opacity: vsm ? 1 : 0,
            duration: vsm ? 1 : 0.5,
            ease: vsm ? 'back.inOut(1.4)' : 'power2',
            display: 'none',
            scrollTrigger: {
              trigger: '#gridgalerie_cell2',
              start: vsm ? 'top 35%' : 20,
              toggleActions: 'play none none reverse',
            },
          },
        )
        gsap.fromTo(
          '#return-to-top',
          {
            scale: 0,
          },
          {
            scale: 1,
            duration: 1,
            ease: 'back.inOut(1.4)',
            scrollTrigger: {
              trigger: '#gridgalerie_cell2',
              start: vsm ? 'top 0%' : 200,
              toggleActions: 'play none none reverse',
            },
          },
        )
      }
    },
  )
})

onUnmounted(() => {
  if (lightbox !== null) {
    lightbox.destroy()
    lightbox = null
  }

  window.removeEventListener('orientationchange', () => {
    delay(100).then(() => {
      ScrollTrigger.refresh()
    })
  })
})
</script>

<template>
  <div id="galerie-page">
    <div
      id="return-to-top-container"
      class="absolute top-[calc(100vh_-_70px)] left-[calc(100vw_-_80px)] z-[4] sm:av:hidden"
    >
      <button
        id="return-to-top"
        aria-label="Retourner en Haut de la Page"
        class="h-[50px] w-[50px] scale-0 rounded-full bg-jet-8a transition-bg-color duration-500 ease-[ease] after:absolute after:top-[21px] after:left-[19px] after:h-3 after:w-3 after:-rotate-45 after:border-t-2 after:border-r-2 after:border-white after:content-[''] dark:bg-white-8a dark:after:border-jet"
        @click="scrollTop(2, 'power3.inOut')"
      />
    </div>
    <div
      id="gridgalerie"
      class="z-0 mx-auto grid min-h-screen w-full max-w-[3600px] grid-cols-1 [--initsize:_32px] sm:grid-cols-[30%_70%] md:grid-cols-[25%_75%] xl:grid-cols-[22.5%_77.5%] 2xl:grid-cols-[20%_80%] lt:md:[--initsize:_4.5vw] lt:xl:[--initsize:_54px]"
    >
      <div
        id="gridgalerie_cell1"
        class="relative h-[420px] sm:z-[2] sm:h-screen"
      >
        <div
          id="title-galerie-container"
          class="absolute top-[100px] right-0 min-h-[320px] sm:top-[15vh]"
        >
          <div
            id="header-content"
            class="ml-[20%] grid cursor-vertical-text gap-2 leading-none [writing-mode:vertical-rl]"
          >
            <div class="baron overflow-hidden text-[calc(var(--initsize))]">
              photographies
            </div>
            <div
              class="overflow-hidden text-[calc(var(--initsize)_*_2_/_3)] font-thin text-dark-lavender dark:text-dark-orange"
            >
              BENJAMIN ODDOU
            </div>
          </div>
          <svg
            id="signature" class="m-0 h-[calc(var(--initsize)_*_1.5)] w-[calc(var(--initsize)_*_3)] -translate-x-[calc(var(--initsize)_*_0.9)] -translate-y-[calc(var(--initsize)_*_2.3)] rotate-90 fill-none stroke-current stroke-[5]"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1299 566"
          >
            <path id="oddou" style="stroke-dasharray: 930;" stroke-linecap="round" d="M296 426c-4 4-5 14-1 19 3 3 7 4 11 2l10-7c3-3 3-8 3-13l-2-9c-1-3-4-2-7-2-5 0-8 5-9 10-1 3-2 7 2 7 8 2 15-6 24-7l2-1-1 2-2 9c0 5 4 8 8 8h4l5-5c2-2 4-5 4-8 0-2 1-4-1-5-2-2-4-4-7-4-4-1-11 0-12 6-1 2-3 9-1 11 3 2 4 4 7 4l7-2c3-1 5-5 7-8 6-11 9-24 12-36l6-20 1-4 3-8-2 7-7 23-4 16-4 15v8c1 3 6 2 9 1 2 0 3-2 5-3l6-3c2-1 3-2 3-4v-1l-1 3c-1 2 0 6 1 6 4 2 8 2 12 0 4-3 9-8 6-13l-7-7c-2-2-7-2-9 0l-4 10c0 3 2 8 6 8 5 0 10 0 13-5l4-10 7-28 6-25 2-10v3l-3 13-11 42c-1 5-5 12-1 15 2 2 6 1 8 0 4-2 8-5 10-9l1-5v-1 8c1 3 4 5 7 6 6 1 12-4 16-7 3-4 7-9 6-14-1-3-5-6-7-7-3-1-9-3-12-1-3 1-3 8-4 11 0 4 2 6 5 6 7 1 13-4 17-8l6-4v2c0 6 7 6 11 6 13 1 25-8 35-15l3-2h3c10 0 19-4 29-6s19 1 29 1" />
            <path id="dash" style="stroke-dasharray: 1824;" stroke-linecap="round" d="M560 387c-24 0-45 7-67 14-84 26-168 55-251 83-57 19-113 36-171 48l-42 9h1l17-7c37-18 76-32 115-47 136-50 273-98 414-136 137-37 276-67 415-94 51-10 102-19 152-32 13-3 24-6 36-11 5-2 11-3 15-6 57-26-17 8 11-8" />
            <path id="f-back" style="stroke-dasharray: 2980;" stroke-linecap="round" d="M337 363c15-9 27-23 36-38 26-38 44-81 53-125 10-51 16-104 16-156 0-13 4-52-1-40-9 25-11 55-15 81-15 104-23 209-27 314-2 51-1 206-1 155 0-20-1-40-5-60-9-43-18-92-46-129-18-22-35-38-65-40-18-2-33 2-48 10-39 21-77 47-111 74l-73 68c-15 16-35 33-46 52-6 11 4 6 15 4l97-28c123-35 246-67 371-95 235-52 472-93 710-133 32-5 67-14 100-14l-4 4-43 21" />
          </svg>
        </div>
        <div
          class="filters-group-container absolute top-[100px] w-3/4 px-5 pb-5 text-xl font-thin leading-8 text-grey-gallery will-change-transform sm:-right-[70vw] sm:top-[15vh] sm:w-[70vw] sm:text-base md:-right-[75vw] md:w-[75vw] md:text-lg xl:-right-[77.5vw] xl:w-[77.5vw] xl:text-xl 2xl:-right-[80vw] 2xl:w-[80vw] av:sm:bottom-0 av:sm:right-[auto] av:sm:top-[auto] av:sm:w-full av:sm:max-w-[400px] av:sm:opacity-100"
        >
          <div
            class="baron overflow-hidden text-xs leading-6 text-jet dark:text-white"
          >
            <div>albums</div>
          </div>
          <button
            class="is-filtered overflow-hidden pr-1"
            @click="reFilter('*', $event)"
          >
            <div>Tout /</div>
          </button>
          <button
            class="overflow-hidden pr-1"
            @click="reFilter('paysage', $event)"
          >
            <div>Paysage /</div>
          </button>
          <button
            class="overflow-hidden pr-1"
            @click="reFilter('mariage', $event)"
          >
            <div>Mariage /</div>
          </button>
          <button
            class="overflow-hidden pr-1"
            @click="reFilter('portrait', $event)"
          >
            <div>Portrait /</div>
          </button>
          <button
            class="overflow-hidden pr-1"
            @click="reFilter('nature', $event)"
          >
            <div>Nature /</div>
          </button>
          <button
            class="overflow-hidden pr-1"
            @click="reFilter('architecture', $event)"
          >
            <div>Architecture /</div>
          </button>
          <button
            class="overflow-hidden pr-1"
            @click="reFilter('astrophotographie', $event)"
          >
            <div>Astrophotographie</div>
          </button>
        </div>
      </div>

      <div
        id="gridgalerie_cell2"
        class="z-[3] bg-white transition-bg-color duration-500 ease-[ease] dark:bg-jet sm:z-0 sm:pl-6 sm:pt-[calc(15vh_+_93px)] it:pt-[calc(15vh_+_65px)] av:sm:pt-[15vh]"
      >
        <MasonryWall
          id="galerie-masonry"
          :items="items ?? []"
          :column-width="340"
          @redraw="refresh"
        >
          <template #default="{ item }: { item: ImageKit }">
            <a
              v-show="item.tags?.find((tag) => tag === filter)"
              :href="item.url"
              :data-pswp-width="item.width"
              :data-pswp-height="item.height"
              target="_blank"
              rel="noreferrer"
              class="ignore-cursor"
            >
              <nuxt-img
                :src="item.filePath"
                :width="700"
                :height="700 / (item.width / item.height)"
                class="px-6 pb-6 sm:pl-0"
              />
            </a>
          </template>
        </MasonryWall>

        <div class="mx-auto mt-2 w-auto max-w-[220px]">
          <div class="flex w-full text-center text-grey-gallery">
            <span v-show="imageNumber >= maxImageNumber" class="w-full p-2">Fin des images</span>
          </div>
          <button
            v-show="imageNumber < maxImageNumber"
            id="see-more"
            class="button flex w-full cursor-pointer justify-center p-2 disabled:pointer-events-none disabled:bg-light-lavender dark:disabled:pointer-events-none dark:disabled:bg-light-orange"
            @click="handleClick"
          >
            Voir plus
          </button>
        </div>

        <TheFooter class="sm:pr-6" />
      </div>
    </div>
  </div>
</template>
