<script setup lang="ts">
/**
 * Écran de chargement (première visite) : le logo se dessine puis se remplit,
 * avant qu'une vague ne dévoile la page. À la fin, le défilement est
 * déverrouillé et la page joue son animation d'introduction.
 */
const SHAPES = {
  full: 'M 0 0 V 100 Q 50 100 100 100 V 0 z',
  bump: 'M 0 0 V 70 Q 50 90 100 70 V 0 z',
  gone: 'M 0 0 V 0 Q 50 0 100 0 V 0 z',
}

const path = useTemplateRef('path')
const logo = useTemplateRef('logo')
const isDone = ref(false)
const scroll = useSmoothScroll()
const triggerPageIntro = usePageIntroTrigger()

onMounted(async () => {
  // À 2 s : le logo remonte pendant que la vague se retire
  logo.value?.animate(
    [
      { transform: 'none' },
      { transform: 'translateY(-100%)' },
    ],
    {
      duration: 1400,
      delay: 2000,
      easing: cssEase.power4Out,
      fill: 'forwards',
    },
  )
  await wait(2)
  await morphPath(path.value!, SHAPES.full, SHAPES.bump, { duration: 0.3, ease: ease.power3.in })
  await morphPath(path.value!, SHAPES.bump, SHAPES.gone, { duration: 0.8, ease: ease.power3.out })

  isDone.value = true
  scroll.unlock()
  triggerPageIntro()
})
</script>

<template>
  <div v-if="!isDone" class="fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      class="absolute inset-0 size-full fill-light-lavender dark:fill-light-orange"
    >
      <path ref="path" :d="SHAPES.full" />
    </svg>
    <div class="relative z-10 grid size-full place-items-center">
      <div class="h-1/4 w-1/2 overflow-hidden">
        <div ref="logo" class="size-full">
          <IconLogo class="logo size-full fill-transparent stroke-current stroke-20 text-jet dark:text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Le contour de chaque lettre se dessine (longueur du tracé = dasharray)… */
.logo :deep(path) {
  animation: draw-line var(--duration) ease-in-out var(--delay) forwards;
}

.logo :deep(path:nth-child(1)) {
  --duration: 1.5s;
  --delay: 0s;
  stroke-dasharray: 7880;
  stroke-dashoffset: 7880;
}

.logo :deep(path:nth-child(2)) {
  --duration: 1.3s;
  --delay: 0.2s;
  stroke-dasharray: 5289;
  stroke-dashoffset: 5289;
}

.logo :deep(path:nth-child(3)) {
  --duration: 1.1s;
  --delay: 0.4s;
  stroke-dasharray: 2408;
  stroke-dashoffset: 2408;
}

/* … puis le logo se remplit */
.logo {
  animation: fill-logo 0.8s ease-in-out 1.5s forwards;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fill-logo {
  to {
    fill: currentColor;
  }
}
</style>
