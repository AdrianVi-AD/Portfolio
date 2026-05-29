/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: "#19183B",
        secondary: "#1280AC",
        accent: "#F59E0B",
        textPrimary: "#A1C2BD",
        background: "#19183B",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.45)",
      },
      keyframes: {
        fadein: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadein: "fadein 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
