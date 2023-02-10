<script setup lang="ts">
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
if (process.client)
  gsap.registerPlugin(SplitText)

setResponseStatus(404)
const isRoute = routeStore()

const { data: images } = await useFetch<ImageKit[][]>('/api/imgkit', {
  transform: (images) => {
    const tmp = images
      .flat()
      .filter(image => image.filePath.includes('404'))
      .sort((imageA, imageB) => (imageA.name > imageB.name ? 1 : -1))
    const result: ImageKit[][] = []
    for (let i = 3; i > 0; i--)
      result.push(tmp.splice(0, Math.ceil(tmp.length / i)))

    return result
  },
})

useHead({
  title: 'Oups...',
})

onMounted(() => {
  const home = document.querySelector<HTMLDivElement>('#home')
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const qCqP = new SplitText('#ErrorCode', {
    type: 'chars',
    charsClass: 'overflow-hidden',
  })
  const qCqC = new SplitText('#ErrorCode', {
    type: 'chars',
  })
  const textContentP = new SplitText('#content', {
    type: 'lines',
    linesClass: 'overflow-hidden',
  })
  const textContentC = new SplitText('#content', {
    type: 'chars',
  })
  const tl1 = gsap.timeline()
  tl1.pause()
  isRoute.$subscribe(() => {
    tl1.play()
  })

  tl1
    .from(qCqC.chars, {
      xPercent: 100,
      duration: 1.2,
      ease: 'power4.out',
    })
    .from(
      textContentC.chars,
      {
        yPercent: 100,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.03,
        onComplete: () => {
          textContentP.revert()
          textContentC.revert()
        },
      },
      '<+0.3',
    )
    .from(
      home,
      {
        autoAlpha: 0,
        scale: 0.7,
        duration: 1,
        ease: 'back.out(1.4)',
      },
      '<+=0.6',
    )
})
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden">
    <div class="absolute top-1/2 left-1/2 flex h-[150vh] -translate-x-1/2 -translate-y-1/2 rotate-[22.5deg] transform-gpu flex-col justify-center opacity-50">
      <div v-for="(row, i) in images" :key="i" :style="`animation-duration: ${10 + 4 * i}s; transform: translateX(25%)`" class="flex animate-[runner_linear_infinite]">
        <div v-for="j in 2" :key="j" class="flex">
          <div v-for="(image, k) in row" :key="k">
            <div
              :style="`background-image: url(${image.url});`"
              :class="`flex-none h-[30vh] m-[3vw] bg-center bg-cover ${
                image.tags?.find((tag) => tag === 'large' as string)
                  ? 'w-[100vh] rounded-[20vh]'
                  : 'w-[30vh] rounded-[50%]'
              }`"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="absolute z-[1] m-auto h-full w-full">
      <div
        class="mx-auto grid h-full w-1/2 min-w-[220px] max-w-[700px] -translate-y-[10%] content-center justify-center"
      >
        <div
          id="ErrorCode"
          class="baron flex w-full translate-y-[15%] justify-center text-[115px] leading-tight sm:text-[20vw] lg:text-[198.4px]"
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
