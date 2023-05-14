<script setup lang="ts">
const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()

const isRoute = routeStore()

onMounted(() => {
  if (ScrollTrigger.isTouch !== 1) {
    const Cursor = document.querySelector('#cursor') as HTMLDivElement
    Cursor.style.backgroundColor = 'transparent'
    const fixedItems = document.querySelectorAll(
      'a.fixed-el, button.fixed-el',
    ) as NodeListOf<HTMLElement>
    const ScaleMouse = (Items: NodeListOf<HTMLElement>) => {
      Items.forEach((link) => {
        // On mouse enter scale the media-cursor to 2
        link.addEventListener('pointerenter', () => {
          gsap.to(Cursor, {
            scale: 2,
            duration: 1,
            ease: 'power4.out',
          })
        })
        // On mouse leave scale the media-cursor to 1
        link.addEventListener('pointerleave', () => {
          gsap.to(Cursor, {
            scale: 1,
            duration: 1,
            ease: 'power4.out',
          })
        })
      })
    }

    ScaleMouse(fixedItems)
    isRoute.$subscribe(() => {
      gsap.to(Cursor, {
        scale: 1,
        duration: 1,
        ease: 'power4.out',
      })
      const newItems = document.querySelectorAll<HTMLElement>(
        'a:not(.fixed-el):not(.ignore-cursor), button:not(.fixed-el), input, textarea, label, select',
      )
      ScaleMouse(newItems)
    })

    gsap.set(Cursor, {
      xPercent: -50,
      yPercent: -50,
    })

    const xTo = gsap.quickTo(Cursor, 'x', {
      duration: 0.4,
      ease: 'power3',
    })
    const yTo = gsap.quickTo(Cursor, 'y', {
      duration: 0.4,
      ease: 'power3',
    })

    window.addEventListener('mousemove', (e) => {
      if (Cursor.style.backgroundColor === 'transparent') {
        gsap.to(Cursor, {
          backgroundColor: '#CDC3C35A',
          duration: 1,
          ease: 'power2.out',
        })
      }
      xTo(e.clientX)
      yTo(e.clientY)
    })

    Cursor.classList.remove('opacity-0')
  }
})
</script>

<template>
  <div
    id="cursor"
    class="pointer-events-none fixed left-0 top-0 z-[1500] h-[35px] w-[35px] rounded-[50%] bg-cursor opacity-0"
  />
</template>

<style scoped>
@media (pointer: coarse) {
  #cursor {
    display: none !important;
  }
}
</style>
