<script setup lang="ts">
/**
 * Page d'erreur (404, 500…) : le code d'erreur sur fond de photos qui défilent
 * en diagonale sur trois rangées.
 */
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const ROW_COUNT = 3

const { data: rows } = await useFetch('/api/images', {
  query: { folder: '404-page' },
  // Répartit les photos en 3 rangées de tailles proches
  transform: (images) => {
    const remaining = [...images]
    return Array.from({ length: ROW_COUNT }, (_, i) => remaining.splice(0, Math.ceil(remaining.length / (ROW_COUNT - i))))
  },
  default: () => [],
})
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden">
    <!-- Photos qui défilent (chaque rangée est dupliquée pour une boucle sans saut) -->
    <div class="absolute top-1/2 left-1/2 flex h-[150vh] -translate-1/2 rotate-[22.5deg] transform-gpu flex-col justify-center opacity-50" aria-hidden="true">
      <div
        v-for="(row, i) in rows"
        :key="i"
        class="flex animate-runner"
        :style="{ animationDuration: `${10 + 4 * i}s` }"
      >
        <template v-for="copy in 2" :key="copy">
          <div
            v-for="image in row"
            :key="`${copy}-${image.filePath}`"
            class="m-[3vw] h-[30vh] flex-none bg-cover bg-center"
            :class="image.tags?.includes('large') ? 'w-[100vh] rounded-[20vh]' : 'w-[30vh] rounded-full'"
            :style="{ backgroundImage: `url(${image.url})` }"
          />
        </template>
      </div>
    </div>

    <!-- Message -->
    <div class="absolute z-1 m-auto size-full">
      <div class="mx-auto grid h-full w-1/2 max-w-[700px] min-w-[220px] -translate-y-[10%] content-center justify-center">
        <h1 class="flex w-full translate-y-[15%] justify-center font-baron text-[115px] leading-tight sm:text-[20vw] lg:text-[198.4px]">
          {{ error.status }}
        </h1>
        <p class="mt-[1vh] mb-[2vh] overflow-hidden p-2 text-center text-base leading-snug sm:text-[2.5vw] lg:text-[29.8px]">
          {{ error.message }}
        </p>
        <!-- Lien classique : recharge entièrement le site pour sortir de l'erreur -->
        <a href="/" class="button mx-auto flex w-full min-w-[225px] justify-center p-2 sm:w-2/3">
          Retourner à l'Accueil
        </a>
      </div>
    </div>
  </div>
</template>
