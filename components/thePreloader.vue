<script setup lang="ts">
import gsap from 'gsap'

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
        <svg
          id="logoBO-big"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          stroke-width="20"
          viewBox="0 0 3000 3000"
          class="h-full w-full animate-[filldark_0.8s_ease-in-out_1.5s_forwards] fill-transparent stroke-jet dark:animate-[fillwhite_0.8s_ease-in-out_1.5s_forwards] dark:stroke-white"
        >
          <path
            id="B"
            d="M1169.06,1481.25c125-31.25,243.75-129.17,243.75-320.84C1412.81,739.58,927.392,750,927.392,750H441.977V2208.33H927.392c97.918,0,506.248-18.75,506.248-418.75C1433.64,1789.58,1444.06,1537.5,1169.06,1481.25ZM683.643,991.663H927.392s241.668-10.417,241.668,185.417c0,181.25-241.668,181.25-241.668,181.25H683.643V991.663Zm243.749,975H683.643V1602.08H927.392s262.5-14.59,262.5,181.25C1189.89,1941.66,1029.48,1966.66,927.392,1966.66Z"
          />
          <path
            id="O"
            d="M2071.9,1124.97c-297.92,0-541.67,243.75-541.67,541.67s243.75,541.67,541.67,541.67,541.66-243.75,541.66-541.67S2369.81,1124.97,2071.9,1124.97Zm0,841.67c-166.67,0-300-133.33-300-300s133.33-300,300-300,299.99,133.33,299.99,300S2238.56,1966.64,2071.9,1966.64Z"
          />
          <path id="-" d="M1596.9,991.808h962.49V750.142H1596.9V991.808Z" />
        </svg>
      </div>

      <div class="absolute top-2/3 z-20 grid h-auto w-full grid-cols-1">
        <noscript style="text-align: center; margin-bottom: 1rem">
          🇫🇷 Ce site requiert l'utilisation du langage JavaScript. Veuillez
          autoriser son utilisation pour continuer 🇫🇷
        </noscript>
        <noscript style="text-align: center">
          🇬🇧 This website requires JavaScript. Please turn it on to continue 🇬🇧
        </noscript>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
