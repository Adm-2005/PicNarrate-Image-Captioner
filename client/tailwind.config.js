/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#EDF0DA",
        foreground: "#AA4465"
      },
      fontFamily: {
        poppins: ["Poppins", "sans serif"]
      }
    },
  },
  plugins: [],
}

