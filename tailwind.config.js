/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulseFull: {
          "0%, 100%": { opacity: "100%" },
          "47%": { opacity: "0%" },
          "53%": { opacity: "0%" },
        },
      },
      animation: {
        pulseFull: "pulseFull 3s infinite",
      },
    },
  },
  plugins: [],
}
