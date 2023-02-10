<template>
  <div
    class="footer my-8 grid grid-cols-1 grid-rows-2 sm:grid-cols-2 lg:mt-12"
  >
    <span
      class="col-start-1 col-end-3 mx-auto mb-8 grid w-4/5 border-t-2 border-current sm:w-full"
    />
    <div
      class="row-start-2 row-end-2 hidden sm:grid sm:grid-cols-[repeat(4,_1.7rem)] sm:gap-6"
    >
      <NuxtLink
        to="https://www.instagram.com/benjamin_oddou/"
        aria-label="Lien vers mon compte Instagram"
        class="flex h-6 w-6 grow-0 duration-300 hover:scale-125 motion-reduce:transform-none"
        target="_blank"
        no-rel
      >
        <!-- Logo Instagram -->
        <TheSVG name="full-insta" class="h-6 w-6 fill-current" />
      </NuxtLink>
      <NuxtLink
        to="https://youtube.com/@benjaminoddou"
        aria-label="Lien vers ma page YouTube"
        class="flex h-5 w-6 grow-0 duration-300 hover:scale-125 motion-reduce:transform-none"
        target="_blank"
        no-rel
      >
        <!-- Logo Youtube -->
        <TheSVG name="full-ytbe" class="h-[22px] w-6 fill-current" />
      </NuxtLink>
      <NuxtLink
        to="https://github.com/BenjaminOddou/portfolio"
        aria-label="Lien vers le répertoire GitHub"
        class="flex h-5 w-6 grow-0 duration-300 hover:scale-125 motion-reduce:transform-none"
        target="_blank"
        no-rel
      >
        <!-- Logo GitHub -->
        <TheSVG name="full-git" class="h-[22px] w-[22px] fill-current" />
      </NuxtLink>
      <NuxtLink
        to="mailto:benjaminoddou@hotmail.fr"
        aria-label="Lien vers mon Mail"
        class="flex h-5 w-6 grow-0 duration-300 hover:scale-125 motion-reduce:transform-none"
      >
        <!-- Logo Mail -->
        <TheSVG name="full-mail" class="h-6 w-[25px] fill-current" />
      </NuxtLink>
    </div>
    <div class="row-start-2 row-end-2 m-auto text-center sm:m-0 sm:text-end">
      <p class="inline-block cursor-text">
        &copy; {{ new Date().getFullYear() }} Images par <b>Benjamin Oddou</b>
      </p>
    </div>
  </div>
</template>
