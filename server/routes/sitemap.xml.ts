import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(() => {
  const sitemap = new SitemapStream({
    hostname: 'https://www.benjaminoddou-photographe.com',
    lastmodDateOnly: false
  })

  const endpoints = ['/', '/gallery', '/about']
  const changeFreq = 'weekly'
  const Priority = 0.9
  const date = new Date().toISOString()

  for (const endpoint of endpoints) {
    sitemap.write({
      url: endpoint,
      changefreq: changeFreq,
      priority: Priority,
      lastmod: date
    })
  }

  sitemap.end()
  return streamToPromise(sitemap)
})
