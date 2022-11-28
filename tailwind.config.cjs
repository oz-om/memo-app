/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cur': ['cursive'],
      },
      gridTemplateColumns: {
        'two': 'minmax(100px, 1fr) minmax(auto, 52px)'
      },
    },
    container: {
      center: true,
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
