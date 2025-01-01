// types/nuxt.d.ts
import type { gsap } from 'gsap'
import type { Draggable } from 'gsap/Draggable'
import type { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import type { InertiaPlugin } from 'gsap/InertiaPlugin'
import type { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import type { ScrollSmoother } from 'gsap/ScrollSmoother'
import type { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SplitText } from 'gsap/SplitText'

declare module '#app' {
  interface NuxtApp {
    $gsap: typeof gsap
    $ScrollTrigger: typeof ScrollTrigger
    $ScrollSmoother: typeof ScrollSmoother
    $Draggable: typeof Draggable
    $InertiaPlugin: typeof InertiaPlugin
    $SplitText: typeof SplitText
    $MorphSVGPlugin: typeof MorphSVGPlugin
    $DrawSVGPlugin: typeof DrawSVGPlugin
  }
}
