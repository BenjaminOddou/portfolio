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
        <svg
          class="h-6 w-6 fill-current"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000"
        >
          <path d="M642 250h511c91 0 199-9 275 10 89 22 168 68 218 130 46 57 79 117 98 202 12 54 6 126 6 189v346c0 128 8 268-28 359a416 416 0 0 1-333 261c-28 5-61 3-93 3H773c-75 0-155 4-213-13a427 427 0 0 1-255-195c-59-98-55-208-55-365V797c0-67-7-147 6-205a420 420 0 0 1 266-317c25-10 53-15 82-21Zm848 167c-33 14-57 21-69 55-20 57 29 122 89 111a84 84 0 0 0-20-166ZM972 584l-43 5a416 416 0 0 0-89 795c41 17 123 43 188 32 35-6 67-9 97-18a412 412 0 0 0 256-565c-64-147-196-250-409-249Zm9 166c152-2 236 80 264 202 11 47 3 105-12 141-37 89-105 139-214 157-44 7-88-8-116-20a249 249 0 0 1 4-463c22-9 51-8 74-17Z" />
        </svg>
      </NuxtLink>
      <NuxtLink
        to="https://youtube.com/@benjaminoddou"
        aria-label="Lien vers ma page YouTube"
        class="flex h-5 w-6 grow-0 duration-300 hover:scale-125 motion-reduce:transform-none"
        target="_blank"
        no-rel
      >
        <!-- Logo Youtube -->
        <svg
          class="h-[22px] w-6 fill-current"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2280 1604"
        >
          <path d="m1034 2 222 1 126 2 158 4 58 1 165 9 96 6 86 9c90 17 141 30 199 77 93 74 93 184 116 326 10 59 4 124 14 185l2 82 1 43v113l-3 102-6 127-9 101c-26 149-30 243-132 318-68 50-144 52-246 69l-87 7-104 6-120 5-141 4-183 2-92 1-209-2-205-5-107-4-147-8-97-7-106-14c-65-14-110-38-153-73-90-73-91-208-114-350l-8-113-4-123-1-43V747l2-75 4-108 7-96c16-99 16-206 58-279 36-61 85-106 155-133 73-28 169-22 257-36l84-5 87-4 116-4ZM907 466l1 675 593-337-1-2-593-336Z" />
        </svg>
      </NuxtLink>
      <NuxtLink
        to="https://github.com/BenjaminOddou/portfolio"
        aria-label="Lien vers le répertoire GitHub"
        class="flex h-5 w-6 grow-0 duration-300 hover:scale-125 motion-reduce:transform-none"
        target="_blank"
        no-rel
      >
        <!-- Logo GitHub -->
        <svg
          class="h-[22px] w-[22px] fill-current"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 379"
        >
          <path d="M192 0a192 192 0 0 0-46 378 28 28 0 0 1-2-9v-33h-24c-13 0-25-6-31-16-6-12-7-30-23-41-4-3-1-7 5-7 10 3 18 10 25 20 8 10 12 12 26 12 7 0 17 0 27-2a60 60 0 0 1 25-31c-64-7-94-39-94-82 0-19 8-37 21-52-4-15-10-45 2-57a67 67 0 0 1 50 24 144 144 0 0 1 94 0c4-5 21-24 50-24 12 12 6 42 2 57a78 78 0 0 1 21 52c0 43-30 75-94 82 17 9 30 35 30 54v44l-1 4A192 192 0 0 0 192 0Z" />
        </svg>
      </NuxtLink>
      <NuxtLink
        to="mailto:benjaminoddou@hotmail.fr"
        aria-label="Lien vers mon Mail"
        class="flex h-5 w-6 grow-0 duration-300 hover:scale-125 motion-reduce:transform-none"
      >
        <!-- Logo Mail -->
        <svg
          class="h-6 w-[25px] fill-current"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"
        >
          <path d="M12.1 2a10.8 10.8 0 0 0-7.5 3.3A9.4 9.4 0 0 0 2.2 10L2 11.4v2.2a11.2 11.2 0 0 0 1.1 4 9 9 0 0 0 2.6 3.1A15 15 0 0 0 7.9 22a9.5 9.5 0 0 0 1.6.6 12.6 12.6 0 0 0 5 .4l1.5-.3.3-.3v-1.7c0-.2-.2-.3-.4-.3h-.3c-.6.2-1.2.2-2.3.2a12.5 12.5 0 0 1-3-.3 9 9 0 0 1-1.6-.6 7.1 7.1 0 0 1-4-5.6A11.5 11.5 0 0 1 5 10a14.7 14.7 0 0 1 .8-2L7 6.6a7.1 7.1 0 0 1 3.4-1.9l1.2-.2a10.6 10.6 0 0 1 3.5.2l1 .3A6.7 6.7 0 0 1 20 9.2l.2 1.1V13l-.2 1-.4.7a2 2 0 0 1-.5.5c-.4.2-.8.2-1.1 0-.2-.2-.4-.5-.4-.9V11l-.1-3c0-.2-.2-.3-.4-.3a34.9 34.9 0 0 0-2.4.1c-.1.1-.2.2-.2.6v.4h-.2l-.3-.2a3 3 0 0 0-1.7-1.1l-.8-.1h-.9a3 3 0 0 0-1 .4 4 4 0 0 0-1.9 2l-.3 1c-.2.7-.2.9-.2 1.7a5.4 5.4 0 0 0 .3 2.1A5 5 0 0 0 9 17a4.4 4.4 0 0 0 1.3.7l.7.1h1.2c.4 0 .6 0 .9-.2a4 4 0 0 0 1.2-1l.3-.4c.2 0 .2 0 .4.3l.3.4.8.6 1 .3a5.8 5.8 0 0 0 2.5-.2l1.7-1c.5-.6.9-1.2 1.2-2l.3-1L23 12a12.6 12.6 0 0 0-.2-2.8l-.3-1a8.6 8.6 0 0 0-6-5.7h-.3l-.9-.3-1.8-.2h-1.4Zm.5 8c.5.2.9.4 1.1.8.2.2.3.5.4.9v2.1a2 2 0 0 1-.6 1 2 2 0 0 1-1.1.3c-.5 0-.8 0-1.1-.4l-.4-.5a4.2 4.2 0 0 1-.2-2.6l.4-.8c.2-.3.4-.5.8-.6.2-.1.5-.2.7-.1Z" />
        </svg>
      </NuxtLink>
    </div>
    <div class="row-start-2 row-end-2 m-auto text-center sm:m-0 sm:text-end">
      <p class="inline-block cursor-text">
        &copy; {{ new Date().getFullYear() }} Images par <b>Benjamin Oddou</b>
      </p>
    </div>
  </div>
</template>
