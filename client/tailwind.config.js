/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF7067',
        'secondary': '#E5554C',
        'light-1': '#EFEFEF',
        'light-2': '#ffffff',
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

