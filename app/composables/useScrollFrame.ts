export interface ScrollFrame {
  /** Position de défilement verticale (px) */
  y: number
  /** Vitesse de défilement (px/s), 0 quand la page s'arrête */
  velocity: number
}

/**
 * Appelle `callback` une fois par image tant que la page défile (et au
 * redimensionnement). Sert aux effets liés au défilement (parallaxe, rotation…),
 * à la place des ScrollTrigger « scrub » de GSAP.
 *
 * Un dernier appel avec `velocity: 0` est fait quand le défilement s'arrête.
 */
export function useScrollFrame(callback: (frame: ScrollFrame) => void) {
  let frame = 0
  let stopTimer: ReturnType<typeof setTimeout> | undefined
  let lastY = 0
  let lastTime = 0

  function update() {
    frame = 0
    const now = performance.now()
    const y = window.scrollY
    const elapsed = (now - lastTime) / 1000
    const velocity = elapsed > 0 && elapsed < 0.2 ? (y - lastY) / elapsed : 0
    lastY = y
    lastTime = now
    callback({ y, velocity })
  }

  function onScroll() {
    frame ||= requestAnimationFrame(update)
    clearTimeout(stopTimer)
    // Défilement arrêté : dernier appel avec une vitesse nulle
    stopTimer = setTimeout(callback, 100, { y: window.scrollY, velocity: 0 })
  }

  onMounted(() => {
    lastY = window.scrollY
    lastTime = performance.now()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    cancelAnimationFrame(frame)
    clearTimeout(stopTimer)
  })
}

/**
 * Progression (0 → 1) d'un élément pendant le défilement, à la manière de ScrollTrigger :
 * 0 quand son haut atteint `start` (fraction de la hauteur d'écran, 0 = haut de l'écran),
 * 1 après avoir défilé `distance` pixels de plus (par défaut : la hauteur de l'élément + `start`).
 */
export function scrollProgress(element: Element, start = 0, distance?: number) {
  const rect = element.getBoundingClientRect()
  const startOffset = start * window.innerHeight
  const total = distance ?? rect.height + startOffset
  return clamp((startOffset - rect.top) / total, 0, 1)
}
