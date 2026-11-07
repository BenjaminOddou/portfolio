<script setup lang="ts">
const { $gsap: gsap, $Draggable: Draggable, $InertiaPlugin: InertiaPlugin } = useNuxtApp()

const { data: images } = await useFetch<ImageKit[]>('/api/imgkit', {
  transform: (images) => {
    const filter = images.filter(image => image.filePath.includes('navbar'))
    const arr: ImageKit[] = []
    while (arr.length < 2) {
      const r = filter[Math.floor(Math.random() * filter.length)]
      if (r && !arr.includes(r))
        arr.push(r)
    }
    return arr
  },
})

onMounted(() => {
  const clampSkew = gsap.utils.clamp(-6, 6)
  const AllImg = document.querySelectorAll<HTMLImageElement>('.img-drag')
  const Cursor = document.querySelector<HTMLDivElement>('#cursor')

  class DraggableImg {
    constructor(Image: HTMLImageElement) {
      const proxy = document.createElement('div')
      const tracker = InertiaPlugin.track(proxy, 'x,y')[0]!

      const skewxTo = gsap.quickTo(Image, 'skewX')
      const skewyTo = gsap.quickTo(Image, 'skewY')
      const xTo = gsap.quickTo(Image, 'x', { duration: 0.3 })
      const yTo = gsap.quickTo(Image, 'y', { duration: 0.3 })

      let drag: Draggable | undefined
      const updateSkew = () => {
        const vx = tracker.get('x')
        const vy = tracker.get('y')
        skewxTo(clampSkew(vx / -50))
        skewyTo(clampSkew(vy / -50))
        !vx && !vy && !drag?.isPressed && gsap.ticker.remove(updateSkew)
      }

      drag = Draggable.create(proxy, {
        type: 'x,y',
        trigger: Image,
        bounds: '#content__drag-area',
        edgeResistance: 0.6,
        cursor: 'grab',
        activeCursor: 'grabbing',
        zIndexBoost: false,
        inertia: true,
        onPressInit() {
          gsap.set(proxy, {
            x: gsap.getProperty(Image, 'x'),
            y: gsap.getProperty(Image, 'y'),
          })
          xTo.tween.pause()
          yTo.tween.pause()
          gsap.ticker.add(updateSkew)
          gsap.set(proxy, {
            width: Image.offsetWidth,
            height: Image.offsetHeight,
            position: 'absolute',
            pointerEvents: 'none',
            top: Image.offsetTop,
            left: Image.offsetLeft,
          })
        },
        onDrag() {
          xTo(this.x)
          yTo(this.y)
        },
        onDragStart() {
          gsap.timeline()
            .set(AllImg, { zIndex: 1 })
            .set(Image, { zIndex: 2 })
            .set(Cursor, { autoAlpha: 0, backgroundColor: 'transparent' })
        },
        onDragEnd() {
          gsap.set(Cursor, { autoAlpha: 1 })
        },
        onThrowUpdate() {
          xTo(this.x)
          yTo(this.y)
          gsap.set(Cursor, { backgroundColor: 'transparent' })
        },
      })[0]

      Image.parentNode?.append(proxy)
      Image.addEventListener('mouseenter', () => {
        gsap.to(Cursor, { opacity: 0, duration: 1, ease: 'power2.out' })
      })
      Image.addEventListener('mouseleave', () => {
        gsap.to(Cursor, { opacity: 1, backgroundColor: '#CDC3C35A', duration: 1, ease: 'power2.out' })
      })
    }
  }
  AllImg.forEach(draggableEl => new DraggableImg(draggableEl))
})
</script>

<template>
  <div>
    <TheCursor />
    <TheHeader />
    <div
      id="navbar"
      class="baron fixed z-10 hidden h-full min-h-[320px] w-screen min-w-[320px] items-center bg-white text-[2rem] transition-bg-color duration-500 ease-[ease] dark:bg-jet sm:lt:text-[6vw] lg:lt:text-[calc(6px_*_992_/_100)]"
    >
      <div
        id="content__drag-area"
        class="flex h-full items-center justify-center"
      >
        <div class="flex items-center justify-center">
          <nuxt-img
            v-for="(image, k) in images" :key="k"
            class="img-drag"
            width="600"
            height="750"
            :src="image.filePath"
          />
        </div>
        <ul class="absolute grid">
          <TheMenuLink to="/" title="accueil" />
          <TheMenuLink to="/gallery" title="galerie" />
          <TheMenuLink to="/about" title="à&#160;propos" />
        </ul>
        <div
          class="absolute bottom-0 mb-1 flex h-[10vh] min-h-[60px] w-full justify-center md:lt:min-h-[70px]"
        >
          <div
            class="grid w-1/2 grid-cols-[repeat(4,_55px)] items-center justify-center gap-[10px] md:grid-cols-[repeat(4,_70px)] md:gap-[30px]"
          >
            <NuxtLink
              to="https://www.instagram.com/benjamin_oddou/"
              class="fixed-el h-[55px] w-[55px] md:lt:h-[70px] md:lt:w-[70px]"
              aria-label="Lien vers mon compte Instagram"
              target="_blank"
              no-rel
            >
              <SvgMenuInsta class="icon" />
            </NuxtLink>
            <NuxtLink
              to="https://youtube.com/@benjaminoddou"
              class="fixed-el h-[55px] w-[55px] md:lt:h-[70px] md:lt:w-[70px]"
              aria-label="Lien vers ma chaine YouTube"
              target="_blank"
              no-rel
            >
              <SvgMenuYtbe class="icon" />
            </NuxtLink>
            <NuxtLink
              to="https://github.com/BenjaminOddou/portfolio"
              class="fixed-el h-[55px] w-[55px] md:lt:h-[70px] md:lt:w-[70px]"
              aria-label="Lien vers le répertoire GitHub"
              target="_blank"
              no-rel
            >
              <SvgMenuGit class="icon" />
            </NuxtLink>
            <NuxtLink
              to="mailto:benjaminoddou@hotmail.fr"
              class="fixed-el h-[55px] w-[55px] md:lt:h-[70px] md:lt:w-[70px]"
              aria-label="Lien vers mon Mail"
            >
              <SvgMenuMail class="icon" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-drag:nth-child(1) {
  margin: 0 0 30vh 0;
}

.img-drag:nth-child(2) {
  margin: 30vh 0 0 40vw;
}

@media (max-width: 575px) and (min-height: 576px) {
  .img-drag:nth-child(1) {
    margin: 0 0 50vh 0;
  }

  .img-drag:nth-child(2) {
    margin: 45vh 0 0 20vw;
  }
}

@media (max-width: 399px) {
  .img-drag:nth-child(1) {
    margin: 0 0 55vh 0;
  }

  .img-drag:nth-child(2) {
    margin: 50vh 0 0 15vw;
  }
}

.icon:deep() .spin {
  animation: spin 15s linear infinite;
  transform-origin: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
