import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
      },
      colors: {
        // Bleu lagon des plages de Guadeloupe
        lagoon: {
          50: "#eefdfb",
          100: "#c9faf4",
          200: "#94f4ea",
          300: "#56e7dc",
          400: "#25cfc6",
          500: "#0bb0aa",
          600: "#068d8a",
          700: "#09706f",
          800: "#0b595a",
          900: "#0d4a4b",
          950: "#002b2d",
        },
        // Vert végétation tropicale
        palm: {
          50: "#f0faf0",
          100: "#dbf3dc",
          200: "#b9e6bc",
          300: "#88d18e",
          400: "#51b45b",
          500: "#2f963a",
          600: "#20792b",
          700: "#1c6025",
          800: "#194d21",
          900: "#16401d",
          950: "#06240d",
        },
        // Sable des plages
        sand: {
          50: "#fdfaf4",
          100: "#faf3e6",
          200: "#f3e3c7",
          300: "#eacd9d",
          400: "#dfb06f",
          500: "#d6974c",
          600: "#c87e3b",
          700: "#a66331",
          800: "#85502d",
          900: "#6c4228",
          950: "#3a2113",
        },
        // Mangue / fleurs flamboyant
        mango: {
          50: "#fff5ed",
          100: "#ffe8d4",
          200: "#ffcda8",
          300: "#ffa970",
          400: "#ff7a37",
          500: "#fe5510",
          600: "#ef3a06",
          700: "#c62806",
          800: "#9d220d",
          900: "#7e1f0e",
          950: "#440b04",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -15px rgba(0, 43, 45, 0.25)",
        card: "0 4px 24px -8px rgba(0, 43, 45, 0.18)",
        glow: "0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px -20px rgba(6, 141, 138, 0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.5)", opacity: "0" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.24, 0, 0.38, 1) infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
