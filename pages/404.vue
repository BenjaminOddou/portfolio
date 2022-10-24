<script setup lang="ts">
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
if (process.client) {
  gsap.registerPlugin(SplitText)
}

const isRoute = routeStore()

const { data: images } = await useFetch<ImageKit[][]>('/api/imgkit', {
  transform: (images) => {
    const tmp = images
      .flat()
      .filter((image) => image.filePath.includes('404'))
      .sort((imageA, imageB) => (imageA.name > imageB.name ? 1 : -1))
    const result: ImageKit[][] = []
    for (let i = 3; i > 0; i--) {
      result.push(tmp.splice(0, Math.ceil(tmp.length / i)))
    }
    return result
  }
})

useHead({
  title: 'Oups...'
})

onMounted(() => {
  const home = document.querySelector<HTMLDivElement>('#home')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const qCqP = new SplitText('.baron', {
    type: 'chars',
    charsClass: 'overflow-hidden'
  })
  const qCqC = new SplitText('.baron', {
    type: 'chars'
  })
  const textContent = new SplitText('#content', {
    type: 'chars'
  })
  const tl1 = gsap.timeline()
  tl1.pause()
  isRoute.$subscribe(() => {
    tl1.play()
  })

  tl1
    .from(qCqC.chars, {
      x: '100%',
      duration: 1.2,
      ease: 'power4.out'
    })
    .from(
      textContent.chars,
      {
        y: '100%',
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.03
      },
      '<+0.3'
    )
    .fromTo(
      home,
      {
        autoAlpha: 0,
        scale: 0.7
      },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.4)'
      },
      '<+=0.6'
    )

  home.addEventListener('click', () => {
    location.href = '/'
  })
})
</script>

<template>
  <div class="relative h-[100svh] w-[100svw] overflow-hidden">
    <div class="tiles">
      <div v-for="(row, i) in images" :key="i" class="tiles__line">
        <div v-for="j in 2" :key="j" class="flex">
          <div v-for="(image, k) in row" :key="k">
            <div
              :style="`background-image: url(${image.url});`"
              :class="`tiles__line-img ${
                image.tags !== null && image.tags.find((tag) => tag === 'large' as string)
                  ? 'tiles__line-img--large'
                  : ''
              }`"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute z-[1] m-auto h-full w-full">
      <div
        class="grid h-full w-full -translate-y-[5%] content-center justify-center"
      >
        <div
          class="baron w-full translate-y-[25%] text-[140px] leading-none will-change-transform sm:text-[30vw] lg:text-[298px]"
        >
          404
        </div>
        <div
          class="mt-6 mb-10 p-2 text-sm font-thin leading-loose sm:text-[3vw] lg:text-[29.8px]"
        >
          <div id="content" class="overflow-hidden">
            Désolé, la page demandée n'existe pas
          </div>
        </div>
        <div id="home">
          <button
            class="button w-full cursor-pointer justify-center p-2 disabled:pointer-events-none disabled:bg-light-lavender dark:disabled:pointer-events-none dark:disabled:bg-light-orange"
          >
            Retourner à l'Accueil 🏠
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tiles {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 150vh;
  display: flex;
  opacity: 0.5;
  flex-direction: column;
  justify-content: center;
  transform: translate3d(-50%, -50%, 0) rotate(22.5deg);
}

.tiles__line {
  display: flex;
  animation: runner 10s linear infinite;
  will-change: transform;
  transform: translateX(25%);
}

.tiles__line:nth-child(2) {
  animation-duration: 16s;
}

.tiles__line:nth-child(3) {
  animation-duration: 22s;
}

.tiles__line-img {
  flex: none;
  width: 30vh;
  height: 30vh;
  margin: 3vw;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.tiles__line-img--large {
  width: 100vh;
  border-radius: 20vh;
}

@keyframes runner {
  to {
    transform: translateX(-25%);
  }
}
</style>
