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
          <svg
            id="signature"
            class="m-0 h-[calc(var(--initsize)_*_1.5)] w-[calc(var(--initsize)_*_3)] -translate-x-[calc(var(--initsize)_*_0.9)] -translate-y-[calc(var(--initsize)_*_2.3)] rotate-90 stroke-current"
            stroke-width="5"
            viewBox="0 0 1299 566"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="oddou"
              style="stroke-dasharray: 930;"
              d="M296.277 426.411C292.033 430.457 291.094 440.292 295.376 444.721C298.448 447.898 301.739 448.773 305.912 446.886C309.371 445.323 313.007 443.078 315.51 440.189C318.507 436.729 318.849 431.558 318.934 427.175C318.997 423.934 318.459 420.976 316.944 418.129C315.517 415.446 313.091 415.511 310.275 415.625C305.048 415.838 301.506 420.845 300.631 425.562C300.08 428.537 299.073 432.651 302.999 433.299C311.493 434.7 318.49 427.067 326.677 425.685C327.585 425.532 328.292 425.083 329.138 424.782C329.994 424.478 328.083 426.293 327.802 427.156C326.801 430.223 326.097 433.212 325.972 436.42C325.801 440.787 330.219 443.884 334.092 444.035C335.316 444.083 336.883 444.423 337.956 443.738C339.85 442.53 341.517 440.83 342.908 439.081C344.667 436.869 346.907 433.715 347.107 430.765C347.251 428.646 347.536 427.241 346.044 425.628C344.191 423.624 342.021 422.164 339.313 421.573C334.537 420.529 328.114 422.175 326.684 427.601C325.993 430.219 324.253 436.81 326.415 439.148C328.518 441.422 329.626 443.297 333.042 443.26C335.223 443.237 337.902 441.765 339.92 440.961C343.03 439.722 345.1 435.904 346.646 433.153C352.916 421.998 355.88 409.147 359.438 396.962C361.323 390.507 362.811 383.779 365.113 377.473C365.646 376.015 365.847 374.469 366.429 373.02C367.419 370.559 368.849 362.755 368.745 365.406C368.673 367.264 367.755 369.863 367.193 371.725C364.889 379.37 362.205 386.929 359.978 394.619C358.417 400.009 357.167 405.483 355.793 410.905C354.542 415.845 353.034 420.713 351.792 425.649C351.238 427.848 350.912 431.882 351.937 433.91C353.491 436.986 357.9 436.106 360.604 435.371C362.729 434.793 364.328 433.359 365.938 431.91C367.684 430.339 369.635 429.576 371.77 428.714C373.511 428.012 374.618 427.493 375.364 425.431C375.699 424.505 376.141 422.71 375.324 424.369C374.878 425.276 374.53 426.316 374.11 427.257C373.432 428.777 373.629 432.52 375.343 433.257C379.022 434.84 383.035 434.729 386.699 432.683C391.042 430.257 395.908 424.824 392.961 419.556C391.341 416.66 388.496 415.417 386.135 413.255C383.859 411.171 379.186 410.949 377.32 413.481C375.272 416.258 373.608 419.248 373.471 422.747C373.333 426.288 374.841 430.954 378.933 431.115C384.223 431.322 389.335 430.989 392.23 425.724C393.839 422.8 395.035 419.224 395.832 415.999C398.182 406.494 400.873 397.087 403.143 387.544C405.118 379.24 406.983 370.952 408.666 362.586C409.31 359.381 410.947 355.855 411.074 352.611C411.121 351.42 410.853 354.987 410.65 356.161C409.917 360.385 408.86 364.353 407.741 368.502C403.913 382.699 399.987 396.854 396.673 411.181C395.602 415.811 392.383 422.5 396.363 426.375C398.145 428.11 401.738 426.84 403.634 426.007C408.112 424.042 411.594 420.827 414.055 416.529C414.678 415.441 415.262 413.549 415.342 412.279C415.363 411.952 415.469 409.048 415.411 410.528C415.303 413.28 414.341 415.989 414.945 418.786C415.596 421.803 418.992 424.194 421.818 424.926C427.558 426.411 433.771 421.328 437.61 417.778C441.491 414.19 444.528 409.499 443.84 403.936C443.428 400.607 439.214 398.356 436.61 397.008C433.998 395.656 428.092 394.123 425.191 395.542C421.906 397.148 421.659 404.294 421.422 407.462C421.16 410.955 422.967 412.787 426.348 413.362C432.736 414.448 438.527 408.794 443.419 405.306C445.321 403.95 447.098 402.394 448.988 401.04C449.843 400.427 449.482 402.485 449.466 402.873C449.239 408.669 455.637 408.507 460.119 408.814C473.296 409.714 484.936 401.172 495.425 394.215C496.252 393.667 497.241 393.053 497.925 392.315C498.428 391.773 500.539 392.204 501.151 392.177C511.088 391.739 520.252 387.767 529.915 385.863C539.634 383.947 549.236 387.459 559.054 387.167"
              stroke-linecap="round"
            />
            <path
              id="dash"
              style="stroke-dasharray: 1824;"
              d="M559.732 387.152C536.428 387.152 515.254 393.58 492.996 400.52C408.71 426.798 325.433 456.324 241.651 484.146C185.392 502.828 128.822 519.55 70.8237 531.918C56.8829 534.89 42.8936 537.563 28.9587 540.518C24.6098 541.441 28.6103 541.266 30.3577 540.829C36.0133 539.415 41.4646 536.135 46.6788 533.679C84.1585 516.026 123.186 501.794 162.015 487.462C298.248 437.175 435.403 389.484 575.586 351.297C712.766 313.929 851.915 284.176 991.386 256.842C1041.85 246.952 1092.88 238.326 1142.68 225.34C1155.78 221.924 1166.77 218.719 1179.47 214.148C1184.48 212.344 1189.51 210.539 1194.34 208.293C1250.68 182.096 1177.44 216.189 1205.12 199.692"
              stroke-linecap="round"
            />
            <path
              id="f-back"
              style="stroke-dasharray: 2980;"
              d="M337.34 363.347C352.303 353.519 363.548 339.526 373.327 325.201C399.339 287.095 416.533 243.904 425.673 199.729C436.233 148.693 442.235 96.104 442.235 44.1026C442.235 30.8762 445.909 -8.04894 441.213 4.43488C431.797 29.4659 429.761 59.1422 426.082 85.1971C411.42 189.044 403.336 293.907 398.887 398.543C396.691 450.189 398.069 605.285 398.069 553.599C398.069 533.564 396.571 513.819 392.752 494.05C384.371 450.66 374.902 402.022 346.643 365.439C329.139 342.78 312.237 327.277 281.518 324.725C264.241 323.29 248.981 326.893 233.977 334.999C195.146 355.978 157.193 381.817 123.459 409.388C97.6266 430.5 73.7616 454.208 50.2564 477.498C34.748 492.865 14.6992 509.803 3.94271 528.866C-2.48646 540.261 8.20952 535.465 18.9716 532.672C51.5848 524.208 83.7378 514.327 116.097 505.085C238.821 470.036 361.907 437.653 486.811 409.863C721.712 357.602 959.04 316.529 1196.75 277.352C1228.63 272.097 1264.02 263.083 1296.53 263.083C1298.34 263.083 1294.42 265.954 1292.85 266.793C1278.86 274.282 1264.37 280.971 1250.12 288.007"
              stroke-linecap="round"
            />
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
