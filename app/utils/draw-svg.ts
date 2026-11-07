/**
 * Équivalent du plugin DrawSVG de GSAP : n'affiche qu'une portion d'un tracé SVG.
 *
 * @example
 * const drawer = createStrokeDrawer(path)
 * drawer.draw(20, 40) // affiche le tracé de 20 % à 40 % de sa longueur
 * window.addEventListener('resize', drawer.measure)
 */
export function createStrokeDrawer(shape: SVGGeometryElement) {
  let length = 0

  /** Mesure la longueur du tracé (à refaire quand la taille du SVG change). */
  function measure() {
    length = screenLength(shape)
  }

  /** Affiche la portion du tracé comprise entre `start` et `end` (en %). */
  function draw(start: number, end: number) {
    const visible = (Math.max(end - start, 0) / 100) * length
    // Un seul trait visible, suivi d'un espace plus long que le tracé entier
    shape.style.strokeDasharray = `${visible} ${length * 2}`
    shape.style.strokeDashoffset = `${(-start / 100) * length}`
  }

  measure()
  return { measure, draw }
}

/**
 * Longueur du tracé telle qu'affichée à l'écran. Avec `vector-effect: non-scaling-stroke`,
 * les pointillés sont calculés en pixels écran : on mesure donc le tracé une fois
 * transformé (y compris quand le SVG est déformé par `preserveAspectRatio="none"`).
 */
function screenLength(shape: SVGGeometryElement, samples = 80) {
  const total = shape.getTotalLength()
  const matrix = shape.getScreenCTM()
  if (!matrix)
    return total

  let length = 0
  let previous: DOMPoint | undefined
  for (let i = 0; i <= samples; i++) {
    const point = shape.getPointAtLength((total * i) / samples).matrixTransform(matrix)
    if (previous)
      length += Math.hypot(point.x - previous.x, point.y - previous.y)
    previous = point
  }
  return length
}
