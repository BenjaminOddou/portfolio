import type { ShallowRef } from 'vue'

interface DragAndThrowOptions {
  /** Élément dont l'élément déplacé ne doit pas sortir */
  bounds: () => HTMLElement | null | undefined
  /** Appelé quand on attrape l'élément (ex. pour le passer au premier plan) */
  onGrab?: () => void
}

// Réglages physiques
const EDGE_RESISTANCE = 0.6 // au-delà des bords, l'élément ne suit plus qu'à 40 %
const FOLLOW_SPEED = 12 // vitesse à laquelle l'image rattrape le pointeur (≈ 0,3 s)
const FRICTION = 3 // freinage de l'élan après le lâcher
const SNAP_BACK_SPEED = 12 // retour dans le cadre quand l'élan l'en a fait sortir
const SKEW_RATIO = 50 // vitesse (px/s) ÷ 50 = cisaillement en degrés…
const MAX_SKEW = 6 // … limité à ±6°

/**
 * Rend un élément déplaçable à la souris ou au doigt, avec élan au lâcher,
 * résistance aux bords et léger cisaillement selon la vitesse.
 * Remplace GSAP Draggable + InertiaPlugin pour les photos du menu.
 */
export function useDragAndThrow(target: Readonly<ShallowRef<HTMLElement | null>>, options: DragAndThrowOptions) {
  const aimed = { x: 0, y: 0 } // position visée (sous le pointeur, ou portée par l'élan)
  const shown = { x: 0, y: 0 } // position affichée, qui suit `aimed` avec un léger retard
  const velocity = { x: 0, y: 0 } // px/s
  const skew = { x: 0, y: 0 } // degrés
  const limits = { minX: 0, maxX: 0, minY: 0, maxY: 0 }
  const grab = {
    pointerX: 0,
    pointerY: 0,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
  }

  let isDragging = false
  let isThrown = false
  let frame = 0
  let lastFrameTime = 0

  /** Calcule les translations permises pour rester dans `bounds`. */
  function measureLimits(element: HTMLElement) {
    const area = options.bounds()?.getBoundingClientRect()
    const parent = (element.offsetParent ?? document.body).getBoundingClientRect()
    if (!area)
      return
    // Position de l'élément sans translation (offsetLeft/Top ignorent les transformations)
    const left = parent.left + element.offsetLeft
    const top = parent.top + element.offsetTop
    limits.minX = area.left - left
    limits.maxX = area.right - left - element.offsetWidth
    limits.minY = area.top - top
    limits.maxY = area.bottom - top - element.offsetHeight
  }

  /** Freine le déplacement au-delà des bords pendant le glisser. */
  function resist(value: number, min: number, max: number) {
    if (value < min)
      return min - (min - value) * (1 - EDGE_RESISTANCE)
    if (value > max)
      return max + (value - max) * (1 - EDGE_RESISTANCE)
    return value
  }

  function onPointerDown(event: PointerEvent) {
    const element = target.value
    if (!element || event.button !== 0)
      return
    event.preventDefault()
    element.setPointerCapture(event.pointerId)
    measureLimits(element)
    options.onGrab?.()

    isDragging = true
    isThrown = false
    velocity.x = velocity.y = 0
    Object.assign(grab, {
      pointerX: event.clientX,
      pointerY: event.clientY,
      startX: aimed.x,
      startY: aimed.y,
      lastX: aimed.x,
      lastY: aimed.y,
      lastTime: event.timeStamp,
    })
    element.style.cursor = 'grabbing'
    startLoop()
  }

  function onPointerMove(event: PointerEvent) {
    if (!isDragging)
      return
    aimed.x = resist(grab.startX + event.clientX - grab.pointerX, limits.minX, limits.maxX)
    aimed.y = resist(grab.startY + event.clientY - grab.pointerY, limits.minY, limits.maxY)

    // Vitesse lissée, utilisée pour l'élan et le cisaillement
    const elapsed = (event.timeStamp - grab.lastTime) / 1000
    if (elapsed > 0) {
      velocity.x = lerp(velocity.x, (aimed.x - grab.lastX) / elapsed, 0.3)
      velocity.y = lerp(velocity.y, (aimed.y - grab.lastY) / elapsed, 0.3)
    }
    Object.assign(grab, { lastX: aimed.x, lastY: aimed.y, lastTime: event.timeStamp })
  }

  function onPointerUp(event: PointerEvent) {
    if (!isDragging)
      return
    isDragging = false
    isThrown = true
    // Pointeur immobile juste avant le lâcher : pas d'élan
    if (event.timeStamp - grab.lastTime > 100)
      velocity.x = velocity.y = 0
    if (target.value)
      target.value.style.cursor = ''
  }

  /** Une image d'animation : élan, suivi, cisaillement, puis rendu. */
  function step(now: number) {
    const dt = Math.min((now - lastFrameTime) / 1000, 0.05)
    lastFrameTime = now

    if (isDragging && now - grab.lastTime > 50) {
      // Le pointeur ne bouge plus : la vitesse retombe
      velocity.x *= Math.exp(-10 * dt)
      velocity.y *= Math.exp(-10 * dt)
    }

    if (isThrown) {
      const friction = Math.exp(-FRICTION * dt)
      velocity.x *= friction
      velocity.y *= friction
      aimed.x += velocity.x * dt
      aimed.y += velocity.y * dt

      // Hors du cadre : on freine fort et on revient à l'intérieur
      const snap = 1 - Math.exp(-SNAP_BACK_SPEED * dt)
      const clampedX = clamp(aimed.x, limits.minX, limits.maxX)
      const clampedY = clamp(aimed.y, limits.minY, limits.maxY)
      if (clampedX !== aimed.x) {
        aimed.x += (clampedX - aimed.x) * snap
        velocity.x *= Math.exp(-15 * dt)
      }
      if (clampedY !== aimed.y) {
        aimed.y += (clampedY - aimed.y) * snap
        velocity.y *= Math.exp(-15 * dt)
      }

      const isInside = Math.abs(clampedX - aimed.x) < 0.5 && Math.abs(clampedY - aimed.y) < 0.5
      if (isInside && Math.hypot(velocity.x, velocity.y) < 5) {
        isThrown = false
        velocity.x = velocity.y = 0
      }
    }

    // L'image rattrape la position visée
    const follow = 1 - Math.exp(-FOLLOW_SPEED * dt)
    shown.x += (aimed.x - shown.x) * follow
    shown.y += (aimed.y - shown.y) * follow

    // Cisaillement proportionnel à la vitesse
    const skewEase = 1 - Math.exp(-8 * dt)
    skew.x += (clamp(-velocity.x / SKEW_RATIO, -MAX_SKEW, MAX_SKEW) - skew.x) * skewEase
    skew.y += (clamp(-velocity.y / SKEW_RATIO, -MAX_SKEW, MAX_SKEW) - skew.y) * skewEase

    if (target.value)
      target.value.style.transform = `translate(${shown.x}px, ${shown.y}px) skew(${skew.x}deg, ${skew.y}deg)`

    const isSettled = !isDragging && !isThrown
      && Math.abs(aimed.x - shown.x) < 0.1 && Math.abs(aimed.y - shown.y) < 0.1
      && Math.abs(skew.x) < 0.01 && Math.abs(skew.y) < 0.01
    frame = isSettled ? 0 : requestAnimationFrame(step)
  }

  function startLoop() {
    if (frame)
      return
    lastFrameTime = performance.now()
    frame = requestAnimationFrame(step)
  }

  // Empêche le « fantôme » de glisser-déposer natif des images
  const preventNativeDrag = (event: DragEvent) => event.preventDefault()

  onMounted(() => {
    const element = target.value
    if (!element)
      return
    element.style.touchAction = 'none'
    element.style.cursor = 'grab'
    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerup', onPointerUp)
    element.addEventListener('pointercancel', onPointerUp)
    element.addEventListener('dragstart', preventNativeDrag)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    const element = target.value
    element?.removeEventListener('pointerdown', onPointerDown)
    element?.removeEventListener('pointermove', onPointerMove)
    element?.removeEventListener('pointerup', onPointerUp)
    element?.removeEventListener('pointercancel', onPointerUp)
    element?.removeEventListener('dragstart', preventNativeDrag)
  })
}
