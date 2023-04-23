// Import this into your own tailwind.config.js file like this:
/*
  import config from '@swiftprotocol/assets/tailwind'
  module.exports = config
*/

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@interchaininfo/sdk/react/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          1000: '#090a0c',
          900: '#0a0b0e',
          700: '#212226',
        },
        primary: {
          900: '#e38434',
          800: '#784923',
          700: '#4d311d',
          600: '#221a15',
        },
        surface: {
          900: '#ffffff',
          800: '#b6b7b8',
          700: '#868688',
          300: '#313236',
          200: '#202125',
          100: '#191a1d',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
