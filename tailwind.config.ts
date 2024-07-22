import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        meal: "#6CD4FF",
        minievent: "#8B80F9",
        workshop: "#CFBFF7",
        qna: "#CFB1B7",
        speaker: "#83858C",
        other: "#333",
      }
    },
  },
  plugins: [],
};
export default config;
