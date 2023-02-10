<script setup lang="ts">
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'

if (process.client)
  gsap.registerPlugin(SplitText, DrawSVGPlugin, ScrollTrigger)

const isRoute = routeStore()

definePageMeta({
  title: 'À Propos',
  url: 'https://www.benjaminoddou-photographe.com/about',
  description:
    'Benjamin Oddou est un photographe autodidacte et passionné proposant des prestations photo de mariage et de portrait.',
})

useHead({
  title: 'À Propos',
})

onMounted(async () => {
  await delay(100)
  // Disable warnings
  console.warn = () => {}

  // Hello section
  const aboutLinesChild = new SplitText('#about_block', {
    type: 'lines',
  })
  const aboutLinesParent = new SplitText('#about_block', {
    type: 'lines',
    linesClass: 'overflow-hidden',
  })
  const ellipseBigCircle = document.querySelector(
    '#big-circle ellipse',
  ) as SVGEllipseElement
  const pathBigLine = document.querySelector(
    '#big-line path',
  ) as SVGPathElement
  const tl1 = gsap.timeline()
  tl1.pause()
  isRoute.$subscribe(() => {
    tl1.play()
  })

  tl1
    .from(
      '#hello',
      {
        yPercent: 100,
        duration: 1,
        ease: 'power4.out',
      },
    )
    .from(
      '#star-sticky',
      {
        scale: 0,
        rotateZ: 45,
        duration: 1.5,
        ease: 'power4.out',
      },
      '<+0.3',
    )
    .from(
      aboutLinesChild.lines,
      {
        yPercent: 100,
        stagger: 0.04,
        duration: 1,
        ease: 'power4.out',
      },
      '<',
    )
    .fromTo(
      ellipseBigCircle,
      {
        drawSVG: '0% 0%',
      },
      {
        drawSVG: '20% 38%',
        duration: 1.5,
      },
      '<+0.4',
    )
    .to(
      ellipseBigCircle,
      {
        drawSVG: '80% 98%',
        duration: 2,
      },
      '>-0.8',
    )
    .to(
      ellipseBigCircle,
      {
        drawSVG: '100% 100%',
        duration: 0.4,
      },
      '>-0.4',
    )

  window.addEventListener('resize', () => {
    aboutLinesParent.revert()
    aboutLinesChild.revert()
  })

  gsap.to(
    '#star-sticky',
    {
      rotateZ: 360 * 2,
      ease: 'none',
      scrollTrigger: {
        trigger: '#star-container',
        pin: true,
        anticipatePin: 1,
        pinSpacing: false,
        scrub: true,
        toggleActions: 'play none none reverse',
      },
    },
  )

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#section-about',
        start: 'top 0%',
        end: '=+100%',
        scrub: true,
        toggleActions: 'play none none reverse',
      },
    })
    .fromTo(
      pathBigLine,
      {
        drawSVG: '-10% -10%',
      },
      {
        drawSVG: '40% 65%',
      },
    )
    .to(pathBigLine, {
      drawSVG: '100% 100%',
    })

  // Caracteristics section
  const aboutblockTextChild = new SplitText('#description span', {
    type: 'lines',
  })
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const aboutblockTextParent = new SplitText('#description span', {
    type: 'lines',
    linesClass: 'overflow-hidden',
  })
  const mm = gsap.matchMedia()
  const skewSetter = gsap.quickTo('#grained', 'skewY')
  const clamp = gsap.utils.clamp(-6, 6)

  gsap.set('#grained', {
    transformOrigin: 'center center',
    force3D: true,
  })

  const descriptionAnima = gsap.from(aboutblockTextChild.lines, {
    yPercent: 100,
    delay: 0.3,
    duration: 1,
    stagger: 0.04,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '#description',
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  })

  gsap.from(
    '#caracteristics',
    {
      yPercent: 100,
      duration: 0.8,
      ease: 'power4.out',
      onComplete: () => {
        descriptionAnima.play()
      },
      scrollTrigger: {
        trigger: '#caracteristics',
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    },
  )

  mm.add('(min-width: 767px)', () => {
    gsap.fromTo(
      '#grained',
      {
        yPercent: 40,
      },
      {
        yPercent: -20,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#description',
          start: 'top 70%',
          scrub: true,
          onUpdate: self => skewSetter(clamp(self.getVelocity() / -300)),
          onLeave: () => {
            skewSetter(0)
          },
        },
      },
    )
  })

  // FAQ section
  const faqdiv = document.querySelectorAll(
    '#container-FAQ > div',
  ) as NodeListOf<HTMLDivElement>
  const allTimelines = [] as Array<GSAPTimeline>
  const seeAll = document.querySelector(
    '#see-all > button',
  ) as HTMLButtonElement
  const seeAllSVG = seeAll.querySelector('svg') as SVGElement
  const seeAllTitles = document.querySelectorAll(
    '#see-all-titles > div',
  ) as NodeListOf<HTMLDivElement>
  const tl2 = gsap.timeline()
  tl2.pause()
  tl2
    .from(
      seeAllTitles[1],
      {
        yPercent: 100,
        duration: 0.9,
        ease: 'power2.out',
      },
    )
    .to(
      seeAllTitles[0],
      {
        yPercent: -100,
        duration: 0.9,
        ease: 'power2.out',
      },
      0,
    )
    .to(
      seeAllSVG,
      {
        rotateZ: -180,
        duration: 0.8,
        ease: 'power2.inOut',
      },
      0,
    )

  gsap.from(
    '#FAQ-title',
    {
      yPercent: 100,
      duration: 0.8,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '#FAQ-title',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    },
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
        toggleActions: 'play none none reverse',
      },
    })
    if (element.classList.contains('question')) {
      const btn = element.querySelector('button') as HTMLButtonElement
      const svg = element.querySelector('svg') as SVGElement
      const div = element.querySelector('.FAQ-p-container') as HTMLDivElement
      const tl = gsap.timeline()
      tl.reverse()
      allTimelines.push(tl)
      tl.to(
        svg,
        {
          rotateZ: -180,
          duration: 0.8,
          ease: 'power2.inOut',
        },
      )
        .from(
          div,
          {
            height: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '<',
        )
        .from(
          div,
          {
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '<+0.2',
        )

      btn.addEventListener('click', () => {
        if (tl.reversed())
          tl.play()

        else
          tl.reverse()
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
    }
    else {
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
    <TheSVG id="big-circle" name="big-circle" class="absolute right-0 top-0 z-0 w-full fill-transparent stroke-light-lavender stroke-[8px] dark:stroke-light-orange lg:w-4/5" />
    <div
      id="section-about"
      class="relative mx-auto max-w-[2500px] px-6 pt-56 pb-[calc(8rem_+_10vh)] sm:px-[10%]"
    >
      <TheSVG id="big-line" name="big-line" class="absolute top-1/3 -left-3 z-0 h-4/5 w-11/12 fill-transparent stroke-light-lavender stroke-[8px] dark:stroke-light-orange lg:w-4/6" />
      <div
        class="baron z-0 mb-12 overflow-hidden text-[calc(2rem_+_3vw)] text-dark-lavender dark:text-dark-orange"
      >
        <div id="hello">
          hello,
        </div>
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
            <TheSVG name="spin-star" class="h-[calc(1rem_+_2vw)] w-[calc(1rem_+_2vw)] fill-current" />
          </div>
        </div>
        <div class="z-[1] pt-5 pl-4 text-[calc(1rem_+_2vw)] font-light italic">
          <span id="about_block" class="block">moi c'est Benjamin ! Mon histoire avec la photographie remonte à
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
        <div id="caracteristics">
          caractéristiques
        </div>
      </div>
      <div class="flex flex-wrap-reverse md:grid md:grid-cols-[52%_5%_43%]">
        <div
          id="description"
          class="grid content-start gap-[3rem] pt-14 text-[calc(1rem_+_1vw)] font-extralight md:pt-0 md:text-[calc(0.8rem_+_1vw)] lg:gap-[6rem]"
        >
          <div class="grid items-start">
            <span>Surnom : Benjam 😄
              <br>
              Amoureux de la nature 🌍
              <br>
              Fan de technologie 🤖
              <br>
              Formation d'ingénieur 🎓
              <br>
              Habite à Paris 🏠
              <br>
              "Les détails font la perfection, et la perfection n'est pas un
              détail." Léonard De Vinci 👁️</span>
          </div>
          <span>Curieux de nature, j'aime apprendre et me fixer de nouveaux défis à
            relever. Si vous avez un projet photo ou toute autre suggestion à me
            soumettre, n'hésitez pas à me contacter via le formulaire
            ci-dessous.
          </span>
        </div>
        <div class="hidden md:block" />
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
        <div id="FAQ-title">
          faq
        </div>
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
              <div class="absolute top-0 left-0 text-lg font-semibold">
                TOUT DÉVELOPPER
              </div>
              <div
                class="absolute text-lg font-semibold"
              >
                TOUT RÉDUIRE
              </div>
            </div>
            <TheSVG name="double-chevron" class="h-5 w-5 place-self-center fill-none stroke-current stroke-2" />
          </button>
        </div>
        <FAQquestion>
          <template #question>
            Quelles sont tes prestations ?
          </template>
          <template #response>
            <p>
              Pour le moment, mes prestations sont les suivantes : mariages,
              évènements (baptêmes, naissances, anniversaires, soirées...),
              photos corporate (portraits d'employés, images pour les réseaux
              sociaux...), séances portrait en solo ou en couple. Si vous avez
              d'autres idées, n'hésitez pas à m'envoyer votre demande via le
              formulaire ci-dessous en mettant en objet 'Autres'.
            </p>
          </template>
        </FAQquestion>
        <FAQquestion>
          <template #question>
            Quels sont les tarifs ?
          </template>
          <template #response>
            <p>
              les tarifs de mes prestations sont uniquement délivrés sur
              demande. en fonction de votre projet, de vos demandes et attentes,
              je m'adapterais pour vous proposer le tarif le plus adapté !
            </p>
          </template>
        </FAQquestion>
        <FAQquestion>
          <template #question>
            Peut-on acheter les photos de ton site ?
          </template>
          <template #response>
            <p>
              Pour le moment, je ne vends pas mes photos personnelles. En
              fonction du nombre de demandes, je pourrais envisager d'en vendre
              certaines (des paysages principalement). <br>
              <br>
              NB: Bien que des photos prises lors de prestations soient
              affichées sur le site, aucune d'entre elles ne seront revendues.
            </p>
          </template>
        </FAQquestion>
        <FAQquestion>
          <template #question>
            Comment as tu appris la photo ?
          </template>
          <template #response>
            Je me suis formé exclusivement en autodidacte. La photographie peut
            sembler technique au premier abord, mais la progression est assez
            rapide ! Mon conseil est finalement assez classique, faire des
            photos tout en ayant un œil critique sur celles-ci. Demander des
            avis extérieurs constructifs est aussi très bénéfique pour prendre
            du recul et progresser.
          </template>
        </FAQquestion>
        <FAQquestion>
          <template #question>
            Comment as-tu réalisé ce (magnifique) site ?
          </template>
          <template #response>
            <p>
              Je me suis lancé le défi de créer et coder mon propre site web.
              J'ai travaillé et finalement réussi à sortir une première version
              du site en Avril 2022. <br>
              <br>
              Afin de continuer à faire grandir le site, j'ai totalement repris
              sa conception pour sortir une version 2.0 en Octobre 2022. Dans le
              même temps et pour les mêmes raisons, j'ai décidé de rendre le
              code source public (à retrouver sur GitHub) <br>
              <br>
              Les technologies utilisées : <br>
              - Design : Figma, Photoshop. <br>
              - Technologies : Nuxt 3 (Vue JS), CSS (Tailwind CSS). <br>
              - Librairies JS : GSAP, PhotoSwipe. <br>
              - Gestion de formulaire : Formspark, Botpoison. <br>
              - Développement et mise en production : Visual Studio Code,
              GitHub, Netlify. <br>
              <br>
              Pour plus d'informations, allez voir le
              <NuxtLink
                to="https://github.com/BenjaminOddou/portfolio"
                aria-label="Lien vers le répertoire GitHub"
                class="text-dark-lavender underline underline-offset-4 dark:text-dark-orange"
                target="_blank"
                no-rel
              >
                répertoire GitHub
              </NuxtLink>
              dédié.
            </p>
          </template>
        </FAQquestion>
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
