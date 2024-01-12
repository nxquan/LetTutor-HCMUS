/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        first: '#0071F0',
        blur: '#9E9E9E',
        text: '#0009',
      },
    },
  },
  plugins: [],
};
