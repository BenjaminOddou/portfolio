<script setup lang="ts">
defineProps<{
  question?: string
  response?: Array<string>
}>()
</script>

<template>
  <div
    class="question grid grid-cols-1 justify-start border-b border-b-current pt-8"
  >
    <button
      class="grid w-full grid-cols-[92%_8%] pb-8 text-start md:grid-cols-[95%_5%]"
    >
      <span class="text-lg italic">{{ question }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="h-5 w-5 place-self-center stroke-current stroke-2"
      >
        <path
          stroke-linecap="square"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <div
      class="FAQ-p-container after:block after:h-8 after:w-full after:content-['']"
    >
      <p v-for="(item, index) in response" :key="index">
        {{ item }}
      </p>
    </div>
  </div>
</template>
