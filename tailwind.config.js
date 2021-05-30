const defaultTheme = require('tailwindcss/defaultTheme')
const windmill = require('@windmill/react-ui/config')

module.exports = windmill({
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        blue: {
          '100': '#72c1df',
          '200': '#5bb7d9',
          '300': '#43add4',
          '400': '#2ca2ce',
          '500': '#1b6fbb',
          '600': '#1766ad',
          '700': '#125999',
          '800': '#0e6a8d',
          '900': '#0c5b79'
        },
        yellow: {
          '100': '#f2bf52',
          '200': '#d6a63e',
          '300': '#febc1d',
          '400': '#edb01c',
          '500': '#dea51b',
          '600': '#d19b19',
          '700': '#bd8319',
          '800': '#b57f1d',
          '900': '#a3781c'
        }
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      // fontFamily: {
      //   'sans': ['Trueno-Semibold' ,'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      // },
      boxShadow: {
        bottom: '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
      },
    },
  },
})
