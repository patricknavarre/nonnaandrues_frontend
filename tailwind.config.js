/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Southern Charm color palette
        southern: {
          brown: "#a67c52", // Warm brown
          green: "#2a623d", // Deep southern green
          beige: "#e9d8c4", // Creamy beige
          cream: "#f9f7f3", // Soft off-white
          rust: "#c26e5a", // Warm rust/terracotta
          navy: "#1d3461", // Deep southern navy
          gold: "#d4af37", // Accent gold
          sage: "#8ba888", // Soft sage green
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Montserrat", "sans-serif"],
        accent: ["Georgia", "serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "2rem",
        },
      },
      backgroundImage: {
        magnolia: "url('/src/assets/backgrounds/magnolia-pattern.svg')",
        floral: "url('/src/assets/backgrounds/floral-pattern.svg')",
        texture: "url('/src/assets/backgrounds/subtle-texture.png')",
      },
      boxShadow: {
        southern: "0 4px 12px rgba(166, 124, 82, 0.15)",
      },
      borderRadius: {
        southern: "0.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
