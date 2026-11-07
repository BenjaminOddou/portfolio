/**
 * Mini boîte à outils d'animation (remplace GSAP).
 *
 * La plupart des animations du site sont en CSS pur (classes `.reveal-*`).
 * Ce fichier couvre ce que le CSS ne sait pas faire seul :
 *  - `ease`            : courbes d'accélération (mêmes noms que GSAP)
 *  - `animate()`       : fait évoluer une progression de 0 à 1 dans le temps
 *  - `interpolate()`   : interpole deux nombres, ou deux chaînes contenant des
 *                        nombres (ex. l'attribut `d` d'un tracé SVG)
 *  - `createTimeline()`: timeline réversible (play / reverse), utilisée pour
 *                        les icônes animées au survol
 *  - `cssEase`         : courbes au format CSS, pour `element.animate()`
 */

export type Easing = (t: number) => number

/** Courbes « puissance » : power1 = quadratique … power4 = quintique (comme GSAP). */
function power(exponent: number) {
  return {
    in: (t: number) => t ** exponent,
    out: (t: number) => 1 - (1 - t) ** exponent,
    inOut: (t: number) => (t < 0.5 ? (2 * t) ** exponent / 2 : 1 - (2 * (1 - t)) ** exponent / 2),
  }
}

export const ease = {
  linear: (t: number) => t,
  power1: power(2),
  power2: power(3),
  power3: power(4),
  power4: power(5),
  sine: {
    in: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
    out: (t: number) => Math.sin((t * Math.PI) / 2),
    inOut: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  },
  expo: {
    out: (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t)),
  },
  /** Léger dépassement en fin de course, ex. `ease.backOut(4)` ≙ GSAP `back.out(4)` */
  backOut: (overshoot = 1.7): Easing => t => 1 + (overshoot + 1) * (t - 1) ** 3 + overshoot * (t - 1) ** 2,
  /** Rebond élastique en fin de course, ex. `ease.elasticOut(1, 0.5)` ≙ GSAP `elastic.out(1, 0.5)` */
  elasticOut: (amplitude = 1, period = 0.3): Easing => {
    const a = Math.max(amplitude, 1)
    const shift = (period / (2 * Math.PI)) * Math.asin(1 / a)
    return t => (t === 0 || t === 1)
      ? t
      : a * 2 ** (-10 * t) * Math.sin(((t - shift) * 2 * Math.PI) / period) + 1
  },
}

/** Courbes au format CSS (pour la Web Animations API). Identiques à celles de main.css. */
export const cssEase = {
  power2InOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  power3In: 'cubic-bezier(0.5, 0, 0.75, 0)',
  power3Out: 'cubic-bezier(0.25, 1, 0.5, 1)',
  power3InOut: 'cubic-bezier(0.76, 0, 0.24, 1)',
  power4Out: 'cubic-bezier(0.22, 1, 0.36, 1)',
}

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
export const lerp = (from: number, to: number, t: number) => from + (to - from) * t
export const wait = (seconds: number) => new Promise<void>(resolve => setTimeout(resolve, seconds * 1000))

// ---------------------------------------------------------------------------
// animate()
// ---------------------------------------------------------------------------

export interface AnimateOptions {
  /** Durée en secondes */
  duration: number
  /** Délai avant le départ, en secondes */
  delay?: number
  /** Courbe d'accélération (power1.out par défaut, comme GSAP) */
  ease?: Easing
  /** Appelée à chaque image avec la progression « adoucie » (0 → 1) */
  onUpdate: (progress: number) => void
}

export interface RunningAnimation {
  /** Promesse résolue à la fin (ou à l'annulation) de l'animation */
  finished: Promise<void>
  /** Stoppe l'animation là où elle en est */
  cancel: () => void
}

/**
 * Fait évoluer une progression de 0 à 1 pendant `duration` secondes.
 * @example
 * await animate({ duration: 0.5, ease: ease.power3.out, onUpdate: p => el.style.opacity = String(p) }).finished
 */
export function animate({ duration, delay = 0, ease: easing = ease.power1.out, onUpdate }: AnimateOptions): RunningAnimation {
  let frame = 0
  let resolve!: () => void
  const finished = new Promise<void>(r => (resolve = r))
  const startTime = performance.now() + delay * 1000

  const tick = (now: number) => {
    const elapsed = (now - startTime) / 1000
    if (elapsed >= 0) {
      const t = duration > 0 ? Math.min(elapsed / duration, 1) : 1
      onUpdate(easing(t))
      if (t === 1)
        return resolve()
    }
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)

  return {
    finished,
    cancel: () => {
      cancelAnimationFrame(frame)
      resolve()
    },
  }
}

// ---------------------------------------------------------------------------
// interpolate()
// ---------------------------------------------------------------------------

const NUMBER = /-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi

/** Texte entre les nombres, sans les séparateurs (espaces, virgules) : ex. `['M', '', 'c', …]` */
const skeleton = (value: string) => value.split(NUMBER).map(part => part.replace(/[\s,]/g, ''))

/**
 * Renvoie une fonction `t → valeur` qui passe de `from` à `to`.
 * Pour des chaînes (ex. tracés SVG), les nombres sont interpolés un à un :
 * les deux chaînes doivent donc avoir la même structure (mêmes commandes,
 * même nombre de valeurs). Sinon la valeur bascule simplement à la fin.
 */
export function interpolate<T extends number | string>(from: T, to: T): (t: number) => T
export function interpolate(from: number | string, to: number | string) {
  if (typeof from === 'number' && typeof to === 'number')
    return (t: number) => lerp(from, to, t)

  const a = String(from)
  const b = String(to)
  const fromNumbers = a.match(NUMBER)?.map(Number) ?? []
  const toNumbers = b.match(NUMBER)?.map(Number) ?? []
  const letters = skeleton(b)

  if (skeleton(a).join('|') !== letters.join('|')) {
    if (import.meta.dev)
      console.warn('[interpolate] structures différentes, pas d\'interpolation :', a, b)
    return (t: number) => (t < 1 ? a : b)
  }

  // Reconstruit la chaîne : commandes de `to` + nombres interpolés (séparés par un espace)
  return (t: number) => letters.reduce((out, part, i) => {
    const value = i < toNumbers.length
      ? Math.round(lerp(fromNumbers[i]!, toNumbers[i]!, t) * 1000) / 1000
      : ''
    return `${out}${part || ' '}${value}`
  }, '').trim()
}

/** Anime l'attribut `d` d'un tracé SVG entre deux formes de même structure. */
export function morphPath(path: SVGPathElement, from: string, to: string, options: { duration: number, ease?: Easing }) {
  const shape = interpolate(from, to)
  return animate({
    ...options,
    onUpdate: t => path.setAttribute('d', shape(t)),
  }).finished
}

// ---------------------------------------------------------------------------
// createTimeline()
// ---------------------------------------------------------------------------

/** Image clé : [instant (s), valeur, courbe pour ATTEINDRE cette valeur] */
export type Keyframe<T extends number | string = number | string> = [time: number, value: T, easing?: Easing]

export interface Track<T extends number | string = number | string> {
  keyframes: Keyframe<T>[]
  /** Applique la valeur calculée (ex. `v => path.setAttribute('d', v)`) */
  render: (value: T) => void
}

/** Petit helper pour typer une piste sans répéter les génériques. */
export const track = <T extends number | string>(keyframes: Keyframe<T>[], render: (value: T) => void) => ({ keyframes, render }) as unknown as Track

/**
 * Timeline réversible, décrite par des pistes d'images clés.
 * `play()` avance jusqu'à la fin, `reverse()` revient au début depuis la
 * position courante (idéal pour un survol : entrée → play, sortie → reverse).
 */
export function createTimeline(tracks: Track[]) {
  // Pré-calcule une fonction d'interpolation par segment de chaque piste
  const prepared = tracks.map(({ keyframes, render }) => ({
    render,
    keyframes,
    segments: keyframes.slice(1).map((key, i) => interpolate(keyframes[i]![1], key[1])),
  }))
  const duration = Math.max(...tracks.map(t => t.keyframes.at(-1)![0]))

  let time = 0
  let direction: 1 | -1 = 1
  let frame = 0
  let lastNow = 0

  function renderAt(t: number) {
    for (const { keyframes, segments, render } of prepared) {
      // Dernière image clé déjà atteinte
      let i = keyframes.length - 1
      while (i > 0 && keyframes[i]![0] > t) i--
      const [startTime, startValue] = keyframes[i]!
      const next = keyframes[i + 1]
      if (!next || t < startTime) {
        render(startValue)
        continue
      }
      const [endTime, , easing = ease.linear] = next
      const local = endTime > startTime ? (t - startTime) / (endTime - startTime) : 1
      render(segments[i]!(easing(local)))
    }
  }

  function tick(now: number) {
    time = clamp(time + direction * (now - lastNow) / 1000, 0, duration)
    lastNow = now
    renderAt(time)
    const isDone = direction === 1 ? time >= duration : time <= 0
    frame = isDone ? 0 : requestAnimationFrame(tick)
  }

  function run(newDirection: 1 | -1) {
    direction = newDirection
    if (!frame) {
      lastNow = performance.now()
      frame = requestAnimationFrame(tick)
    }
  }

  return {
    play: () => run(1),
    reverse: () => run(-1),
    stop: () => {
      cancelAnimationFrame(frame)
      frame = 0
    },
  }
}
