/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        vault: {
          bg: "#0f0f0f",
          surface: "#1a1a1a",
          border: "#2a2a2a",
          gold: "#f0a500",
          goldHover: "#ffbb33",
          text: "#e0e0e0",
          muted: "#555555",
        }
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
        display: ["Playfair Display", "serif"],
      }
    }
  },
  plugins: []
}