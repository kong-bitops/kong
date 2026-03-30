import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        court: {
          50: "#f6fbf4",
          100: "#ebf7e5",
          200: "#d4eec9",
          300: "#b2e09f",
          400: "#85cb6c",
          500: "#63af47",
          600: "#4c8d35",
          700: "#3e712d",
          800: "#345a29",
          900: "#2d4d25"
        },
        accent: {
          500: "#e9622e",
          600: "#cf4f1f"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
