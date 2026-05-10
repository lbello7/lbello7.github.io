import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "../components/SectionHeader";

type Part = {
  id: string;
  label: string;
  role: "visible" | "hidden" | "io" | "control";
  one_liner: string;
  detail: string;
  // position on the schematic (% of width / height)
  x: number;
  y: number;
  w: number;
  h: number;
};

const parts: Part[] = [
  {
    id: "mbp",
    label: "MBP Logic Board (2017)",
    role: "visible",
    one_liner: "The aesthetic mechanism — visible, lit, decorative.",
    detail:
      "Original 13″ MacBook Pro (2017) logic board, powered for LEDs and the cooling fan only. Not the brain — the watch movement.",
    x: 14,
    y: 22,
    w: 38,
    h: 36,
  },
  {
    id: "ps4",
    label: "PS4 Heatsink + Blower",
    role: "visible",
    one_liner: "Salvaged copper heatsink and centrifugal blower.",
    detail:
      "Used decoratively to cool the visible MBP board. The amber LED on the blower hub becomes part of the front-glass warmth.",
    x: 56,
    y: 22,
    w: 28,
    h: 28,
  },
  {
    id: "framework",
    label: "Framework Mainboard",
    role: "hidden",
    one_liner: "The actual brain — modern, upgradable.",
    detail:
      "Current-gen Framework laptop motherboard running Ubuntu Server 24.04 LTS. Hidden in the lower compartment behind the smoked glass.",
    x: 14,
    y: 64,
    w: 44,
    h: 22,
  },
  {
    id: "pi5",
    label: "Raspberry Pi 5 (8GB)",
    role: "hidden",
    one_liner: "Co-processor for the OLED, the dial, and aux services.",
    detail:
      "Drives the amber OLED, reads the brass rotary encoder, and handles auxiliary services like the always-on clock and Tailscale health.",
    x: 62,
    y: 64,
    w: 22,
    h: 22,
  },
  {
    id: "oled",
    label: "Amber OLED",
    role: "control",
    one_liner: "A discreet 1.3″ amber screen.",
    detail:
      'Cycles through clock, status, Claude usage, and last completion. "KODA · 14:32" / "KODA · WORKING" / "KODA · 5h 23m / 40h".',
    x: 64,
    y: 89,
    w: 18,
    h: 7,
  },
  {
    id: "dial",
    label: "Brass Rotary Encoder",
    role: "control",
    one_liner: "Knurled brass dial — turn to cycle, press to fire.",
    detail:
      "Lower-left of the front face. Turn to cycle the OLED display modes; press to fire pre-configured Claude Code prompts.",
    x: 16,
    y: 89,
    w: 14,
    h: 7,
  },
  {
    id: "io",
    label: "Rear I/O",
    role: "io",
    one_liner: "USB-C, Ethernet, brass push-button power, nameplate.",
    detail:
      "Engraved brass nameplate reads KODA · 01. 2TB external NVMe over USB-C, expandable. Ethernet for the always-on uplink.",
    x: 36,
    y: 5,
    w: 30,
    h: 9,
  },
];

const roleColor: Record<Part["role"], string> = {
  visible: "#5C3A21",
  hidden: "#8B7548",
  control: "#E8A33D",
  io: "#8B8074",
};

export default function Anatomy() {
  const [active, setActive] = useState<string | null>(parts[0].id);
  const [exploded, setExploded] = useState(false);

  const activePart = parts.find((p) => p.id === active) ?? null;

  return (
    <section id="anatomy" className="px-6 md:px-10 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="02"
          eyebrow="Anatomy"
          title={
            <>
              Two boards.
              <br />
              <em className="text-brass">One movement.</em>
            </>
          }
          lede="A hybrid architecture: the visible mechanism behind smoked glass is for the eye. The actual computing brain sits hidden, modern, and upgradable."
        />

        <div className="grid md:grid-cols-12 gap-10">
          {/* Schematic */}
          <div className="md:col-span-7">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] tracking-eyebrow uppercase text-warmgrey">
                ◇ Schematic — front elevation
              </span>
              <button
                onClick={() => setExploded((e) => !e)}
                className="font-mono text-[11px] tracking-eyebrow uppercase text-brass-deep hover:text-amber transition-colors"
              >
                {exploded ? "↺ Collapse" : "↗ Explode view"}
              </button>
            </div>

            <div
              className="relative aspect-[3/2] w-full border border-brass/40 bg-walnut-dark/95 overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, #3A2412, #1C1410)",
              }}
            >
              {/* faint grid */}
              <svg
                className="absolute inset-0 w-full h-full opacity-15"
                aria-hidden
              >
                <defs>
                  <pattern
                    id="grid"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="#B89968"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {parts.map((p) => {
                const isActive = active === p.id;
                const offsetX = exploded ? (p.x < 50 ? -3 : 3) : 0;
                const offsetY = exploded ? (p.y < 50 ? -2 : 2) : 0;
                return (
                  <motion.button
                    key={p.id}
                    onClick={() => setActive(p.id)}
                    onMouseEnter={() => setActive(p.id)}
                    initial={false}
                    animate={{
                      left: `${p.x + offsetX}%`,
                      top: `${p.y + offsetY}%`,
                      width: `${p.w}%`,
                      height: `${p.h}%`,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute group text-left ${
                      isActive ? "z-20" : "z-10"
                    }`}
                    style={{
                      borderColor: roleColor[p.role],
                      borderWidth: 1,
                      borderStyle: "solid",
                      background: isActive
                        ? `${roleColor[p.role]}33`
                        : "rgba(0,0,0,0.25)",
                      boxShadow: isActive
                        ? `0 0 0 1px ${roleColor[p.role]}, 0 0 24px ${roleColor[p.role]}55`
                        : "none",
                    }}
                  >
                    <span
                      className="absolute -top-5 left-0 font-mono text-[9px] tracking-eyebrow uppercase whitespace-nowrap"
                      style={{ color: roleColor[p.role] }}
                    >
                      {p.id}
                    </span>
                    <span className="absolute inset-0 flex items-end p-2 font-mono text-[10px] tracking-eyebrow uppercase text-ivory/80">
                      {p.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-5 flex flex-wrap gap-4 text-[11px] font-mono tracking-eyebrow uppercase">
              {(
                [
                  ["visible", "Visible behind glass"],
                  ["hidden", "Hidden brain"],
                  ["control", "Control surface"],
                  ["io", "I/O"],
                ] as const
              ).map(([role, label]) => (
                <div key={role} className="flex items-center gap-2">
                  <span
                    className="inline-block w-2.5 h-2.5"
                    style={{ background: roleColor[role as Part["role"]] }}
                  />
                  <span className="text-warmgrey">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="md:col-span-5">
            <AnimatePresence mode="wait">
              {activePart && (
                <motion.div
                  key={activePart.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-l-2 pl-6"
                  style={{ borderColor: roleColor[activePart.role] }}
                >
                  <div
                    className="eyebrow"
                    style={{ color: roleColor[activePart.role] }}
                  >
                    {activePart.role}
                  </div>
                  <h3 className="display-md text-[32px] mt-3">
                    {activePart.label}
                  </h3>
                  <p className="mt-4 italic text-warmgrey">
                    {activePart.one_liner}
                  </p>
                  <p className="mt-4 body-lg text-obsidian/80">
                    {activePart.detail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <ul className="mt-8 grid grid-cols-1 gap-1">
              {parts.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => setActive(p.id)}
                    className={`w-full text-left flex items-center justify-between py-2 px-3 font-mono text-[11px] tracking-eyebrow uppercase border-b border-brass/15 transition-colors ${
                      active === p.id
                        ? "text-obsidian bg-brass/10"
                        : "text-warmgrey hover:text-obsidian"
                    }`}
                  >
                    <span>{p.label}</span>
                    <span style={{ color: roleColor[p.role] }}>●</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
