<script setup lang="ts">
import type { RunningAnimation } from '~/utils/motion'

definePageMeta({
  title: 'À Propos',
  description: 'Benjamin Oddou est un photographe autodidacte et passionné proposant des prestations photo de mariage et de portrait.',
})

const STORY = `moi c'est Benjamin ! Mon histoire avec la photographie remonte à mon enfance, lors de voyages et de colonies de vacances. J'avais plaisir à capturer et partager mes aventures et mes souvenirs au travers de mes photos. C'est en 2018, lors d'un voyage en Suède, que j’ai ressenti le besoin de m'investir et de me former. Avec de la pratique et beaucoup de passion, j’ai fait évoluer mon style photographique. Aujourd’hui j’ai envie de passer une autre étape en vous partageant mes photographies et en mettant mon savoir-faire et mon expérience à votre service.`

const TRAITS = `Surnom : Benjam 😄
Amoureux de la nature 🌍
Fan de technologie 🤖
Formation d'ingénieur 🎓
Habite à Paris 🏠
"Les détails font la perfection, et la perfection n'est pas un détail." Léonard De Vinci 👁️`

const CURIOSITY = `Curieux de nature, j'aime apprendre et me fixer de nouveaux défis à relever. Si vous avez un projet photo ou toute autre suggestion à me soumettre, n'hésitez pas à me contacter via le formulaire ci-dessous.`

const introStarted = usePageIntro()

// ---------------------------------------------------------------------------
// Intro : un arc de cercle balaie le coin supérieur droit de la page
// ---------------------------------------------------------------------------
const circle = useTemplateRef('circle')

watch(introStarted, async () => {
  if (!circle.value)
    return
  const drawer = createStrokeDrawer(circle.value)
  const range = { start: 0, end: 0 }
  let running: RunningAnimation | undefined

  /** Anime la portion visible depuis sa position actuelle (interrompt l'animation précédente) */
  function drawTo(start: number, end: number, duration: number) {
    running?.cancel()
    const from = { ...range }
    running = animate({
      duration,
      onUpdate: (t) => {
        range.start = lerp(from.start, start, t)
        range.end = lerp(from.end, end, t)
        drawer.draw(range.start, range.end)
      },
    })
  }

  drawer.draw(0, 0)
  await wait(0.7)
  drawTo(20, 38, 1.5)
  await wait(0.7)
  drawTo(80, 98, 2)
  await wait(1.6)
  drawTo(100, 100, 0.4)
})

// ---------------------------------------------------------------------------
// Effets liés au défilement
// ---------------------------------------------------------------------------
const storySection = useTemplateRef('storySection')
const line = useTemplateRef('line')
const starColumn = useTemplateRef('starColumn')
const star = useTemplateRef('star')
const description = useTemplateRef('description')
const portrait = useTemplateRef('portrait')

let lineDrawer: ReturnType<typeof createStrokeDrawer> | undefined
let wideScreenQuery: MediaQueryList | undefined
const measureLine = () => lineDrawer?.measure()

onMounted(() => {
  lineDrawer = createStrokeDrawer(line.value!)
  wideScreenQuery = matchMedia('(min-width: 767px)')
  window.addEventListener('resize', measureLine)
})
onBeforeUnmount(() => window.removeEventListener('resize', measureLine))

useScrollFrame(({ velocity }) => {
  // 1. La grande ligne se dessine puis s'efface pendant que la section défile
  const lineProgress = scrollProgress(storySection.value!)
  if (lineProgress < 0.5) {
    const t = ease.power1.out(lineProgress / 0.5)
    lineDrawer?.draw(lerp(-10, 40, t), lerp(-10, 65, t))
  }
  else {
    const t = ease.power1.out((lineProgress - 0.5) / 0.5)
    lineDrawer?.draw(lerp(40, 100, t), lerp(65, 100, t))
  }

  // 2. L'étoile (collée en haut de l'écran) fait deux tours pendant la lecture du texte
  star.value!.style.rotate = `${720 * scrollProgress(starColumn.value!)}deg`

  // 3. Grands écrans : le portrait remonte plus vite que la page et se penche selon la vitesse
  if (wideScreenQuery?.matches) {
    const progress = scrollProgress(description.value!, 0.7)
    const skew = progress < 1 ? clamp(velocity / -300, -6, 6) : 0
    portrait.value!.style.translate = `0 ${lerp(40, -20, ease.power2.out(progress))}%`
    portrait.value!.style.transform = `skewY(${skew}deg)`
  }
  else {
    portrait.value!.style.translate = ''
    portrait.value!.style.transform = ''
  }
})

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
const openQuestions = ref([false, false, false, false, false])
const allExpanded = ref(false)

function toggleAllQuestions() {
  allExpanded.value = !allExpanded.value
  openQuestions.value = openQuestions.value.map(() => allExpanded.value)
}
</script>

<template>
  <div>
    <!-- Arc de cercle décoratif (dessiné à l'intro) -->
    <svg
      class="absolute top-0 right-0 z-0 w-full fill-transparent stroke-light-lavender stroke-8 lg:w-4/5 dark:stroke-light-orange"
      stroke-linecap="round"
      viewBox="0 0 240 240"
      aria-hidden="true"
    >
      <ellipse ref="circle" class="hidden-stroke" cx="240" cy="0" rx="120" ry="120" vector-effect="non-scaling-stroke" />
    </svg>

    <!-- ===================== HISTOIRE ===================== -->
    <section
      ref="storySection"
      class="relative mx-auto max-w-[2500px] px-6 pt-56 pb-[calc(8rem+10vh)] sm:px-[10%]"
      :class="{ 'is-revealed': introStarted }"
    >
      <!-- Grande ligne décorative (dessinée au défilement) -->
      <svg
        class="absolute top-1/3 -left-3 z-0 h-4/5 w-11/12 fill-transparent stroke-light-lavender stroke-8 lg:w-4/6 dark:stroke-light-orange"
        xmlns="http://www.w3.org/2000/svg"
        stroke-linecap="round"
        preserveAspectRatio="none"
        viewBox="0 0 520 425"
        aria-hidden="true"
      >
        <path ref="line" class="hidden-stroke" vector-effect="non-scaling-stroke" d="M0 81c53-31 129-50 188-61 84-15 210-31 283 17 21 15 41 51 44 73 3 23-20 64-44 82-31 22-65 39-83 70-21 37-27 74-26 114 0 15 0 35 2 53" />
      </svg>

      <h1 class="z-0 mb-12 overflow-hidden font-baron text-[calc(2rem+3vw)] text-dark-lavender dark:text-dark-orange">
        <span class="reveal-up block">hello,</span>
      </h1>

      <div class="grid grid-cols-[calc(1rem+2vw)_95%]">
        <!-- Étoile collée en haut de l'écran pendant la lecture -->
        <div ref="starColumn" class="mt-[0.8vw] h-[calc(100%-2rem-4vw)] pt-5">
          <div class="star-intro sticky top-5 text-dark-lavender dark:text-dark-orange">
            <svg ref="star" class="size-[calc(1rem+2vw)] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" aria-hidden="true">
              <path d="M4.2 12.5c-.4.2-.8 0-1.2-.2-.4-.3-.6-.6-.6-1l.1-.8 1-.6c.5-.3 1-.6 1.3-1a8 8 0 0 0 1.5-1.5 9.8 9.8 0 0 0-3.7-1l-1-.1a1 1 0 0 1-.5-.6L1 5.1c0-.3 0-.6.3-1 .3-.2.5-.3.9-.3l.7.1.6.7 1.1 1.2L6.3 7a11 11 0 0 0-.8-4l-.3-1c0-.2 0-.4.2-.6.2-.3.6-.5 1.2-.5s1 .2 1.2.5l.1.5c0 .3 0 .6-.3 1.1a15 15 0 0 0-.7 2l-.2 2.2 1.7-1 1.3-1.5.8-.8.7-.2c.3 0 .6 0 .9.4.3.3.4.6.4 1 0 .2 0 .4-.2.5l-.7.4a7 7 0 0 1-1 .3c-.7 0-1.4.2-2 .3l-1.8.9c1 1.1 2.2 1.9 3.3 2.4.3 0 .6.2.7.3l.4.6c.1.3 0 .6-.1.9-.2.3-.4.6-.7.7-.4.2-.6.3-.9.1a1 1 0 0 1-.5-.3l-.4-1a8.8 8.8 0 0 0-2-3.5A8.4 8.4 0 0 0 5 11.1c0 .5-.2.8-.3 1 0 .2-.3.3-.6.4Z" />
            </svg>
          </div>
        </div>
        <p class="z-1 pt-5 pl-4 text-[calc(1rem+2vw)] font-light italic [--delay:0.3s] [--stagger:40ms]">
          <SplitText by="lines" :text="STORY" />
        </p>
      </div>
    </section>

    <!-- ===================== CARACTÉRISTIQUES ===================== -->
    <section class="relative z-1 mx-auto max-w-[2500px] bg-white px-[10%] pb-[calc(2rem+10vh)] transition-colors duration-500 dark:bg-jet">
      <h2 v-reveal="{ start: 0.6 }" class="mb-12 overflow-hidden font-baron text-[8.5vw] md:text-[calc(2rem+3vw)]">
        <span class="reveal-up block [--duration:0.8s]">caractéristiques</span>
      </h2>

      <div class="flex flex-wrap-reverse md:grid md:grid-cols-[52%_5%_43%]">
        <div
          ref="description"
          v-reveal="{ start: 0.6 }"
          class="grid content-start gap-12 pt-14 text-[calc(1rem+1vw)] font-extralight md:pt-0 md:text-[calc(0.8rem+1vw)] lg:gap-24 [--delay:0.3s] [--stagger:40ms]"
        >
          <p>
            <SplitText by="lines" :text="TRAITS" />
          </p>
          <p class="[--delay:0.6s]">
            <SplitText by="lines" :text="CURIOSITY" />
          </p>
        </div>
        <div class="hidden md:block" />
        <div ref="portrait" class="grained relative z-2 aspect-2/3 w-full overflow-hidden transition-[transform] duration-500 ease-power3-out">
          <NuxtImg
            src="/about-page/self-portrait-910w.webp"
            width="910"
            height="1365"
            alt="Portrait de Benjamin - Saint-Mesmin (France, 2019)"
            loading="lazy"
            class="size-full object-cover"
          />
        </div>
      </div>
    </section>

    <!-- ===================== FAQ ===================== -->
    <section class="mx-auto max-w-[2500px] px-[10%]">
      <h2 v-reveal class="mb-12 overflow-hidden font-baron text-[8.5vw] md:text-[calc(2rem+3vw)]">
        <span class="reveal-up block [--duration:0.8s]">faq</span>
      </h2>

      <div class="m-auto grid w-full md:w-4/5">
        <!-- Tout développer / tout réduire -->
        <div v-reveal="{ start: 0.8 }" class="reveal-fade-up border-b border-current pt-8 [--duration:0.7s] [--ease:var(--ease-power3-out)]">
          <button
            type="button"
            class="grid w-full grid-cols-[92%_8%] pb-8 text-start md:grid-cols-[95%_5%]"
            :class="{ 'is-expanded': allExpanded }"
            @click="toggleAllQuestions"
          >
            <span class="relative h-full overflow-hidden text-lg font-semibold">
              <span class="expand-label absolute top-0 left-0">TOUT DÉVELOPPER</span>
              <span class="collapse-label absolute top-0 left-0">TOUT RÉDUIRE</span>
            </span>
            <svg
              class="size-5 place-self-center fill-none stroke-current stroke-2 transition-[rotate] duration-800 ease-power2-in-out"
              :class="{ '-rotate-180': allExpanded }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m19 13-7 7-7-7m14-8-7 7-7-7" />
            </svg>
          </button>
        </div>

        <FaqItem v-model="openQuestions[0]" question="Quelles sont tes prestations ?">
          <p>
            Pour le moment, mes prestations sont les suivantes : mariages, évènements (baptêmes, naissances,
            anniversaires, soirées...), photos corporate (portraits d'employés, images pour les réseaux sociaux...),
            séances portrait en solo ou en couple. Si vous avez d'autres idées, n'hésitez pas à m'envoyer votre
            demande via le formulaire ci-dessous en mettant en objet 'Autres'.
          </p>
        </FaqItem>

        <FaqItem v-model="openQuestions[1]" question="Quels sont les tarifs ?">
          <p>
            les tarifs de mes prestations sont uniquement délivrés sur demande. en fonction de votre projet, de vos
            demandes et attentes, je m'adapterais pour vous proposer le tarif le plus adapté !
          </p>
        </FaqItem>

        <FaqItem v-model="openQuestions[2]" question="Peut-on acheter les photos de ton site ?">
          <p>
            Pour le moment, je ne vends pas mes photos personnelles. En fonction du nombre de demandes, je pourrais
            envisager d'en vendre certaines (des paysages principalement).
          </p>
          <p class="mt-6">
            NB: Bien que des photos prises lors de prestations soient affichées sur le site, aucune d'entre elles ne
            seront revendues.
          </p>
        </FaqItem>

        <FaqItem v-model="openQuestions[3]" question="Comment as tu appris la photo ?">
          <p>
            Je me suis formé exclusivement en autodidacte. La photographie peut sembler technique au premier abord,
            mais la progression est assez rapide ! Mon conseil est finalement assez classique, faire des photos tout
            en ayant un œil critique sur celles-ci. Demander des avis extérieurs constructifs est aussi très bénéfique
            pour prendre du recul et progresser.
          </p>
        </FaqItem>

        <FaqItem v-model="openQuestions[4]" question="Comment as-tu réalisé ce (magnifique) site ?">
          <p>
            Je me suis lancé le défi de créer et coder mon propre site web. J'ai travaillé et finalement réussi à
            sortir une première version du site en Avril 2022.
          </p>
          <p class="mt-6">
            Afin de continuer à faire grandir le site, j'ai totalement repris sa conception pour sortir une version
            2.0 en Octobre 2022. Dans le même temps et pour les mêmes raisons, j'ai décidé de rendre le code source
            public (à retrouver sur GitHub)
          </p>
          <p class="mt-6">
            Les technologies utilisées :<br>
            - Design : Figma, Photoshop.<br>
            - Technologies : Nuxt 4 (Vue JS), CSS (Tailwind CSS 4).<br>
            - Librairies JS : Lenis, PhotoSwipe.<br>
            - Gestion de formulaire : Formspark, Botpoison.<br>
            - Développement et mise en production : Visual Studio Code, GitHub, Netlify.
          </p>
          <p class="mt-6">
            Pour plus d'informations, allez voir le
            <a
              :href="LINKS.github"
              aria-label="Lien vers le répertoire GitHub"
              class="text-dark-lavender underline underline-offset-4 dark:text-dark-orange"
              target="_blank"
              rel="noopener"
            >répertoire GitHub</a>
            dédié.
          </p>
        </FaqItem>
      </div>
    </section>

    <ContactForm />
  </div>
</template>

<style scoped>
/* Tracés invisibles tant que le script ne les a pas dessinés */
.hidden-stroke {
  stroke-dasharray: 0 100000;
}

/* Étoile : apparaît en tournant à l'intro */
.star-intro {
  scale: 0;
  rotate: 45deg;
  transition:
    scale 1.5s var(--ease-power4-out) 0.3s,
    rotate 1.5s var(--ease-power4-out) 0.3s;
}

.is-revealed .star-intro {
  scale: 1;
  rotate: 0deg;
}

/* « Tout développer » ↔ « Tout réduire » : les deux libellés défilent verticalement */
.expand-label,
.collapse-label {
  transition: translate 0.9s var(--ease-power2-out);
}

.collapse-label {
  translate: 0 100%;
}

.is-expanded .expand-label {
  translate: 0 -100%;
}

.is-expanded .collapse-label {
  translate: 0 0;
}

/* Grain photo animé par-dessus le portrait */
.grained::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: block;
  width: 500%;
  height: 500%;
  opacity: 0.15;
  background: url('https://ik.imagekit.io/palladium/about-page/Image_gaussian_noise.jpg');
  animation: noise 6s steps(20) infinite;
}

@keyframes noise {
  0%,
  100% {
    background-position: 0 0;
  }
  20% {
    background-position: -15% 5%;
  }
  40% {
    background-position: 20% 25%;
  }
  60% {
    background-position: 15% 5%;
  }
  80% {
    background-position: 25% 35%;
  }
}
</style>
