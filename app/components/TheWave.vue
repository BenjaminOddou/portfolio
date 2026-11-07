<script setup lang="ts">
/** Vague plein écran jouée à l'ouverture du menu et entre deux pages (pilotée par useWave). */
const wave = useWave()
const path = useTemplateRef('path')

onMounted(() => wave.register(path.value))
onBeforeUnmount(() => wave.register(null))
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    aria-hidden="true"
    class="pointer-events-none fixed inset-0 z-1000 size-full fill-light-lavender dark:fill-light-orange"
  >
    <path ref="path" :d="wave.SHAPES.bottomFlat" />
  </svg>
</template>
