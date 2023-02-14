<script setup lang="ts">
const { $gsap: gsap } = useNuxtApp()

const isLock = scrollStore()
const isRoute = routeStore()

onMounted(() => {
  const preloaderContainer = document.querySelector(
    '#preloader-container',
  ) as HTMLDivElement
  gsap
    .timeline()
    .to('#quadbz2', {
      attr: {
        d: 'M 0 0 V 70 Q 50 90 100 70 V 0 z',
      },
      duration: 0.3,
      ease: 'power3.in',
      delay: 2,
    })
    .to('#quadbz2', {
      attr: {
        d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z',
      },
      duration: 0.8,
      ease: 'power3',
      onComplete: () => {
        preloaderContainer.classList.add('hidden')
        isLock.$patch({
          isReady: false,
        })
        isRoute.isNewPage++
      },
    })
    .fromTo(
      '#logoBO',
      {
        yPercent: 0,
      },
      {
        yPercent: -100,
        duration: 1.4,
        ease: 'power4.out',
      },
      2,
    )
})
</script>

<template>
  <div
    id="preloader-container"
    class="fixed z-50 h-full w-full overflow-hidden"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      class="absolute left-0 top-0 h-full w-full fill-light-lavender dark:fill-light-orange"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        id="quadbz2"
        stroke="tranparent"
        vector-effect="non-scaling-stroke"
        d="M 0 0 V 100 Q 50 100 100 100 V 0 z"
      />
    </svg>
    <div class="relative z-10 grid h-full w-full place-items-center">
      <div class="z-30 h-1/4 w-1/2 overflow-hidden">
        <SvgLogoBO id="logoBO" class="h-full w-full animate-[filldark_0.8s_ease-in-out_1.5s_forwards] fill-transparent stroke-jet stroke-[20] dark:animate-[fillwhite_0.8s_ease-in-out_1.5s_forwards] dark:stroke-white" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#logoBO:deep() path:nth-child(1) {
  stroke-dasharray: 7880;
  stroke-dashoffset: 7880;
  animation: line-anim 1.5s ease-in-out forwards;
}

#logoBO:deep() path:nth-child(2) {
  stroke-dasharray: 5289;
  stroke-dashoffset: 5289;
  animation: line-anim 1.3s ease-in-out forwards;
  animation-delay: 200ms;
}

#logoBO:deep() path:nth-child(3) {
  stroke-dasharray: 2408;
  stroke-dashoffset: 2408;
  animation: line-anim 1.1s ease-in-out forwards;
  animation-delay: 400ms;
}

@keyframes line-anim {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
