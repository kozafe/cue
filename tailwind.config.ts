import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#1b355b",
        accentColors: {
          softCoralRed: "#ff6b6b",
          vibrantMustardYellow: "#ffcc00",
          lightTeal: "#72c1d1",
        },
        neutralColors: {
          lightGray: "#f4f4f4",
          darkCharcoal: "#333333",
          mediumGray: "#b3b3b3",
        },
        complementaryColor: "#e3e8f0",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
