export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const response = await $fetch<ImageKit[]>('https://api.imagekit.io/v1/files', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${config.IMAGEKIT_B64_API}`,
    },
  })
  return response.map(item => ({
    name: item.name,
    filePath: item.filePath,
    tags: item.tags,
    width: item.width,
    height: item.height,
    url: item.url,
  }))
})
