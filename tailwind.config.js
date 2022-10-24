/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `app.{js,ts,vue}`
  ],
  darkMode: 'class',
  safelist: [
    'whitelisted',
    { pattern: /(bg|text|border)-(teal|red)-(100|500|900)/ }
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      'white-8a': '#ffffff8a',
      jet: '#2a2a2aff',
      'jet-8a': '#2a2a2a8a',
      'dark-orange': '#cc7246ff',
      'light-orange': '#fca87fff',
      'dark-lavender': '#616d97ff',
      'light-lavender': '#d1d3e0ff',
      'grey-gallery': '#b4b4b4',
      cursor: '#CDC3C35A',
      grey: '#9CA3AF',
      'dark-grey': '#6b6b6b',
      'light-grey': '#787878',
      'dark-grey-alt': '#3a3a3a',
      'light-grey-alt': '#dddddd',
      teal: {
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a'
      },
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d'
      }
    },
    screens: {
      sm: '576px',
      md: '768px',
      it: '864px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1680px',
      lt: { raw: '(min-height: 576px)' },
      av: { raw: '(min-height: 768px)' },
      tl: { raw: '(min-height: 992px)' },
      hu: { raw: '(min-height: 1200 px)' }
    },
    extend: {
      keyframes: {
        fillwhite: {
          '0%': { fill: 'transparent' },
          '100%': { fill: 'white' }
        },
        filldark: {
          '0%': { fill: 'transparent' },
          '100%': { fill: '#2a2a2aff' }
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      transitionProperty: {
        'bg-img': 'background-image',
        'bg-color': 'background-color',
        fill: 'fill'
      },
      transitionTimingFunction: {
        classic: 'ease',
        smooth: 'cubic-bezier(0.65, 0, 0.076, 1)'
      }
    }
  },
  plugins: []
}
