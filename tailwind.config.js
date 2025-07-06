/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f0f0f", // your main dark background
        "dark-surface": "#1c1c1c", // slightly lighter surface
        "dark-elevated": "#2a2a2a", // for cards, modals, elevated surfaces
      },
    },
  },
  plugins: [],
};
