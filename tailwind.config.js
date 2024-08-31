/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        vue: {
          '50': '#eefbf4',
          '100': '#d6f5e3',
          '200': '#b0eacb',
          '300': '#7dd8ad',
          '400': '#40b883',
          '500': '#25a470',
          '600': '#17845a',
          '700': '#126a4a',
          '800': '#11543c',
          '900': '#0f4533',
          '950': '#07271d',
        },
      },
    },
  },
  plugins: [],
};
