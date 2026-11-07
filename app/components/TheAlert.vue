<script setup lang="ts">
/** Notification affichée en haut de l'écran (en bas sur mobile), voir useAlert(). */
const { current } = useAlert()

const TONES = {
  success: 'border-teal-500 bg-teal-100 text-teal-900',
  error: 'border-red-500 bg-red-100 text-red-900',
}
</script>

<template>
  <div class="pointer-events-none fixed bottom-0 z-3 my-6 grid w-full justify-items-center sm:top-0 sm:bottom-auto">
    <Transition name="alert">
      <div
        v-if="current"
        role="alert"
        class="mb-3 w-2/3 max-w-[300px] rounded-2xl border-2 p-2 sm:max-w-[320px]"
        :class="TONES[current.tone]"
      >
        <p class="px-2 text-sm sm:text-base">
          <b>{{ current.title }} :</b>
          {{ current.message }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition:
    opacity 1s var(--ease-power4-out),
    scale 1s var(--ease-power4-out);
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  scale: 0;
}
</style>
