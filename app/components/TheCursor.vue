<script setup lang="ts">
/**
 * Curseur personnalisé : un disque qui suit la souris avec un léger retard.
 * - il grossit au survol des éléments cliquables (sauf `data-cursor="ignore"`) ;
 * - il disparaît au-dessus des éléments `data-cursor="hide"` (photos du menu).
 * Inutile sur écran tactile : il n'y est jamais affiché.
 */
const INTERACTIVE = 'a, button, input, textarea, label, select'
const FOLLOW_SPEED = 10 // plus grand = suit plus vite

const cursor = useTemplateRef('cursor')
const isActive = ref(false) // devient vrai au premier mouvement de souris
const isEnlarged = ref(false)
const isHidden = ref(false)

const target = { x: 0, y: 0 }
const position = { x: 0, y: 0 }
let frame = 0
let lastTime = 0

/** Rapproche le disque du pointeur, image par image, jusqu'à l'avoir rattrapé. */
function follow(now: number) {
  const dt = Math.min((now - lastTime) / 1000, 0.1)
  lastTime = now
  const progress = 1 - Math.exp(-FOLLOW_SPEED * dt)
  position.x += (target.x - position.x) * progress
  position.y += (target.y - position.y) * progress
  if (cursor.value)
    cursor.value.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`

  const isCaughtUp = Math.abs(target.x - position.x) < 0.1 && Math.abs(target.y - position.y) < 0.1
  frame = isCaughtUp ? 0 : requestAnimationFrame(follow)
}

function onPointerMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse')
    return
  target.x = event.clientX
  target.y = event.clientY
  if (!isActive.value) {
    // Premier mouvement : le disque apparaît directement sous la souris
    isActive.value = true
    position.x = target.x
    position.y = target.y
  }
  if (!frame) {
    lastTime = performance.now()
    frame = requestAnimationFrame(follow)
  }
}

function onPointerOver(event: PointerEvent) {
  const element = event.target as Element
  isHidden.value = !!element.closest('[data-cursor="hide"]')
  isEnlarged.value = !isHidden.value && !!element.closest(INTERACTIVE) && !element.closest('[data-cursor="ignore"]')
}

// Après un changement de page, l'élément survolé a disparu
const route = useRoute()
watch(() => route.path, () => (isEnlarged.value = false))

onMounted(() => {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches)
    return
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('pointerover', onPointerOver)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerover', onPointerOver)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <div ref="cursor" aria-hidden="true" class="cursor pointer-events-none fixed top-0 left-0 z-1500">
    <div
      class="cursor-dot size-[35px] -translate-1/2 rounded-full bg-cursor"
      :class="{ 'is-visible': isActive && !isHidden, 'is-enlarged': isEnlarged }"
    />
  </div>
</template>

<style scoped>
/* Jamais affiché sur les écrans tactiles */
@media not ((hover: hover) and (pointer: fine)) {
  .cursor {
    display: none;
  }
}

.cursor-dot {
  opacity: 0;
  transition:
    opacity 1s var(--ease-power2-out),
    scale 1s var(--ease-power4-out);
}

.cursor-dot.is-visible {
  opacity: 1;
}

.cursor-dot.is-enlarged {
  scale: 2;
}
</style>
