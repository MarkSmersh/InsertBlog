/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#0066FF",
        'gray': "#A7A7A7",
      },
    },
  },
  plugins: [],
}