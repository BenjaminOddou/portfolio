// Delay
export const delay = (n: number) => {
  n = n || 2000
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, n)
  })
}
const icons = Object.fromEntries(
  Object.entries(import.meta.glob('~/assets/images/*.svg', { as: 'raw' })).map(
    ([key, value]) => {
      const filename = key.split('/').pop()!.split('.').shift()
      return [filename, value]
    },
  ),
)
module.exports = icons
