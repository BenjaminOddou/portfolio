<script setup lang="ts">
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
if (process.client) {
  gsap.registerPlugin(SplitText)
}

setResponseStatus(404)
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
  const textContentP = new SplitText('#content', {
    type: 'lines',
    linesClass: 'overflow-hidden'
  })
  const textContentC = new SplitText('#content', {
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
      textContentC.chars,
      {
        y: '100%',
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.03,
        onComplete: () => {
          textContentP.revert()
          textContentC.revert()
        }
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
})
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden">
    <div class="tiles">
      <div v-for="(row, i) in images" :key="i" class="tiles__line">
        <div v-for="j in 2" :key="j" class="flex">
          <div v-for="(image, k) in row" :key="k">
            <div
              :style="`background-image: url(${image.url});`"
              :class="`tiles__line-img ${
                image.tags?.find((tag) => tag === 'large' as string)
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
        class="mx-auto grid h-full w-1/2 min-w-[220px] max-w-[700px] -translate-y-[10%] content-center justify-center"
      >
        <div
          class="baron flex w-full translate-y-[15%] justify-center text-[115px] leading-tight will-change-transform sm:text-[20vw] lg:text-[198.4px]"
        >
          404
        </div>
        <div
          class="mt-[1vh] mb-[2vh] p-2 text-base leading-snug sm:text-[2.5vw] lg:text-[29.8px]"
        >
          <div id="content" class="overflow-hidden text-center">
            Désolé, la page que vous recherchez semble introuvable
          </div>
        </div>
        <button id="home">
          <NuxtLink
            to="/"
            class="button mx-auto flex w-full min-w-[225px] cursor-pointer justify-center p-2 disabled:pointer-events-none disabled:bg-light-lavender dark:disabled:pointer-events-none dark:disabled:bg-light-orange sm:w-2/3"
          >
            Retourner à l'Accueil 🏠
          </NuxtLink>
        </button>
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
