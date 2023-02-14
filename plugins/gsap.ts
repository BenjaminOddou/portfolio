import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { SplitText } from 'gsap/SplitText'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

export default defineNuxtPlugin(() => {
  if (process.client)
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Draggable, InertiaPlugin, SplitText, MorphSVGPlugin, DrawSVGPlugin)
  return {
    provide: { gsap, ScrollTrigger, ScrollSmoother, Draggable, InertiaPlugin, SplitText, MorphSVGPlugin, DrawSVGPlugin },
  }
})
