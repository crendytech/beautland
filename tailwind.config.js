/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#f5683c",
        "deep-blue": "#19183A",
        "light-blue": "#262653",
        "white-pa-2": "hsla(0,0%,100%,.2)",
        "white-pa-5": "hsla(0,0%,100%,.05)",
        "neutral-300": "hsla(30,2%,42%,.8)",
        "c-purple-100": "#F1E3EF",
        "c-blue-100": "#1a193a"
      },
      border: {
        "1.5p": "0.09375rem"
      },
      padding: {
        '1/2': '50%',
        full: '100%',
      },
    },
  },
  plugins: [],
}
