<script setup lang="ts">
defineProps<{
  to: string
  title: string
}>()
const isLink = linkStore()
</script>

<template>
  <li class="navanchor">
    <NuxtLink
      :to="`${to}`"
      class="menu-item fixed-el"
      aria-hidden="true"
      @click="isLink.isNewLink++"
    >
      <div class="perspective-1000 perspective-o-b leading-tight">
        <span class="splitted absolute">{{ title }}</span>
        <span class="splitted">{{ title }}</span>
      </div>
    </NuxtLink>
  </li>
</template>
