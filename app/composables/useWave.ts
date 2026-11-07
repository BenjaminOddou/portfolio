/**
 * Vague colorée plein écran (dessinée par TheWave.vue).
 *
 * `cover()`   : la vague monte depuis le bas jusqu'à couvrir l'écran.
 * `uncover()` : la vague se retire vers le haut et dévoile l'écran.
 *
 * Utilisée à l'ouverture / fermeture du menu et entre deux pages.
 */

/** Formes successives de la vague (viewBox 0 0 100 100 étirée sur tout l'écran) */
const SHAPES = {
  // Montée depuis le bas
  bottomFlat: 'M 0 100 V 100 Q 50 100 100 100 V 100 z',
  bottomBump: 'M 0 100 V 50 Q 50 0 100 50 V 100 z',
  bottomFull: 'M 0 100 V 0 Q 50 0 100 0 V 100 z',
  // Retrait vers le haut
  topFull: 'M 0 0 V 100 Q 50 100 100 100 V 0 z',
  topBump: 'M 0 0 V 50 Q 50 0 100 50 V 0 z',
  topFlat: 'M 0 0 V 0 Q 50 0 100 0 V 0 z',
}

/** Tracé SVG de la vague, enregistré par TheWave.vue au montage (client uniquement). */
let wavePath: SVGPathElement | null = null

export function useWave() {
  return {
    SHAPES,

    register: (path: SVGPathElement | null) => {
      wavePath = path
    },

    /** Couvre l'écran. Durées en secondes : montée de la bosse, puis remplissage. */
    async cover({ rise = 0.5, fill = 0.3 } = {}) {
      if (!wavePath)
        return
      await morphPath(wavePath, SHAPES.bottomFlat, SHAPES.bottomBump, { duration: rise, ease: ease.power3.in })
      await morphPath(wavePath, SHAPES.bottomBump, SHAPES.bottomFull, { duration: fill, ease: ease.power3.out })
    },

    /** Dévoile l'écran. `onLifted` est appelé quand la vague commence à libérer l'écran. */
    async uncover({ lift = 0.3, settle = 0.5, onLifted }: { lift?: number, settle?: number, onLifted?: () => void } = {}) {
      if (!wavePath)
        return
      await morphPath(wavePath, SHAPES.topFull, SHAPES.topBump, { duration: lift, ease: ease.power3.in })
      onLifted?.()
      await morphPath(wavePath, SHAPES.topBump, SHAPES.topFlat, { duration: settle, ease: ease.power3.out })
    },
  }
}
