<script setup lang="ts">
import gsap from 'gsap'

const alertMessage = alertStore()

defineProps<{
  header: string
  content: string
  color: 'teal' | 'red'
  icon: string
}>()

onMounted(() => {
  gsap.fromTo(
    '#alertComponent',
    { autoAlpha: 0, scale: 0 },
    {
      scale: 1,
      autoAlpha: 1,
      duration: 1,
      ease: 'power4.out'
    }
  )
  delay(alertMessage.delay).then(() => {
    gsap.fromTo(
      '#alertComponent',
      { autoAlpha: 1, scale: 1 },
      {
        scale: 0,
        autoAlpha: 0,
        duration: 1,
        ease: 'power4.out',
        onComplete: () => {
          alertMessage.$reset()
        }
      }
    )
  })
})
</script>

<template>
  <div
    class="fixed bottom-0 z-[3] my-6 grid w-full justify-items-center sm:bottom-auto sm:top-0"
  >
    <div
      id="alertComponent"
      :class="`mb-3 flex w-2/3 max-w-[300px] items-stretch rounded-2xl border-2 border-${color}-500 bg-${color}-100 px-2 py-2 text-${color}-900 opacity-0 sm:max-w-[320px]`"
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :class="`mr-2 h-5 w-5 stroke-current text-${color}-500 sm:h-6 sm:w-6`"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" :d="`${icon}`" />
      </svg>
      <div class="self-end align-text-bottom text-sm sm:text-base">
        <b>{{ header }} :</b>
        {{ content }}
      </div>
    </div>
  </div>
</template>
