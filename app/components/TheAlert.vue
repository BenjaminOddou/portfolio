<script setup lang="ts">
defineProps<{
  header: string
  content: string
  color: 'teal' | 'red'
}>()

const { $gsap: gsap } = useNuxtApp()

const alertMessage = alertStore()

onMounted(() => {
  gsap.fromTo(
    '#alertComponent',
    { autoAlpha: 0, scale: 0 },
    {
      scale: 1,
      autoAlpha: 1,
      duration: 1,
      ease: 'power4.out',
    },
  )
  delay(alertMessage.delay).then(() => {
    gsap.to(
      '#alertComponent',
      {
        scale: 0,
        autoAlpha: 0,
        duration: 1,
        ease: 'power4.out',
        onComplete: () => {
          alertMessage.$reset()
        },
      },
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
      <div class="w-full px-2 align-text-bottom text-sm sm:text-base">
        <b>{{ header }} :</b>
        {{ content }}
      </div>
    </div>
  </div>
</template>
