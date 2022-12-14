<script setup lang="ts">
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'

if (process.client)
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger, SplitText)

const router = useRoute()
const isLock = scrollStore()
const isRoute = routeStore()
const isLink = linkStore()
const alertMessage = alertStore()
let thisLink: string
isLink.$subscribe(() => {
  thisLink = location.href
})
const init1 = 'M 0 100 V 100 Q 50 100 100 100 V 100 z' as string
const start1 = 'M 0 100 V 50 Q 50 0 100 50 V 100 z' as string
const end1 = 'M 0 100 V 0 Q 50 0 100 0 V 100 z' as string
const init2 = 'M 0 0 V 100 Q 50 100 100 100 V 0 z' as string
const start2 = 'M 0 0 V 50 Q 50 0 100 50 V 0 z' as string
const end2 = 'M 0 0 V 0 Q 50 0 100 0 V 0 z' as string

const onBeforeLeave = (_el: HTMLDivElement) => {
  isLock.$patch({
    isReady: true,
  })
  ScrollTrigger.killAll()
}

const onLeave = (_el: HTMLDivElement, done: any) => {
  const menuItems = document.querySelectorAll(
    '.menu-item',
  ) as NodeListOf<HTMLAnchorElement>
  const navbar = document.querySelector('#navbar') as HTMLDivElement
  const wave = document.querySelector('#wave') as SVGElement
  const buttonBurger = document.querySelector(
    '#button-burger',
  ) as HTMLButtonElement
  gsap
    .timeline()
    .set('#quadbz', {
      attr: {
        d: init1,
      },
    })
    .to('#quadbz', {
      onStart: () => {
        wave.classList.remove('hidden')
        menuItems.forEach((Navlink) => {
          Navlink.classList.add('pointer-events-none')
        })
      },
      duration: 0.5,
      attr: { d: start1 },
      ease: 'power3.in',
    })
    .to('#quadbz', {
      duration: 0.3,
      attr: { d: end1 },
      ease: 'power3',
      onComplete: () => {
        const Smooth = ScrollSmoother.get() as globalThis.ScrollSmoother
        Smooth.scrollTop(0)
        buttonBurger.classList.remove('is-hovered', 'is-open')
        navbar.classList.replace('block', 'hidden')
      },
    })
    .to(
      '#to-offset',
      {
        duration: 0.8,
        y: 200,
        ease: 'power3.in',
      },
      0,
    )
    .to(
      menuItems,
      {
        duration: 0.8,
        opacity: 0,
        y: -100,
        stagger: 0.05,
        ease: 'power2.inOut',
        onComplete: () => {
          menuItems.forEach((Navlink) => {
            Navlink.classList.remove('pointer-events-none')
          })
        },
      },
      0,
    )
    .to(
      '#content__drag-area',
      {
        duration: 1,
        opacity: 0,
        y: -200,
        ease: 'power3.inOut',
        onComplete: done,
      },
      0,
    )
}

const onEnter = (_el: HTMLDivElement, done: any) => {
  const wave = document.querySelector('#wave') as SVGElement
  gsap
    .timeline()
    .set('#quadbz', {
      attr: {
        d: init2,
      },
    })
    .to('#quadbz', {
      duration: 0.3,
      attr: { d: start2 },
      ease: 'power3.in',
      onComplete: () => {
        isRoute.isNewPage++
      },
    })
    .to('#quadbz', {
      duration: 0.5,
      attr: { d: end2 },
      ease: 'power3',
      onComplete: () => {
        wave.classList.add('hidden')
      },
    })
    .to(
      '#to-offset',
      {
        duration: 0.8,
        y: 0,
        ease: 'power3.out',
        onComplete: done,
      },
      0,
    )
}

const onAfterEnter = (_el: HTMLDivElement) => {
  ScrollTrigger.refresh()
  delay(100).then(() => {
    isLock.$patch({
      isReady: false,
    })
  })
}

useHead({
  htmlAttrs: {
    'xmlns:og': 'http://ogp.me/ns#',
  },
  titleTemplate: (title) => {
    return title
      ? `${title} | Benjamin Oddou Photographe`
      : 'Benjamin Oddou Photographe'
  },
  meta: [
    {
      name: 'description',
      content: `${router.meta.description}`,
    },
    {
      property: 'og:title',
      content: `${router.meta.title} | Benjamin Oddou Photographe`,
    },
    {
      property: 'og:url',
      content: `${router.meta.url}`,
    },
    {
      property: 'og:description',
      content: `${router.meta.description}`,
    },
    {
      name: 'keywords',
      content:
        'photographe, mariage, portrait, couple, corporate, paris, ile de france, france, photo studio',
    },
    { name: 'msapplication-TileColor', content: '#2a2a2a' },
    {
      name: 'theme-color',
      content: '#FFFFFF',
      media: '(prefers-color-scheme: light)',
    },
    {
      name: 'theme-color',
      content: '#2A2A2A',
      media: '(prefers-color-scheme: dark)',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `${router.meta.url}`,
    },
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#fca87f',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.cdnfonts.com/css/baron-neue',
    },
  ],
})

useSchemaOrg([
  definePerson({
    name: 'Benjamin Oddou',
    image: '/me.jpg',
    sameAs: [
      'https://www.instagram.com/benjamin_oddou',
      'https://www.awwwards.com/BenjaminO',
      'https://github.com/BenjaminOddou',
      'https://twitter.com/benjamin_oddou',
      'https://fr.linkedin.com/in/b-oddou',
      'https://youtube.com/@benjaminoddou',
    ],
  }),
  defineWebSite({
    name: 'Benjamin Oddou Photographe',
  }),
  defineWebPage(),
])

onBeforeMount(() => {
  ScrollSmoother.create({
    smooth: 2,
    normalizeScroll: true,
    ignoreMobileResize: true,
  })
})

onMounted(() => {
  const Smooth = ScrollSmoother.get() as globalThis.ScrollSmoother
  let styles: string
  if (!navigator.userAgent.includes('Chrome')) {
    styles = [
      'background: linear-gradient(90deg, #80EEC0, #00DC82)',
      'background-clip: text',
      '-webkit-background-clip: text',
      '-webkit-text-fill-color: transparent',
      'color: transparent',
      'font-weight: bold',
      'font-size: 16px',
    ].join(';')
  }
  else {
    styles = 'font-size: 16px'
  }
  const message = '?? la recherche de quelque chose ?'
  console.log(
    '%c???? %c%s%c ????',
    'font-size: 16px',
    styles,
    message,
    'font-size: 16px',
  )
  Smooth.paused(true)
  isLock.$subscribe(() => {
    isLock.isReady === true ? Smooth.paused(true) : Smooth.paused(false)
  })

  const tl1 = gsap.timeline()
  const tl2 = gsap.timeline()
  tl1.pause()
  tl2.pause()
  const quadbz = document.querySelector('#quadbz') as SVGPathElement
  const wave = document.querySelector('#wave') as SVGElement
  const buttonBurger = document.querySelector(
    '#button-burger',
  ) as HTMLButtonElement
  const navbar = document.querySelector('#navbar') as HTMLDivElement
  const menuItems = document.querySelectorAll(
    '.menu-item',
  ) as NodeListOf<HTMLAnchorElement>

  tl1
    .set(quadbz, {
      attr: {
        d: init1,
      },
    })
    .to(quadbz, {
      onStart: () => {
        wave.classList.remove('hidden')
        menuItems.forEach((Navlink) => {
          Navlink.classList.add('pointer-events-none')
        })
      },
      duration: 0.5,
      attr: { d: start1 },
      ease: 'power3.in',
    })
    .to(quadbz, {
      duration: 0.2,
      attr: { d: end1 },
      ease: 'power3',
      onComplete: () => {
        buttonBurger.classList.remove('is-hovered')
        buttonBurger.classList.toggle('is-open')
        navbar.classList.toggle('hidden')
        navbar.classList.toggle('block')
        if (buttonBurger.classList.contains('is-open')) {
          isLock.$patch({
            isReady: true,
          })
        }
        else {
          isLock.$patch({
            isReady: false,
          })
        }
      },
    })
    .set(quadbz, {
      attr: {
        d: init2,
      },
    })
    .to(quadbz, {
      duration: 0.2,
      attr: { d: start2 },
      ease: 'power3.in',
    })
    .to(quadbz, {
      duration: 0.5,
      attr: { d: end2 },
      ease: 'power3',
      onComplete: () => {
        wave.classList.add('hidden')
        menuItems.forEach((Navlink) => {
          Navlink.classList.remove('pointer-events-none')
        })
      },
    })

  tl2
    .to(menuItems, {
      duration: 0.8,
      opacity: 0,
      y: -100,
      stagger: 0.05,
      ease: 'power2.inOut',
    })
    .to(
      '#content__drag-area',
      {
        duration: 1,
        opacity: 0,
        y: -200,
        ease: 'power3.inOut',
      },
      '<',
    )

  buttonBurger.addEventListener('click', () => {
    if (!tl1.isActive()) {
      tl1.restart()
      if (buttonBurger.classList.contains('is-open') && !tl2.isActive()) {
        tl2.restart()
      }
      else {
        gsap
          .timeline()
          .set([menuItems, '#content__drag-area'], {
            opacity: 0,
          })
          .to(
            menuItems,
            {
              duration: 0.8,
              opacity: 1,
              startAt: {
                y: 150,
              },
              y: 0,
              stagger: -0.05,
              ease: 'power4',
            },
            0.9,
          )
          .to(
            '#content__drag-area',
            {
              duration: 1,
              opacity: 1,
              startAt: {
                y: 300,
              },
              y: 0,
              ease: 'power4.out',
            },
            0.9,
          )
      }
    }
  })

  if (ScrollTrigger.isTouch !== 1) {
    buttonBurger.addEventListener('pointerenter', () => {
      buttonBurger.classList.add('is-hovered')
    })

    buttonBurger.addEventListener('pointerleave', () => {
      buttonBurger.classList.remove('is-hovered')
    })
  }

  menuItems.forEach((Navlink) => {
    Navlink.addEventListener('click', () => {
      if (Navlink.href === thisLink && !tl1.isActive() && !tl2.isActive()) {
        tl1.restart()
        tl2.restart()
      }
    })
    const menuItmSpan = Navlink.querySelectorAll<HTMLSpanElement>('.splitted')
    const menuItmTxtTop = new SplitText(menuItmSpan[0], { type: 'chars' })
    const menuItmTxtBtm = new SplitText(menuItmSpan[1], { type: 'chars' })
    const tl3 = gsap.timeline()
    tl3.pause()

    tl3
      .fromTo(
        menuItmTxtTop.chars,
        {
          autoAlpha: 0,
          translateY: '-80%',
          rotateX: -90,
        },
        {
          autoAlpha: 1,
          translateY: '0%',
          rotateX: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          stagger: 0.04,
          transformOrigin: 'bottom',
          force3D: true,
        },
      )
      .fromTo(
        menuItmTxtBtm.chars,
        {
          autoAlpha: 1,
          translateY: '0%',
          rotateX: 0,
        },
        {
          autoAlpha: 0,
          translateY: '80%',
          rotateX: -90,
          duration: 0.4,
          ease: 'power2.inOut',
          stagger: 0.04,
          transformOrigin: 'top',
          force3D: true,
        },
        '<',
      )
    if (ScrollTrigger.isTouch !== 1) {
      Navlink.addEventListener('pointerenter', () => {
        tl3.play()
      })
      Navlink.addEventListener('pointerleave', () => {
        tl3.reverse()
      })
    }
  })
})
</script>

<template>
  <div id="smooth-wrapper">
    <ThePreloader />

    <LazyTheAwwwards />

    <TheMenu />

    <LazyTheTransition />

    <LazyTheAlert
      v-if="alertMessage.isAlert === true"
      :header="alertMessage.header"
      :content="alertMessage.content"
      :color="alertMessage.color"
    />

    <div id="smooth-content">
      <div id="to-offset">
        <router-view v-slot="{ Component }">
          <Transition
            mode="out-in"
            :css="false"
            @before-leave="onBeforeLeave"
            @leave="onLeave"
            @enter="onEnter"
            @after-enter="onAfterEnter"
          >
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
