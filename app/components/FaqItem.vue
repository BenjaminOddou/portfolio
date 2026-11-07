<script setup lang="ts">
/** Question / réponse dépliable de la FAQ (`v-model` = ouverte ou non). */
defineProps<{
  question: string
}>()

const isOpen = defineModel<boolean>({ default: false })
const answerId = useId()
</script>

<template>
  <div v-reveal="{ start: 0.8 }" class="reveal-fade-up border-b border-current pt-8 [--duration:0.7s] [--ease:var(--ease-power3-out)]">
    <button
      type="button"
      class="grid w-full grid-cols-[92%_8%] pb-8 text-start md:grid-cols-[95%_5%]"
      :aria-expanded="isOpen"
      :aria-controls="answerId"
      @click="isOpen = !isOpen"
    >
      <span class="text-lg italic">{{ question }}</span>
      <svg
        class="size-5 place-self-center fill-none stroke-current stroke-2 transition-[rotate] duration-800 ease-power2-in-out"
        :class="{ '-rotate-180': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div :id="answerId" class="answer" :class="{ 'is-open': isOpen }">
      <div class="overflow-hidden">
        <div class="pb-8">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hauteur animée de 0 à « auto » grâce à grid-template-rows (0fr → 1fr).
   Ouverture : la hauteur, puis le fondu. Fermeture : l'inverse. */
.answer {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.6s var(--ease-power2-out),
    visibility 0.6s,
    grid-template-rows 0.6s var(--ease-power2-out) 0.2s;
}

.answer.is-open {
  grid-template-rows: 1fr;
  opacity: 1;
  visibility: visible;
  transition:
    grid-template-rows 0.6s var(--ease-power2-out),
    visibility 0s,
    opacity 0.6s var(--ease-power2-out) 0.2s;
}
</style>
