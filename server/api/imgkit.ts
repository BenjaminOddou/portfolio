export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const response = await $fetch('https://api.imagekit.io/v1/files', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${config.IMAGEKIT_B64_API}`,
    },
  })
  return response
})
