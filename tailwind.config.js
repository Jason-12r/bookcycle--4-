/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate': {
          100: '#f1f5f9',
          950: '#0f172a',
        },
      },
    },
  },
  plugins: [],
}
