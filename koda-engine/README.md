# KODA · 01 — interactive prototype

A single-page editorial microsite for **The KODA Engine** — a custom desk
object that runs a personal AI server behind smoked glass.

> Loro Piana × Teenage Engineering × Apple. Built with Vite + React + TypeScript,
> Tailwind, react-three-fiber, and Framer Motion.

---

## Local development

```bash
cd koda-engine
npm install
npm run dev          # http://localhost:5173
npm run build        # static build → dist/
npm run preview      # preview the built bundle
```

## Project structure

```
koda-engine/
├── index.html
├── vite.config.ts
├── tailwind.config.ts        ← KODA palette tokens
├── src/
│   ├── main.tsx              ← HashRouter, two routes: / and /spec
│   ├── App.tsx               ← single-page composition
│   ├── styles/globals.css    ← palette CSS vars, hausa pattern, oled flicker
│   ├── lib/palette.ts        ← exported colour constants
│   ├── content/prd.md        ← live PRD, rendered at /#/spec
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── HausaDivider.tsx  ← brass diamond border SVG
│   │   └── SectionHeader.tsx
│   └── sections/
│       ├── Hero.tsx              ← R3F 3D model + drag rotate
│       ├── KodaEngineModel.tsx   ← procedural 3D model
│       ├── Anatomy.tsx           ← exploded view, click reveals
│       ├── Interaction.tsx       ← clickable dial, OLED states
│       ├── Architecture.tsx      ← animated three-tier diagram
│       ├── DayWithKoda.tsx       ← scroll timeline
│       ├── Build.tsx             ← parts list table + phases
│       └── Spec.tsx              ← rendered PRD (markdown)
```

## How to extend

### Edit the spec
Update `src/content/prd.md`. The `/#/spec` route renders it live.

### Edit the palette
Two places, kept in sync:
- `tailwind.config.ts` (Tailwind class colours: `bg-brass`, `text-amber`, …)
- `src/styles/globals.css` (CSS custom properties for raw use)

### Add a section
Create `src/sections/MySection.tsx`, give it an `id`, and drop it into
`App.tsx` with a `<HausaDivider />` between siblings.

### Tune the 3D model
`src/sections/KodaEngineModel.tsx` is procedural — the walnut body, smoked
glass, brass corners, OLED, dial, and the visible "logic board" are all
assembled from primitives. Adjust `W`, `H`, `D` at the top to change
proportions; tweak the `LogicBoard` canvas function for the look behind
the smoked glass.

### Re-deploy to `/koda/`
The repo serves a built copy of this prototype at `/koda/`:

```bash
cd koda-engine
npm run build
rm -rf ../koda && cp -r dist ../koda
```

Then commit `/koda/` and push.

## Tech stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** with custom palette tokens
- **@react-three/fiber + @react-three/drei** for the 3D hero
- **Framer Motion** for transitions and the dial interaction
- **react-router-dom (HashRouter)** for the `/spec` route
- **react-markdown + remark-gfm** for live PRD rendering

Single deployable build, mobile-responsive, no backend required.
