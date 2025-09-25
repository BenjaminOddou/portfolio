import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    Draggable,
    InertiaPlugin,
    SplitText,
    MorphSVGPlugin,
    DrawSVGPlugin,
  )
  return {
    provide: {
      gsap,
      ScrollTrigger,
      ScrollSmoother,
      Draggable,
      InertiaPlugin,
      SplitText,
      MorphSVGPlugin,
      DrawSVGPlugin,
    },
  }
})
