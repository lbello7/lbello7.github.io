import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F5F1E8",
        obsidian: "#1C1C1C",
        brass: "#B89968",
        "brass-bright": "#D4B585",
        "brass-deep": "#8B7548",
        warmgrey: "#8B8074",
        amber: "#E8A33D",
        walnut: "#5C3A21",
        "walnut-dark": "#3A2412",
        smoke: "#161412",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        body: ['"Inter Tight"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "Menlo", "monospace"],
      },
      letterSpacing: {
        editorial: "-0.02em",
        eyebrow: "0.18em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
