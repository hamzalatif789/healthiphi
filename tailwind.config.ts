import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // HEALTHIPHI REFINED PALETTE - Role-based colors
        // Primary Accent - Yellow (#f1be49)
        golden: {
          50: "#fefbea", // Light Yellow background
          100: "#fef7d3",
          200: "#fdeea7",
          300: "#fce47b",
          400: "#fbd94f",
          500: "#f1be49", // Primary Accent Yellow - CTA buttons, links, highlights
          600: "#d9a441",
          700: "#c18a39",
          800: "#a97031",
          900: "#915629",
        },

        // Secondary - Green (#317039)
        forest: {
          50: "#f0f9f1",
          100: "#dcf2de",
          200: "#bae5bd",
          300: "#98d89c",
          400: "#76cb7b",
          500: "#317039", // Secondary Green - success, navigation, positive actions
          600: "#2c5f32",
          700: "#274e2b",
          800: "#223d24",
          900: "#1d2c1d",
        },

        // Background and Light Accents - Cream (#f8edd9)
        cream: {
          50: "#fff1d4", // Soft White - card backgrounds, content areas
          100: "#f8edd9", // Cream - section backgrounds, card backgrounds
          200: "#f1e1c4",
          300: "#ead5af",
          400: "#e3c99a",
          500: "#dcbd85",
          600: "#c5a677",
          700: "#ae8f69",
          800: "#97785b",
          900: "#80614d",
        },

        // Alert/Error - Red (#cc4a25)
        alert: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#cc4a25", // Red - error states, alerts, warnings
          600: "#b91c1c",
          700: "#991b1b",
          800: "#7f1d1d",
          900: "#701a1a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
