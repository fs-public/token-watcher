/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      title: ["Inter", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "1024px",
      lg: "1444px",
    },
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      highlight: "#2563EB",
      red: "#FA3939",
      pink: "#FBCFE8",
      gray: {
        light: "#F3F4F6",
        dark: "#4B5563",
      },
      stroke: "#E5E7Eb",
    },
    borderColor: {
      DEFAULT: "#E5E7Eb",
    },
  },
  plugins: [],
}
