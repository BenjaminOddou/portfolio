<script setup lang="ts">
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(SplitText, DrawSVGPlugin, ScrollTrigger)
}

const isRoute = routeStore()

definePageMeta({
  title: 'À Propos',
  url: 'https://www.benjaminoddou-photographe.com/about',
  description:
    'Benjamin Oddou est un photographe autodidacte et passionné proposant des prestations photo de mariage et de portrait.'
})

useHead({
  title: 'À Propos'
})

onMounted(() => {
  // Disable warnings
  console.warn = () => {}

  // Hello section
  const aboutLinesChild = new SplitText('#about_block', {
    type: 'lines'
  })
  const aboutLinesParent = new SplitText('#about_block', {
    type: 'lines',
    linesClass: 'overflow-hidden'
  })
  const ellipseBigCircle = document.querySelector('#big-circle > ellipse')
  const pathBigLine = document.querySelector('#big-line > path')
  const tl1 = gsap.timeline()
  tl1.pause()
  isRoute.$subscribe(() => {
    tl1.play()
  })

  tl1
    .fromTo(
      '#hello',
      {
        y: '100%'
      },
      {
        y: '0%',
        duration: 1,
        ease: 'power4.out'
      }
    )
    .fromTo(
      '#star-sticky',
      {
        scale: 0,
        rotateZ: 45
      },
      {
        scale: 1,
        rotateZ: 0,
        duration: 1.5,
        ease: 'power4.out'
      },
      '<+0.3'
    )
    .fromTo(
      aboutLinesChild.lines,
      {
        y: '100%'
      },
      {
        y: '0%',
        stagger: 0.04,
        duration: 1,
        ease: 'power4.out'
      },
      '<'
    )
    .fromTo(
      ellipseBigCircle,
      {
        drawSVG: '0% 0%'
      },
      {
        onStart: () => {
          gsap.set(ellipseBigCircle, { autoAlpha: 1 })
        },
        drawSVG: '20% 38%',
        duration: 1.5
      },
      '<+0.4'
    )
    .to(
      ellipseBigCircle,
      {
        drawSVG: '80% 98%',
        duration: 2
      },
      '>-0.8'
    )
    .to(
      ellipseBigCircle,
      {
        drawSVG: '100% 100%',
        duration: 0.4,
        onComplete: () => {
          gsap.set(ellipseBigCircle, {
            autoAlpha: 0
          })
        }
      },
      '>-0.4'
    )

  window.addEventListener('resize', () => {
    aboutLinesParent.revert()
    aboutLinesChild.revert()
  })

  gsap.fromTo(
    '#star-sticky',
    {
      rotateZ: 0
    },
    {
      rotateZ: 360 * 2,
      ease: 'none',
      scrollTrigger: {
        trigger: '#star-container',
        pin: true,
        anticipatePin: 1,
        pinSpacing: false,
        scrub: true,
        toggleActions: 'play none none reverse'
      }
    }
  )

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#section-about',
        start: 'top 0%',
        end: '=+100%',
        scrub: true,
        toggleActions: 'play none none reverse'
      }
    })
    .fromTo(
      pathBigLine,
      {
        drawSVG: '-10% -10%'
      },
      {
        drawSVG: '25% 50%'
      }
    )
    .to(pathBigLine, {
      drawSVG: '50% 75%'
    })
    .to(pathBigLine, {
      drawSVG: '75% 100%'
    })
    .to(pathBigLine, {
      drawSVG: '100% 100%'
    })

  // Caracteristics section
  const aboutblockTextChild = new SplitText('#description span', {
    type: 'lines'
  })
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const aboutblockTextParent = new SplitText('#description span', {
    type: 'lines',
    linesClass: 'overflow-hidden'
  })
  const mm = gsap.matchMedia()
  const skewSetter = gsap.quickTo('#grained', 'skewY')
  const clamp = gsap.utils.clamp(-6, 6)
  let descriptionAnima: GSAPTween

  gsap.set('#grained', {
    transformOrigin: 'center center',
    force3D: true
  })

  gsap.fromTo(
    '#caracteristics',
    { y: '100%' },
    {
      y: '0%',
      duration: 0.8,
      ease: 'power4.out',
      onComplete: () => {
        descriptionAnima.play()
      },
      scrollTrigger: {
        trigger: '#caracteristics',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    }
  )

  mm.add(
    { isMobile: '(max-width: 766px)', isDesktop: '(min-width: 767px)' },
    (context) => {
      const { isMobile, isDesktop } = context.conditions
      descriptionAnima = gsap.from(aboutblockTextChild.lines, {
        y: '100%',
        delay: isMobile ? 0 : 0.3,
        duration: 1,
        stagger: 0.04,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: isMobile ? '#description' : '#caracteristics',
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      })
      if (isDesktop) {
        gsap.fromTo(
          '#grained',
          {
            y: '40%'
          },
          {
            y: '-20%',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#description',
              start: 'top 70%',
              scrub: true,
              onUpdate: (self) => skewSetter(clamp(self.getVelocity() / -300)),
              onLeave: () => {
                skewSetter(0)
              }
            }
          }
        )
      }
    }
  )

  // FAQ section
  const faqdiv = document.querySelectorAll<HTMLDivElement>(
    '#container-FAQ > div'
  )
  const allTimelines: Array<GSAPTimeline> = []
  const seeAll = document.querySelector<HTMLButtonElement>('#see-all > button')
  const seeAllSVG = seeAll.querySelector<SVGElement>('svg')
  const seeAllTitles = document.querySelectorAll<HTMLDivElement>(
    '#see-all-titles > div'
  )
  const tl2 = gsap.timeline()
  tl2.reverse()
  tl2
    .fromTo(
      seeAllTitles[0],
      { y: '0%' },
      {
        y: '-100%',
        duration: 0.9,
        ease: 'power2.out'
      }
    )
    .fromTo(
      seeAllTitles[1],
      { y: '100%' },
      {
        y: '0%',
        duration: 0.9,
        ease: 'power2.out'
      },
      '<'
    )
    .fromTo(
      seeAllSVG,
      {
        rotateZ: 0
      },
      {
        rotateZ: -180,
        duration: 0.8,
        ease: 'power2.inOut'
      },
      '<'
    )

  gsap.fromTo(
    '#FAQ-title',
    { y: '100%' },
    {
      y: '0%',
      duration: 0.8,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '#FAQ-title',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    }
  )

  faqdiv.forEach((element) => {
    gsap.from(element, {
      y: 20,
      autoAlpha: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
    if (element.classList.contains('question')) {
      const btn = element.querySelector<HTMLButtonElement>('button')
      const svg = element.querySelector<SVGElement>('svg')
      const div = element.querySelector<HTMLDivElement>('.FAQ-p-container')
      const tl = gsap.timeline({
        onComplete: () => {
          ScrollTrigger.refresh()
        },
        onReverseComplete: () => {
          ScrollTrigger.refresh()
        }
      })
      tl.reverse()
      allTimelines.push(tl)
      tl.fromTo(
        svg,
        {
          rotateZ: 0
        },
        {
          rotateZ: -180,
          duration: 0.8,
          ease: 'power2.inOut'
        }
      )
        .fromTo(
          div,
          { height: 0 },
          {
            height: 'auto',
            duration: 0.6,
            ease: 'power2.out'
          },
          '<'
        )
        .from(
          div,
          {
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power2.out'
          },
          '<+0.2'
        )

      btn.addEventListener('click', () => {
        if (tl.reversed()) {
          tl.play()
        } else {
          tl.reverse()
        }
      })
    }
  })

  seeAll.addEventListener('click', () => {
    seeAll.classList.toggle('active')
    if (!seeAll.classList.contains('active')) {
      tl2.reverse()
      allTimelines.forEach((tl) => {
        tl.reverse()
      })
    } else {
      tl2.play()
      allTimelines.forEach((tl) => {
        tl.play()
      })
    }
  })
})
</script>

<template>
  <div>
    <svg
      id="big-circle"
      class="absolute right-0 top-0 z-0 w-full fill-transparent stroke-light-lavender stroke-[8px] dark:stroke-light-orange lg:w-4/5"
      stroke-linecap="round"
      viewBox="0 0 240 240"
    >
      <ellipse
        vector-effect="non-scaling-stroke"
        cx="240"
        cy="0"
        rx="120"
        ry="120"
      />
    </svg>

    <div
      id="section-about"
      class="relative mx-auto max-w-[2500px] px-6 pt-56 pb-[calc(8rem_+_10vh)] sm:px-[10%]"
    >
      <svg
        id="big-line"
        class="absolute top-1/3 -left-3 z-0 h-4/5 w-11/12 fill-transparent stroke-light-lavender stroke-[8px] dark:stroke-light-orange lg:w-4/6"
        stroke-linecap="round"
        viewBox="0 0 520 425"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          vector-effect="non-scaling-stroke"
          d="M0 81.0296C52.6424 49.7372 128.544 30.88 188.413 20.0104C272.045 4.82638 398.026 -10.6194 470.821 37.4142C492.171 51.5025 511.647 88.4415 514.664 109.589C518.058 133.378 495.16 174.08 470.821 191.633C440.483 213.513 405.641 231.278 388.065 261.777C366.503 299.191 361.191 335.896 361.902 376.179C362.163 390.982 361.902 411.084 364.43 429"
        />
      </svg>
      <div
        class="baron z-0 mb-12 overflow-hidden text-[calc(2rem_+_3vw)] text-dark-lavender dark:text-dark-orange"
      >
        <div id="hello">hello,</div>
      </div>
      <div id="container-about" class="grid grid-cols-[calc(1rem_+_2vw)_95%]">
        <div
          id="star-container"
          class="mt-[0.8vw] h-[calc(100%_-_2rem_-_4vw)] pt-5"
        >
          <div
            id="star-sticky"
            class="text-dark-lavender dark:text-dark-orange"
          >
            <svg
              class="h-[calc(1rem_+_2vw)] w-[calc(1rem_+_2vw)] fill-current"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.176 12.536C3.824 12.664 3.424 12.584 2.976 12.296C2.56 12.008 2.352 11.672 2.352 11.288C2.352 10.904 2.416 10.632 2.544 10.472C2.704 10.312 2.992 10.136 3.408 9.944C3.952 9.624 4.432 9.304 4.848 8.984C5.296 8.632 5.776 8.104 6.288 7.4C5.52 7.016 4.864 6.776 4.32 6.68C3.776 6.552 3.2 6.472 2.592 6.44C2.144 6.408 1.808 6.36 1.584 6.296C1.392 6.2 1.232 6.008 1.104 5.72C1.008 5.528 0.96 5.336 0.96 5.144C0.96 4.792 1.072 4.472 1.296 4.184C1.552 3.896 1.84 3.752 2.16 3.752C2.48 3.752 2.72 3.816 2.88 3.944C3.04 4.04 3.232 4.248 3.456 4.568C3.84 5.048 4.224 5.464 4.608 5.816C5.024 6.168 5.6 6.568 6.336 7.016C6.304 6.088 6.224 5.368 6.096 4.856C5.968 4.312 5.776 3.704 5.52 3.032C5.328 2.52 5.232 2.184 5.232 2.024C5.232 1.832 5.28 1.64 5.376 1.448C5.568 1.096 5.968 0.919998 6.576 0.919998C7.152 0.919998 7.552 1.08 7.776 1.4C7.872 1.592 7.92 1.768 7.92 1.928C7.92 2.152 7.808 2.52 7.584 3.032C7.296 3.704 7.072 4.328 6.912 4.904C6.784 5.448 6.704 6.168 6.672 7.064C7.376 6.712 7.952 6.36 8.4 6.008C8.848 5.624 9.296 5.16 9.744 4.616C10.032 4.264 10.272 4.008 10.464 3.848C10.688 3.656 10.928 3.56 11.184 3.56C11.504 3.528 11.808 3.672 12.096 3.992C12.384 4.28 12.528 4.6 12.528 4.952C12.528 5.176 12.448 5.368 12.288 5.528C12.128 5.688 11.888 5.816 11.568 5.912C11.28 6.008 10.96 6.088 10.608 6.152C9.872 6.248 9.232 6.376 8.688 6.536C8.144 6.696 7.52 6.984 6.816 7.4C7.872 8.52 8.96 9.304 10.08 9.752C10.432 9.88 10.688 10.008 10.848 10.136C11.008 10.264 11.136 10.456 11.232 10.712C11.328 10.968 11.28 11.256 11.088 11.576C10.928 11.896 10.688 12.152 10.368 12.344C10.048 12.536 9.76 12.568 9.504 12.44C9.248 12.344 9.072 12.216 8.976 12.056C8.88 11.864 8.752 11.56 8.592 11.144C8.432 10.6 8.208 10.056 7.92 9.512C7.632 8.968 7.168 8.344 6.528 7.64C6.048 8.344 5.712 8.968 5.52 9.512C5.328 10.024 5.184 10.568 5.088 11.144C5.024 11.592 4.944 11.912 4.848 12.104C4.752 12.296 4.528 12.44 4.176 12.536Z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="z-[1] pt-5 pl-4 text-[calc(1rem_+_2vw)] font-light italic">
          <span id="about_block" class="block"
            >moi c'est Benjamin ! Mon histoire avec la photographie remonte à
            mon enfance, lors de voyages et de colonies de vacances. J'avais
            plaisir à capturer et partager mes aventures et mes souvenirs au
            travers de mes photos. C'est en 2018, lors d'un voyage en Suède, que
            j’ai ressenti le besoin de m'investir et de me former. Avec de la
            pratique et beaucoup de passion, j’ai fait évoluer mon style
            photographique. Aujourd’hui j’ai envie de passer une autre étape en
            vous partageant mes photographies et en mettant mon savoir-faire et
            mon expérience à votre service.
          </span>
        </div>
      </div>
    </div>

    <div
      class="relative z-[1] mx-auto max-w-[2500px] bg-white px-[10%] pb-[calc(2rem_+_10vh)] transition-bg-color duration-500 ease-classic dark:bg-jet"
    >
      <div
        class="baron mb-12 overflow-hidden text-[8.5vw] md:text-[calc(2rem_+_3vw)]"
      >
        <div id="caracteristics">caractéristiques</div>
      </div>
      <div class="flex flex-wrap-reverse md:grid md:grid-cols-[52%_5%_43%]">
        <div
          id="description"
          class="grid content-start gap-[3rem] pt-14 text-[calc(1rem_+_1vw)] font-extralight md:pt-0 md:text-[calc(0.8rem_+_1vw)] lg:gap-[6rem]"
        >
          <div class="grid items-start">
            <span
              >Surnom : Benjam 😄
              <br />
              Amoureux de la nature 🌍
              <br />
              Fan de technologie 🤖
              <br />
              Formation d'ingénieur 🎓
              <br />
              Habite à Paris 🏠
              <br />
              "Les détails font la perfection, et la perfection n'est pas un
              détail." Léonard De Vinci 👁️</span
            >
          </div>
          <span
            >Curieux de nature, j'aime apprendre et me fixer de nouveaux défis à
            relever. Si vous avez un projet photo ou toute autre suggestion à me
            soumettre, n'hésitez pas à me contacter via le formulaire
            ci-dessous.
          </span>
        </div>
        <div class="hidden md:block"></div>
        <div
          id="grained"
          class="relative z-[2] h-0 overflow-hidden pb-[calc(100%_/_(2_/_3))]"
        >
          <nuxt-img
            src="/about-page/self-portrait-910w.webp"
            width="910"
            height="1365"
            alt="Portrait de Benjamin - Saint-Mesmin (France, 2019)"
          />
        </div>
      </div>
    </div>

    <div id="FAQ-section" class="mx-auto max-w-[2500px] px-[10%]">
      <div
        class="baron mb-12 overflow-hidden text-[8.5vw] md:text-[calc(2rem_+_3vw)]"
      >
        <div id="FAQ-title">faq</div>
      </div>
      <div id="container-FAQ" class="m-auto grid w-full md:w-4/5">
        <div
          id="see-all"
          class="grid grid-cols-1 justify-start border-b border-b-current pt-8"
        >
          <button
            class="grid w-full grid-cols-[92%_8%] pb-8 text-start md:grid-cols-[95%_5%]"
          >
            <div id="see-all-titles" class="relative h-full overflow-hidden">
              <div class="absolute text-lg font-semibold">TOUT DÉVELOPPER</div>
              <div
                class="absolute translate-y-full transform text-lg font-semibold"
              >
                TOUT RÉDUIRE
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-5 w-5 place-self-center stroke-current stroke-2"
            >
              <path
                stroke-linecap="square"
                stroke-linejoin="round"
                d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        <FAQquestion
          question="Quelles sont tes prestations ?"
          :response="[
            `Pour le
        moment, mes prestations sont les suivantes : mariages, évènements
        (baptêmes, naissances, anniversaires, soirées...), photos corporate
        (portraits d'employés, images pour les réseaux sociaux...), séances
        portrait en solo ou en couple. Si vous avez d'autres idées, n'hésitez
        pas à m'envoyer votre demande via le formulaire ci-dessous en mettant en
        objet 'Autres'.`
          ]"
        />
        <FAQquestion
          question="Quels sont les tarifs ?"
          :response="[
            `les tarifs de mes prestations sont uniquement délivrés sur demande. en fonction de votre projet, de vos demandes et attentes, je m'adapterais pour vous proposer le tarif le plus adapté !`
          ]"
        />
        <FAQquestion
          question="Peut-on acheter les photos de ton site ?"
          :response="[
            `Pour le moment, je ne vends pas mes photos personnelles. En fonction
            du nombre de demandes, je pourrais envisager d'en vendre certaines
            (des paysages principalement).`,
            `NB: Bien que des photos prises lors de prestations soient affichées
            sur le site, aucune d'entre elles ne seront revendues.`
          ]"
        />
        <FAQquestion
          question="Comment as tu appris la photo ?"
          :response="[
            `Je me suis formé exclusivement en autodidacte. La photographie peut
            sembler technique au premier abord, mais la progression est assez
            rapide ! Mon conseil est finalement assez classique, faire des
            photos tout en ayant un œil critique sur celles-ci. Demander des
            avis extérieurs constructifs est aussi très bénéfique pour prendre
            du recul et progresser.`
          ]"
        />
        <FAQquestion
          question="Comment as-tu réalisé ce (magnifique) site ?"
          :response="[
            `Je me suis lancé le défi de créer et coder mon propre site
        web. J'ai travaillé et finalement réussi à sortir une première version
        du site en Avril 2022.`,
            `&#160;`,
            `Afin de continuer à faire grandir le
        site, j'ai totalement repris sa conception pour sortir une
        version 2.0 en Octobre 2022. Dans le même temps et pour les mêmes raisons, j'ai décidé de rendre le code source publique (à retrouver sur GitHub)`,
            `&#160;`,
            `Les technologies utilisées :`,
            `- Design : Figma, Photoshop.`,
            `-
        Technologies : Nuxt 3 (Vue JS), CSS (Tailwind CSS).`,
            `- Librairies JS :
        GSAP, PhotoSwipe.`,
            `- Gestion de formulaire : Formspark, Botpoison.`,
            `- Développement et mise en production : Visual Studio Code, GitHub,
        Netlify.`
          ]"
        />
      </div>
    </div>

    <TheForm />
  </div>
</template>

<style scoped>
#grained::after {
  content: '';
  height: 500%;
  width: 500%;
  top: 0;
  left: 0;
  position: absolute;
  display: block;
  z-index: 2;
  animation: noise 8s steps(10) infinite;
  opacity: 0.15;
  background: url('https://ik.imagekit.io/palladium/about-page/Image_gaussian_noise.jpg');
}

@keyframes noise {
  0%,
  100% {
    background-position: 0 0;
  }
  10% {
    background-position: -5% -10%;
  }
  20% {
    background-position: -15% 5%;
  }
  30% {
    background-position: 7% -25%;
  }
  40% {
    background-position: 20% 25%;
  }
  50% {
    background-position: -25% 10%;
  }
  60% {
    background-position: 15% 5%;
  }
  70% {
    background-position: 0% 15%;
  }
  80% {
    background-position: 25% 35%;
  }
  90% {
    background-position: -10% 10%;
  }
}
</style>
