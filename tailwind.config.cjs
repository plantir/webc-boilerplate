import type { Config } from 'tailwindcss';
import daisyui from 'daisyui'
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    colors: {
      ...require('tailwindcss/colors'),
      gray: {
        100: '#DFE1E6',
        200: '#F0F4F7',
        300: '#6B778C',
        400: '#6B778C',
        500: '#6B778C',
        600: '#6B778C',
        700: '#616161',
        800: '#6B778C',
        900: '#6B778C',
        1000: '#344054',
      },

    },
    borderRadius: {
      'md': '10px',
      '2xl': '20px',
      'full': '999999px'
    },
    extend: {
      colors: {
        'chart': {
          100: '#1570EF',
          200: '#2E90FA',
          300: '#84CAFF',
          400: '#D1E9FF'
        },
        click: '#C5D0FF',
        "primary-muted": 'var(--primary-muted)',
        "warning-text": 'var(--warning-text)',
        'title': 'var(--title)'
      }
    },
    fontFamily: {
      'display': ['IranYekan'],
      'body': ['IranYekan']
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      'extra-bold': '800',
      black: '900',
      'extra-black': '1000'
    }
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      {
        'light': {
          ...require("daisyui/src/theming/themes")["light"],
          'primary': '#412CFF',
          'secondary': '#1570EF',
          'primary-content': '#091E42',
          'error': '#BF2600',
          "accent": "#BAC7FF",
          'base-content': '#475467',
          'base-100': '#E8E8E8',
          'base-200': "#fff",
          'base-300': "#DFE1E6",
          "--primary-muted": '#EFF8FF',
          "--warning-text": '#262774',
          '--title': '#18181B'
        }
      },

    ],
    prefix: 'daisy-'
  }
} as Config;
