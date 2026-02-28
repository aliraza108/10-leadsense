import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0F",
        surface: "#13131A",
        border: "#1E1E2E",
        primary: "#7C3AED",
        secondary: "#06B6D4",
        hot: "#F97316",
        warm: "#FBBF24",
        nurture: "#34D399",
        cold: "#60A5FA",
        disq: "#F87171",
        text: "#F1F5F9",
        muted: "#64748B",
      },
      fontFamily: {
        heading: ["Nunito", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px rgba(124, 58, 237, 0.3)",
      },
      backgroundImage: {
        hero: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
