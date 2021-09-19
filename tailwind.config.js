const { lightBlue } = require('tailwindcss/colors')
const colors = require('tailwindcss/colors')

module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
  ],
  theme: {
    colors: {
      gray: colors.trueGray,
      indigo: colors.blueGray,
      white: colors.white,
      blue: colors.trueGray,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
}