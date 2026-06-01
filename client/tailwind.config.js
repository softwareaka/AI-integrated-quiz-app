/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        study: {
          50: "#f4f7fb",
          100: "#e8eef6",
          200: "#cddaea",
          500: "#4f6b9a",
          600: "#3d5578",
          700: "#2f425f",
          800: "#243347",
          900: "#1a2636",
        },
        accent: {
          DEFAULT: "#2d8f6f",
          light: "#e6f5ef",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      keyframes: {
        "correct-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(45, 143, 111, 0)" },
          "50%": { boxShadow: "0 0 0 6px rgba(45, 143, 111, 0.25)" },
        },
      },
      animation: {
        "correct-pulse": "correct-pulse 0.6s ease-out 1",
      },
    },
  },
  plugins: [],
};
