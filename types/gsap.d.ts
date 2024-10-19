// types/nuxt.d.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { SplitText } from 'gsap/SplitText'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

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