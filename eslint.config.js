// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: true,
    vue: true,
    markdown: false,
    rules: {
      'no-console': 'off',
      'node/prefer-global/process': 'off',
    },
  },
)
