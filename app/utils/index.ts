// Delay
export function delay(n: number) {
  n = n || 2000
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, n)
  })
}
