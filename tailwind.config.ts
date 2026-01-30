import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans-kr)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#333",
            a: {
              color: "#3b82f6",
              "&:hover": {
                color: "#1d4ed8",
              },
            },
            table: {
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            "thead th": {
              backgroundColor: "#f8fafc",
              fontWeight: "600",
              padding: "0.75rem 1rem",
              borderBottom: "2px solid #e2e8f0",
              textAlign: "left",
            },
            "tbody td": {
              padding: "0.75rem 1rem",
              borderBottom: "1px solid #e2e8f0",
            },
            "tbody tr:hover": {
              backgroundColor: "#f8fafc",
            },
            img: {
              borderRadius: "0.5rem",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
