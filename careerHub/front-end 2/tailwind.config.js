/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#005c4b",
        "secondary": "#200550",
        "tertiary": "#707070",
        "pink": "#EE9AE5",
      },
      boxShadow: {
        '3xl': '0 10px 50px 0px rgba(0, 0, 0, 0.15)',
        'primary-shadow': '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -2px rgba(59, 130, 246, 0.1)', // Adjust color and intensity as needed
      }
    },
  },
  plugins: [],
}

