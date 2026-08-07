/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{ts,tsx}", "./screens/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#f9f8f9",
        foreground: "#3a2a3f",
        card: "#ffffff",
        primary: "#5b1c46",
        "primary-foreground": "#fdfcfd",
        "primary-soft": "#f3edf0",
        secondary: "#f5f1f5",
        muted: "#f5f1f5",
        "muted-foreground": "#9a8a9f",
        accent: "#d9a441",
        "accent-foreground": "#6b4a1a",
        "accent-soft": "#fbf3e0",
        success: "#2d9968",
        "success-soft": "#e8f6f0",
        info: "#3a7fd9",
        "info-soft": "#e8f1fb",
        warning: "#d99b2d",
        "warning-soft": "#fbf5e8",
        border: "#e8e2e8",
      },
    },
  },
  plugins: [],
};
