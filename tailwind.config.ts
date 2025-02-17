import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3E0E71',
        accent: '#C0A3CF',
      },
      fontFamily: {
        'charter': ['Charter', 'serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'header': '60px',
        'subheader': '27px',
        'body': '24px',
        'small': '20px',
      },
    },
  },
  plugins: [],
} satisfies Config;
