import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fff8ef",
        espresso: "#2f1d17",
        coral: "#f27f66",
        peach: "#ffd7bd",
        gold: "#f2bc57",
      },
      boxShadow: {
        card: "0 18px 50px rgba(47, 29, 23, 0.12)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(47, 29, 23, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(47, 29, 23, 0.07) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "30px 30px",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
