import { Buffer } from 'node:buffer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const privateKey = config.IMAGEKIT_API

  if (!privateKey) {
    throw createError({ statusCode: 500, statusMessage: 'Cle manquante' })
  }

  const b64Token = Buffer.from(`${privateKey}:`).toString('base64')

  const response = await $fetch<ImageKit[]>('https://api.imagekit.io/v1/files', {
    headers: {
      Authorization: `Basic ${b64Token}`,
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
