<script setup lang="ts">
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import InertiaPlugin from 'gsap/InertiaPlugin'
import ScrollSmoother from 'gsap/ScrollSmoother'
import ScrollTrigger from 'gsap/ScrollTrigger'
import lineInsta from '/assets/svgs/line-insta.svg?component'
import lineYtbe from '/assets/svgs/line-ytbe.svg?component'
import lineGit from '/assets/svgs/line-git.svg?component'
import lineMail from '/assets/svgs/line-mail.svg?component'

if (process.client)
  gsap.registerPlugin(Draggable, InertiaPlugin, ScrollSmoother, ScrollTrigger)

const { data: images } = await useFetch<ImageKit[]>('/api/imgkit', {
  transform: (images) => {
    const filter = images.filter(image => image.filePath.includes('navbar'))
    const arr: ImageKit[] = []
    while (arr.length < 2) {
      const r = filter[Math.floor(Math.random() * filter.length)]
      if (!arr.includes(r))
        arr.push(r)
    }
    return arr
  },
})

onMounted(() => {
  // gsap timelines
  const tl = [] as Array<gsap.core.Timeline>
  for (let i = 1; i < 5; i++) {
    tl[i] = gsap.timeline()
    tl[i].pause()
  }
  // animation logo insta
  const logoInsta = document.querySelector(
    '#logo-insta-nav',
  ) as HTMLAnchorElement
  const lens1 = document.querySelector('#lens1') as SVGPathElement
  const lens2 = document.querySelector('#lens2') as SVGPathElement
  const dot = document.querySelector('#dot') as SVGPathElement
  const textInsta = document.querySelector('#textInsta') as SVGPathElement
  const posinitInsta
    = 'M35 50.6666C30.405 50.6666 26.6667 54.405 26.6667 59C26.6667 63.595 30.405 67.3333 35 67.3333C39.595 67.3333 43.3333 63.595 43.3333 59C43.3333 54.405 39.595 50.6666 35 50.6666ZM35 54C37.7567 54 40 56.2433 40 59C40 61.7566 37.7567 64 35 64C32.2433 64 30 61.7566 30 59C30 56.2433 32.2433 54 35 54Z'
  const posmiddleInsta
    = 'M35 26.6666C30.405 26.6666 26.6667 30.405 26.6667 35C26.6667 39.595 30.405 43.3333 35 43.3333C39.595 43.3333 43.3333 39.595 43.3333 35C43.3333 30.405 39.595 26.6666 35 26.6666ZM35 30C37.7567 30 40 32.2433 40 35C40 37.7566 37.7567 40 35 40C32.2433 40 30 37.7566 30 35C30 32.2433 32.2433 30 35 30Z'
  const posfinalInsta
    = 'M35 2.66663C30.405 2.66663 26.6667 6.405 26.6667 11C26.6667 15.595 30.405 19.3333 35 19.3333C39.595 19.3333 43.3333 15.595 43.3333 11C43.3333 6.405 39.595 2.66663 35 2.66663ZM35 5.99996C37.7567 5.99996 40 8.2433 40 11C40 13.7566 37.7567 16 35 16C32.2433 16 30 13.7566 30 11C30 8.2433 32.2433 5.99996 35 5.99996Z'
  // animation logo ytube
  const logoYtbe = document.querySelector(
    '#logo-ytube-nav',
  ) as HTMLAnchorElement
  const playYtbe = document.querySelector('#playYtbe') as SVGPathElement
  const gAntenne = document.querySelector('#gAntenne') as SVGRectElement
  const pAntenne = document.querySelector('#pAntenne') as SVGRectElement
  const screenYtbe = document.querySelector('#screenYtbe') as SVGPathElement
  const carre1 = document.querySelector('#carre1') as SVGPathElement
  const carre2 = document.querySelector('#carre2') as SVGPathElement
  const textYtbe = document.querySelector('#textYtbe') as SVGPathElement
  const posmiddleYtbe
    = 'M42.2393 44.4263C41.6693 45.8888 40.5315 47.0244 38.8215 47.3494L24 44.75C29.51 44.75 36.3485 44.5862 37.6785 44.2612L37.6884 44.257C38.0651 44.096 38.4393 43.936 38.4393 43.6138C39.0093 42.1513 39.2 37.7625 39.2 35C39.2 32.2375 39.0085 27.8487 38.6285 26.3862L38.6263 26.3824C38.4371 26.0587 38.25 25.7388 37.8715 25.7388C36.3515 25.4138 29.51 25.25 24 25.25L38.8215 22.6506C40.5315 23.1381 41.8593 24.1112 42.2393 25.5737C42.9993 28.0112 43 35 43 35C43 35 42.9993 41.9888 42.2393 44.4263Z'
  // animation logo github
  const logoGit = document.querySelector('#logo-githb-nav') as HTMLAnchorElement
  const mainGit = document.querySelector('#mainGit')
  const moustRightTp = document.querySelector(
    '#moust_right_tp',
  ) as SVGPathElement
  const moustRightBt = document.querySelector(
    '#moust_right_bt',
  ) as SVGPathElement
  const moustLeftTp = document.querySelector('#moust_left_tp') as SVGPathElement
  const moustLeftBt = document.querySelector('#moust_left_bt') as SVGPathElement
  const eyeLeft = document.querySelector('#left_eye') as SVGPathElement
  const eyeRight = document.querySelector('#right_eye') as SVGPathElement
  const textGit = document.querySelector('#textGit') as SVGPathElement
  const finalMainGit
    = 'M31.3498 39.7438C30.1679 40.3612 29.2009 41.6693 28.6416 43.0899C27.6013 43.2536 26.4961 43.2963 25.7577 43.2963C24.2347 43.2963 23.851 43.0541 23.0358 41.9848C22.2957 40.8039 22.5 40.5 22 39.5C21.6838 38.8675 21 39 21 40C21 41.5 21.3298 43.7567 22 45C22.6037 46.1188 24.1444 46.6986 25.5445 46.6986C25.8941 46.6986 27.2857 46.6986 28.1163 46.6986V50.1964C28.1163 50.5938 28.1163 51.1822 28.1163 51.1822C28.1163 51.1822 31.6719 51.7986 33.8721 51.8217C36.2988 51.8472 40.0543 51.1907 40.0543 51.1907V50.1964V45.5338C40.0543 43.4651 38.6882 40.7194 36.8157 39.7421M31.3498 39.7438C24.5349 39.0429 21.2826 35.6525 21.2826 31.0496C21.2826 29.0679 22.1268 27.151 23.5611 25.5359C23.0904 23.9328 22.4986 20.6635 23.7419 19.4186C26.8082 19.4186 28.662 21.4071 29.1071 21.9443C30.6352 21.4207 32.3134 21.124 34.0768 21.124C35.8436 21.124 37.5285 21.4207 39.06 21.9477C39.5 21.4139 41.3555 19.4186 44.4287 19.4186C45.6771 20.6652 45.0785 23.9482 44.6026 25.5479C46.0284 27.1595 46.8675 29.0713 46.8675 31.0496C46.8675 35.6491 43.6203 39.0378 36.8157 39.7421M31.3498 39.7438C33.4285 39.9588 34.6278 39.9484 36.8157 39.7421'
  const finalMoustRightTp
    = 'M54.7209 32.9103C52.2754 32.6317 49.8388 32.3997 46.8745 32.3319'
  const finalMoustRightBt
    = 'M54.2318 36.0007C51.1463 35.0875 49.4642 34.8368 46.5349 34.3804'
  const finalMoustLeftTp
    = 'M13.2791 32.9149C15.8372 32.6355 18.386 32.4027 21.4869 32.3347'
  const finalMoustLeftBt
    = 'M13.7907 36.0154C17.0184 35.0993 18.7778 34.8478 21.8421 34.3899'
  const finalEyeLeft
    = 'M31.0853 31.4349C30.8155 32.9654 29.4688 34.0072 28.0774 33.7619C26.6861 33.5166 25.7769 32.077 26.0468 30.5465C26.3167 29.016 27.6633 27.9742 29.0547 28.2195C28.332 29.0445 28.539 30.0839 28.9003 30.7321C29.2128 31.2928 30.137 31.9027 31.0853 31.4349Z'
  const finalEyeRight
    = 'M42.3412 31.4349C42.0713 32.9654 40.7246 34.0072 39.3332 33.7619C37.9419 33.5166 37.0327 32.077 37.3026 30.5465C37.5725 29.016 38.9192 27.9742 40.3105 28.2195C39.5878 29.0445 39.7948 30.0839 40.1561 30.7321C40.4686 31.2928 41.3928 31.9027 42.3412 31.4349Z'
  // animation logo mail
  const logoMail = document.querySelector(
    '#logo-email-nav',
  ) as HTMLAnchorElement
  const enveloppe = document.querySelector('#enveloppe') as SVGPathElement
  const ouverture = document.querySelector('#ouverture') as SVGPathElement
  const backDoc = document.querySelector('#backDoc') as SVGPathElement
  const contourDoc = document.querySelector('#contourDoc') as SVGPathElement
  const textMail = document.querySelector('#textMail') as SVGPathElement
  const posmiddleEnveloppe
    = 'M19.9175 24.0009L34.6675 24.01L49.4175 24.0009C49.8031 23.9914 50.1866 24.0604 50.5447 24.2037C50.9029 24.3469 51.2282 24.5614 51.5009 24.8341C51.7736 25.1069 51.9881 25.4322 52.1314 25.7903C52.2746 26.1484 52.3436 26.5319 52.3342 26.9175V45.7509C52.3436 46.1364 52.2746 46.5199 52.1314 46.8781C51.9881 47.2362 51.7736 47.5615 51.5009 47.8342C51.2282 48.107 50.9029 48.3215 50.5447 48.4647C50.1866 48.6079 49.8031 48.6769 49.4175 48.6675H19.9175C19.5319 48.6769 19.1484 48.6079 18.7903 48.4647C18.4322 48.3215 18.1069 48.107 17.8341 47.8342C17.5614 47.5615 17.3469 47.2362 17.2037 46.8781C17.0604 46.5199 16.9914 46.1364 17.0009 45.7509V26.9175C16.9914 26.5319 17.0604 26.1484 17.2037 25.7903C17.3469 25.4322 17.5614 25.1069 17.8341 24.8341C18.1069 24.5614 18.4322 24.3469 18.7903 24.2037C19.1484 24.0604 19.5319 23.9914 19.9175 24.0009ZM20.3342 27.3342L34.6675 27.32L49.0009 27.3342L34.6675 36.2509L20.3342 27.3342ZM20.3342 45.3342H49.0009V31.35L34.6675 40L20.3342 31.35V45.3342Z'
  const posendEnveloppe
    = 'M19.9175 24.0009L34.6675 15.0009L49.5 24.0009C49.8856 24.2 50.1866 24.35 50.5447 24.55C50.9029 24.75 51 24.85 51.5009 25.15C51.7736 25.35 51.95 25.4322 52.17 25.7903C52.3132 26.1484 52.3436 26.5319 52.3342 26.9175V45.7509C52.3436 46.1364 52.2746 46.5199 52.1314 46.8781C51.9881 47.2362 51.7736 47.5615 51.5009 47.8342C51.2282 48.107 50.9029 48.3215 50.5447 48.4647C50.1866 48.6079 49.8031 48.6769 49.4175 48.6675H19.9175C19.5319 48.6769 19.1484 48.6079 18.7903 48.4647C18.4322 48.3215 18.1069 48.107 17.8341 47.8342C17.5614 47.5615 17.3469 47.2362 17.2037 46.8781C17.0604 46.5199 16.9914 46.1364 17.0009 45.7509V26.9175C17.03 26.5319 17.0067 26.3581 17.15 26C17.2932 25.6419 17.6 25.3728 18 25.1C18.4 24.85 18.4322 24.8 18.7903 24.6C19.1484 24.4 19.5319 24.2 19.9175 24.0009ZM20.3342 27.3342L34.6675 18.4L49.0009 27.3342L34.6675 36.2509L20.3342 27.3342ZM20.3342 45.3342H49.0009V31.35L34.6675 40L20.3342 31.35V45.3342Z'
  const posmiddle1Ouverture
    = 'M 20.35 27.35 L 34.68 36.27 L 49 27.35 V 31.35 L 34.68 40 L 20.35 31.35 V 27.35 Z'
  const posmiddle2Ouverture
    = 'M 20.35 24 L 34.68 24 L 49 24 V 27.33 L 34.68 27.33 L 20.35 27.33 V 24 Z'
  const posendOuverture
    = 'M 20.35 24 L 34.68 15 L 49 24 V 27.33 L 34.68 18.33 L 20.35 27.33 V 24 Z'
  const posendBackdoc = 'M 27.35 31.7 V 20.35 H 42 V 31.7 H 27.35 Z'
  const posendContour
    = 'M 24 31.7 V 17 H 45.35 V 31.7 H 42 V 20.35 H 27.35 V 31.7 H 24'
  const postinitOuverture
    = 'M 20.35 24.35 L 34.68 33.27 L 49 24.35 V 28.35 L 34.68 37 L 20.35 28.35 V 24.35 Z'

  if (ScrollTrigger.isTouch !== 1) {
    const logos = [logoInsta, logoYtbe, logoGit, logoMail]
    logos.forEach((logo, index) => {
      logo.addEventListener('pointerenter', () => tl[index + 1].restart())
      logo.addEventListener('pointerleave', () => tl[index + 1].reverse())
    })
  }

  tl[1]
    .set(lens1, {
      attr: {
        d: posmiddleInsta,
      },
    })
    .set(lens2, {
      attr: {
        d: posinitInsta,
      },
    })
    .to(dot, {
      duration: 0.3,
      scale: 0,
      transformOrigin: '50% 50%',
      ease: 'sine.inOut',
    })
    .to(
      lens1,
      {
        duration: 0.6,
        attr: {
          d: posfinalInsta,
        },
        ease: 'sin.out',
      },
      '<0.2',
    )
    .to(
      lens2,
      {
        duration: 0.6,
        attr: {
          d: posmiddleInsta,
        },
        ease: 'sin.in',
      },
      '<',
    )
    .to(
      dot,
      {
        duration: 0.3,
        scale: 1,
        transformOrigin: '50% 50%',
        ease: 'sine.inOut',
      },
      '<0.2',
    )
    .to(
      textInsta,
      {
        duration: 0.6,
        opacity: 1,
        ease: 'sine.inOut',
      },
      0,
    )

  tl[2]
    .to(playYtbe, {
      duration: 0.5,
      scale: 0,
      transformOrigin: '50% 50%',
      ease: 'sine.inOut',
    })
    .to(
      screenYtbe,
      {
        duration: 0.5,
        attr: {
          d: posmiddleYtbe,
        },
        ease: 'sine.inOut',
      },
      '<',
    )
    .to(
      carre1,
      {
        duration: 0.5,
        attr: {
          d: 'M 50 28 H 45 V 32 H 50 V 28 Z',
        },
        ease: 'sine.inOut',
      },
      '<',
    )
    .to(
      carre2,
      {
        duration: 0.5,
        attr: {
          d: 'M 50 35 H 45 V 39 H 50 V 35 Z',
        },
        ease: 'sine.inOut',
      },
      '<',
    )
    .to(
      gAntenne,
      {
        duration: 1.2,
        attr: {
          x: '32',
          y: '23',
          height: '3',
          transform: 'rotate(-42.3023 32 23.0956)',
        },
        ease: 'elastic.out(1, 0.2)',
      },
      '<0.2',
    )
    .to(
      pAntenne,
      {
        duration: 1.2,
        attr: {
          x: '27',
          y: '16',
          height: '3',
          transform: 'rotate(48.3249 27.2408 16)',
        },
        ease: 'elastic.out(1, 0.2)',
      },
      '<',
    )
    .to(
      textYtbe,
      {
        duration: 0.6,
        opacity: 1,
        ease: 'sine.inOut',
      },
      0,
    )

  tl[3]
    .to(mainGit, {
      duration: 0.6,
      attr: {
        d: finalMainGit,
      },
      ease: 'sine.inOut',
    })
    .to(
      eyeLeft,
      {
        opacity: 1.2,
        attr: {
          d: finalEyeLeft,
        },
        duration: 0.5,
        ease: 'power3.inOut',
      },
      '<',
    )
    .to(
      eyeRight,
      {
        opacity: 1.2,
        attr: {
          d: finalEyeRight,
        },
        duration: 0.5,
        ease: 'power3.inOut',
      },
      '<',
    )
    .to(
      moustLeftBt,
      {
        attr: {
          d: finalMoustLeftBt,
        },
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
      },
      '<',
    )
    .to(
      moustLeftTp,
      {
        attr: {
          d: finalMoustLeftTp,
        },
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
      },
      '<',
    )
    .to(
      moustRightBt,
      {
        attr: {
          d: finalMoustRightBt,
        },
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
      },
      '<',
    )
    .to(
      moustRightTp,
      {
        attr: {
          d: finalMoustRightTp,
        },
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
      },
      '<',
    )
    .to(
      textGit,
      {
        duration: 0.6,
        opacity: 1,
        ease: 'sine.inOut',
      },
      0,
    )

  tl[4]
    .set(ouverture, {
      attr: {
        d: postinitOuverture,
      },
    })
    .to(
      enveloppe,
      {
        duration: 0.15,
        attr: {
          d: posmiddleEnveloppe,
        },
        ease: 'none',
      },
      '<',
    )
    .to(
      ouverture,
      {
        duration: 0.15,
        attr: {
          d: posmiddle1Ouverture,
        },
        ease: 'none',
      },
      '<',
    )
    .to(
      ouverture,
      {
        duration: 0.15,
        attr: {
          d: posmiddle2Ouverture,
        },
        ease: 'none',
      },
      '<0.15',
    )
    .to(
      enveloppe,
      {
        duration: 0.225,
        attr: {
          d: posendEnveloppe,
        },
        ease: 'none',
      },
      '<0.15',
    )
    .to(
      ouverture,
      {
        duration: 0.225,
        attr: {
          d: posendOuverture,
        },
        ease: 'none',
      },
      '<',
    )
    .to(
      backDoc,
      {
        duration: 0.2,
        attr: {
          d: posendBackdoc,
        },
        ease: 'back.out(4)',
      },
      '<0.1',
    )
    .to(
      contourDoc,
      {
        duration: 0.2,
        attr: {
          d: posendContour,
        },
        ease: 'back.out(4)',
      },
      '<',
    )
    .to(
      textMail,
      {
        duration: 0.6,
        opacity: 1,
        ease: 'sine.inOut',
      },
      0,
    )

  // Draggable images

  const clampSkew = gsap.utils.clamp(-6, 6)
  const AllImg = document.querySelectorAll<HTMLImageElement>('.img-drag')
  const Cursor = document.querySelector<HTMLDivElement>('#cursor')
  class DraggableImg {
    constructor(Image: HTMLImageElement) {
      const proxy = document.createElement('div')
      const tracker = InertiaPlugin.track(proxy, 'x,y')[0]
      const skewxTo = gsap.quickTo(Image, 'skewX')
      const skewyTo = gsap.quickTo(Image, 'skewY')
      const xTo = gsap.quickTo(Image, 'x', {
        duration: 0.3,
      })
      const yTo = gsap.quickTo(Image, 'y', {
        duration: 0.3,
      })
      const drag = Draggable.create(proxy, {
        type: 'x,y',
        trigger: Image,
        bounds: '#content__drag-area',
        edgeResistance: 0.6,
        cursor: 'grab',
        activeCursor: 'grabbing',
        zIndexBoost: false,
        inertia: true,
        onPressInit() {
          // in case the user clicks while it's in the middle of animating, make the proxy jump to the Image position.
          gsap.set(proxy, {
            x: gsap.getProperty(Image, 'x'),
            y: gsap.getProperty(Image, 'y'),
          })
          xTo.tween.pause()
          yTo.tween.pause()
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          gsap.ticker.add(updateSkew)
          // make the proxy sit right on top and add it to the DOM so that bounds work
          gsap.set(proxy, {
            width: Image.offsetWidth,
            height: Image.offsetHeight,
            position: 'absolute',
            pointerEvents: 'none',
            top: Image.offsetTop,
            left: Image.offsetLeft,
          })
        },
        onDrag() {
          xTo(drag.x)
          yTo(drag.y)
        },
        onDragStart() {
          gsap
            .timeline()
            .set(AllImg, {
              zIndex: 1,
            })
            .set(Image, {
              zIndex: 2,
            })
            .set(Cursor, {
              autoAlpha: 0,
              backgroundColor: 'transparent',
            })
        },
        onDragEnd() {
          gsap.set(Cursor, {
            autoAlpha: 1,
          })
        },
        onThrowUpdate() {
          xTo(drag.x)
          yTo(drag.y)
          gsap.set(Cursor, {
            backgroundColor: 'transparent',
          })
        },
      })[0]
      const updateSkew = () => {
        const vx = tracker.get('x')
        const vy = tracker.get('y')
        skewxTo(clampSkew(vx / -50))
        skewyTo(clampSkew(vy / -50))
        !vx && !vy && !drag.isPressed && gsap.ticker.remove(updateSkew)
      }

      Image.parentNode?.append(proxy)
      Image.addEventListener('mouseenter', () => {
        gsap.to(Cursor, {
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        })
      })
      Image.addEventListener('mouseleave', () => {
        gsap.to(Cursor, {
          opacity: 1,
          backgroundColor: '#CDC3C35A',
          duration: 1,
          ease: 'power2.out',
        })
      })
    }
  }
  AllImg.forEach(draggableEl => new DraggableImg(draggableEl))
})
</script>

<template>
  <div>
    <TheCursor />

    <TheHeader />

    <div
      id="navbar"
      class="baron fixed z-10 hidden h-full min-h-[320px] w-screen min-w-[320px] items-center bg-white text-[2rem] transition-bg-color duration-500 ease-classic dark:bg-jet sm:lt:text-[6vw] lg:lt:text-[calc(6px_*_992_/_100)]"
    >
      <div
        id="content__drag-area"
        class="flex h-full items-center justify-center"
      >
        <div class="flex items-center justify-center">
          <nuxt-img
            v-for="(image, k) in images" :key="k"
            class="img-drag"
            width="600"
            height="750"
            :src="image.filePath"
          />
        </div>
        <ul class="absolute grid">
          <TheMenuLink to="/" title="accueil" />
          <TheMenuLink to="/gallery" title="galerie" />
          <TheMenuLink to="/about" title="à&#160;propos" />
        </ul>
        <div
          id="navfoot"
          class="absolute bottom-0 mb-1 flex h-[10vh] min-h-[60px] w-full justify-center md:lt:min-h-[70px]"
        >
          <div
            id="container_icons"
            class="grid w-1/2 grid-cols-[repeat(4,_55px)] items-center justify-center gap-[10px] md:grid-cols-[repeat(4,_70px)] md:gap-[30px]"
          >
            <NuxtLink
              id="logo-insta-nav"
              to="https://www.instagram.com/benjamin_oddou/"
              class="fixed-el h-[55px] w-[55px] md:lt:h-[70px] md:lt:w-[70px]"
              aria-label="Lien vers mon compte Instagram"
              target="_blank"
              no-rel
            >
              <lineInsta class="fill-jet dark:fill-white" />
            </NuxtLink>
            <NuxtLink
              id="logo-ytube-nav"
              to="https://youtube.com/@benjaminoddou"
              class="fixed-el h-[55px] w-[55px] md:lt:h-[70px] md:lt:w-[70px]"
              aria-label="Lien vers ma chaine YouTube"
              target="_blank"
              no-rel
            >
              <lineYtbe class="fill-jet dark:fill-white" />
            </NuxtLink>
            <NuxtLink
              id="logo-githb-nav"
              to="https://github.com/BenjaminOddou/portfolio"
              class="fixed-el h-[55px] w-[55px] md:lt:h-[70px] md:lt:w-[70px]"
              aria-label="Lien vers le répertoire GitHub"
              target="_blank"
              no-rel
            >
              <lineGit class="fill-jet stroke-jet dark:fill-white dark:stroke-white" />
            </NuxtLink>
            <NuxtLink
              id="logo-email-nav"
              to="mailto:benjaminoddou@hotmail.fr"
              class="fixed-el h-[55px] w-[55px] md:lt:h-[70px] md:lt:w-[70px]"
              aria-label="Lien vers mon Mail"
            >
              <lineMail class="fill-jet dark:fill-white" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.img-drag:nth-child(1) {
  margin: 0 0 30vh 0;
}

.img-drag:nth-child(2) {
  margin: 30vh 0 0 40vw;
}

@media (max-width: 575px) and (min-height: 576px) {
  .img-drag:nth-child(1) {
    margin: 0 0 50vh 0;
  }

  .img-drag:nth-child(2) {
    margin: 45vh 0 0 20vw;
  }
}

@media (max-width: 399px) {
  .img-drag:nth-child(1) {
    margin: 0 0 55vh 0;
  }

  .img-drag:nth-child(2) {
    margin: 50vh 0 0 15vw;
  }
}
</style>
