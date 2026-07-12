import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // -- portfolio design tokens (daytime landscape theme) --
        gold: { light: "#F6C98C", DEFAULT: "#E8A855", dark: "#C98B44" },
        teal: { light: "#A6E9DC", DEFAULT: "#5FC2B0", dark: "#3D9587" },
        violet: { light: "#C3B8F5", DEFAULT: "#9D8DE0", dark: "#7C6BC9" },
        sky: { top: "#3E8FD0", mid: "#7EC1EC", horizon: "#EAF6FF" },
        ridge: { far: "#A9C9D6", mid: "#5E9A82", near: "#28503E" },
        ink: {
          void: "#070b14",
          deep: "#0c1330",
          text: "#101526",
          dim: "#4c5573",
          faint: "#8891ab",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.9s ease forwards",
        "sun-pulse": "sunPulse 10s ease-in-out infinite",
        "cloud-drift": "cloudDrift 70s ease-in-out infinite alternate",
        "mote-rise": "moteRise 14s linear infinite",
        "scroll-cue": "scrollCue 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        sunPulse: {
          "0%, 100%": { opacity: "0.75", transform: "translate(-50%,-50%) scale(1)" },
          "50%": { opacity: "1", transform: "translate(-50%,-50%) scale(1.08)" },
        },
        cloudDrift: {
          "0%": { transform: "translateX(-4%)" },
          "100%": { transform: "translateX(4%)" },
        },
        moteRise: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "12%": { opacity: "0.7" },
          "90%": { opacity: "0.3" },
          "100%": { transform: "translateY(-65vh) translateX(12px)", opacity: "0" },
        },
        scrollCue: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
