/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#006b33',
        black: '#000000',
        white: '#ffffff',
        red: '#9a0000'
      },
    },
  },
  plugins: [],
}


