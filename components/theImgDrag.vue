<script setup lang="ts">
const { data: images } = useFetch<ImageKit[]>('/api/imgkit', {
  transform: (images) => {
    const filter = images.filter((image) => image.filePath.includes('navbar'))
    const arr: ImageKit[] = []
    while (arr.length < 2) {
      const r = filter[Math.floor(Math.random() * filter.length)]
      if (!arr.includes(r)) arr.push(r)
    }
    return arr
  }
})
</script>

<template>
  <div class="flex items-center justify-center">
    <nuxt-img
      class="img-drag"
      width="600"
      height="750"
      :src="images !== null ? images[0].filePath : undefined"
    />
    <nuxt-img
      class="img-drag"
      width="600"
      height="750"
      :src="images !== null ? images[1].filePath : undefined"
    />
  </div>
</template>

<style scoped>
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
