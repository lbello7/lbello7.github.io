export const palette = {
  ivory: "#F5F1E8",
  obsidian: "#1C1C1C",
  brass: "#B89968",
  brassBright: "#D4B585",
  brassDeep: "#8B7548",
  warmgrey: "#8B8074",
  amber: "#E8A33D",
  walnut: "#5C3A21",
  walnutDark: "#3A2412",
  smoke: "#161412",
} as const;

export type PaletteKey = keyof typeof palette;
