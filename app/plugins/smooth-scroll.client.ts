import Lenis from 'lenis'

/**
 * Défilement fluide (remplace GSAP ScrollSmoother).
 *
 * Lenis lisse la molette tout en conservant le défilement natif du navigateur :
 * `position: sticky`, `position: fixed`, les ancres et le clavier fonctionnent
 * normalement. Il respecte aussi le réglage « réduire les animations » du système.
 */
export default defineNuxtPlugin(() => {
  const lenis = new Lenis({
    autoRaf: true, // Lenis gère lui-même sa boucle requestAnimationFrame
    lerp: 0.06, // inertie (plus petit = plus « glissant ») ; ≈ ScrollSmoother `smooth: 2`
  })

  // Verrouillé jusqu'à la fin du préchargeur (voir ThePreloader.vue)
  lenis.stop()

  return {
    provide: { lenis },
  }
})
