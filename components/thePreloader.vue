<script setup lang="ts">
import gsap from 'gsap'
import logoBO from '/assets/svgs/logo-bo.svg?component'
import halfWave from '/assets/svgs/half-wave.svg?component'
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
      '#logoBO-big',
      {
        y: '0%',
      },
      {
        duration: 1.4,
        ease: 'power4.out',
        y: '-100%',
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
    <halfWave class="absolute left-0 top-0 h-full w-full fill-light-lavender dark:fill-light-orange" />
    <div class="relative z-10 grid h-full w-full place-items-center">
      <div class="z-30 h-1/4 w-1/2 overflow-hidden">
        <logoBO id="logoBO-big" stroke-width="20" class="h-full w-full animate-[filldark_0.8s_ease-in-out_1.5s_forwards] fill-transparent stroke-jet dark:animate-[fillwhite_0.8s_ease-in-out_1.5s_forwards] dark:stroke-white" />
      </div>
    </div>
  </div>
</template>

<style>
#logoBO-big path:nth-child(1) {
  stroke-dasharray: 7880;
  stroke-dashoffset: 7880;
  animation: line-anim 1.5s ease-in-out forwards;
}

#logoBO-big path:nth-child(2) {
  stroke-dasharray: 5289;
  stroke-dashoffset: 5289;
  animation: line-anim 1.3s ease-in-out forwards;
  animation-delay: 200ms;
}

#logoBO-big path:nth-child(3) {
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
