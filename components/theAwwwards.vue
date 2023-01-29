<script setup lang="ts">
import gsap from 'gsap'
import icsAwwwards from '/assets/svgs/ics-awwwards.svg?component'
onMounted(() => {
  gsap.from('#awwwards', {
    x: '-100%',
    duration: 1,
    delay: 5.1,
    ease: 'power4.out',
  })
})
</script>

<template>
  <div id="awwwards" class="fixed top-[50vh] z-[3] -translate-y-1/2">
    <NuxtLink
      to="https://www.awwwards.com/sites/benjamin-oddou-photographe"
      class="fixed-el"
      aria-label="Mention Honorable Awwward"
      target="_blank"
      no-rel
    >
      <icsAwwwards />
    </NuxtLink>
  </div>
</template>
