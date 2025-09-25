<template>
  <div
    class="question grid grid-cols-1 justify-start border-b border-b-current pt-8"
  >
    <button
      class="grid w-full grid-cols-[92%_8%] pb-8 text-start md:grid-cols-[95%_5%]"
    >
      <span class="text-lg italic"><slot name="question" /></span>
      <svg
        class="h-5 w-5 place-self-center fill-none stroke-current stroke-2"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div
      class="FAQ-p-container after:block after:h-8 after:w-full after:content-['']"
    >
      <slot name="response" />
    </div>
  </div>
</template>
