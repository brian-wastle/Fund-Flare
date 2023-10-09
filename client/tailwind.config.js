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
        'light-1': '#ffffff',
        'light-2': '#F4F4F4',
        'text-light': '#f1f1f1',
        'text-dark': '#333333',
      },
      fontFamily: {
        main: ['Archivo, sans-serif'],
        secondary: ['Inter, sans-serif'],
      },
    },
  },
  plugins: [],
}

