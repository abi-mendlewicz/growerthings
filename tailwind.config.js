/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat']
    },
    colors: {
      green: '#49d99c',
      red: '#ff9898',
      gold: '#b38a47',
      black: '#000',
      white: '#fff',
      transparent: 'transparent',
      modalBack: 'rgba(0, 0, 0, 0.6)',
    },
  },
  plugins: [],
}