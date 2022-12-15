<script setup lang="ts">
defineProps<{
  to: string
  title: string
}>()
const isLink = linkStore()
</script>

<template>
  <li class="z-[999] mx-auto mb-2 block text-center mix-blend-color-dodge dark:mix-blend-normal lt:mb-6">
    <NuxtLink
      :to="`${to}`"
      class="menu-item fixed-el"
      aria-hidden="true"
      @click="isLink.isNewLink++"
    >
      <div style="perspective: 1000px; perspective-origin: bottom;">
        <span class="splitted">{{ title }}</span>
        <span class="splitted absolute top-0 left-0">{{ title }}</span>
      </div>
    </NuxtLink>
  </li>
</template>
