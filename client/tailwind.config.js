/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2cffb2',
        'secondary': '#2fe4ff',
        'light-1': '#111111',
        'light-2': '#161616',
        'text-light': '#dfdfdf',
      },
      fontFamily: {
        main: ['Archivo, sans-serif'],
        secondary: ['Inter, sans-serif'],
      },
    },
  },
  plugins: [],
}

