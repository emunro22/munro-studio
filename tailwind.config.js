/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      colors: {
        ink: "#111111",
        "ink-soft": "#444444",
        "ink-faint": "#888888",
        surface: "#F7F7F5",
        "surface-2": "#EFEFEC",
        border: "#E2E2DE",
        accent: "#1a1a1a",
        highlight: "#0057FF",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "ticker": "ticker 35s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
