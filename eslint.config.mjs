// Règles de style du projet : https://github.com/antfu/eslint-config
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,
  markdown: false,
  // Fichiers servis tels quels (service worker…)
  ignores: ['public/**'],
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
    // Laisse les ternaires courts sur une seule ligne (plus lisible)
    'antfu/reasonable-newline': 'off',
  },
})
