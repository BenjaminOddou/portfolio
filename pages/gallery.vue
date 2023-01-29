<script setup lang="ts">
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
import theSignature from '/assets/svgs/the-signature.svg?component'
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
    .fromTo(
      titlegalerie.words,
      {
        xPercent: -100,
      },
      {
        xPercent: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          titlegalerie.revert()
        },
      },
    )
    .fromTo(
      '#galerie-masonry',
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      },
      0,
    )
    .fromTo(
      filters,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 1,
        ease: 'back.inOut(1.4)',
      },
      '<+0.2',
    )
    .fromTo(
      '#f-back',
      {
        strokeDashoffset: 2980,
      },
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'sine.inOut',
      },
      '>-0.3',
    )
    .fromTo(
      '#oddou',
      {
        strokeDashoffset: 930,
      },
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'sine.inOut',
      },
    )
    .fromTo(
      '#dash',
      {
        strokeDashoffset: 1824,
      },
      {
        strokeDashoffset: 0,
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
        class="h-[50px] w-[50px] scale-0 rounded-full bg-jet-8a transition-bg-color duration-500 ease-classic after:absolute after:top-[21px] after:left-[19px] after:h-3 after:w-3 after:-rotate-45 after:border-t-2 after:border-r-2 after:border-white after:content-[''] dark:bg-white-8a dark:after:border-jet"
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
          <theSignature id="signature" class=" m-0 h-[calc(var(--initsize)_*_1.5)] w-[calc(var(--initsize)_*_3)] -translate-x-[calc(var(--initsize)_*_0.9)] -translate-y-[calc(var(--initsize)_*_2.3)] rotate-90 stroke-current stroke-[5]" />
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
        class="z-[3] bg-white transition-bg-color duration-500 ease-classic dark:bg-jet sm:z-0 sm:pl-6 sm:pt-[calc(15vh_+_93px)] it:pt-[calc(15vh_+_65px)] av:sm:pt-[15vh]"
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
