import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";

/**
 * Three-tier diagram:
 *   PUBLIC   — VPS hosting public sites (Marza, Koda landing)
 *   TUNNEL   — Tailscale (and Tailscale Funnel)
 *   PRIVATE  — The Engine (Framework board · MBP board decorative · Pi 5)
 *   CLIENT   — User's phone, running Claude mobile app
 */

const W = 1100;
const H = 600;

type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  tier: "client" | "tunnel" | "public" | "private" | "decor";
};

const nodes: Node[] = [
  { id: "phone", x: 60, y: 240, w: 130, h: 200, label: "iPhone", sub: "Claude mobile app", tier: "client" },
  { id: "vps", x: 60, y: 50, w: 200, h: 110, label: "VPS", sub: "Marza · Koda landing", tier: "public" },
  { id: "tailscale", x: 360, y: 250, w: 220, h: 100, label: "Tailscale", sub: "Tailscale Funnel · WireGuard mesh", tier: "tunnel" },
  { id: "engine", x: 700, y: 60, w: 360, h: 480, label: "KODA · 01", sub: "Engine — private layer", tier: "private" },
  // children inside engine
  { id: "framework", x: 740, y: 130, w: 280, h: 80, label: "Framework Mainboard", sub: "Ubuntu Server 24.04 LTS", tier: "private" },
  { id: "mbp", x: 740, y: 230, w: 280, h: 80, label: "MBP Logic Board", sub: "Decorative — visible mechanism", tier: "decor" },
  { id: "pi", x: 740, y: 330, w: 280, h: 80, label: "Raspberry Pi 5 (8GB)", sub: "OLED · dial · aux services", tier: "private" },
  { id: "nvme", x: 740, y: 430, w: 280, h: 80, label: "2TB NVMe over USB-C", sub: "Storage · expandable", tier: "private" },
];

const tierColor: Record<Node["tier"], string> = {
  client: "#8B8074",
  tunnel: "#E8A33D",
  public: "#5C3A21",
  private: "#B89968",
  decor: "#3A2412",
};

type Flow = { from: string; to: string; via?: string; label?: string; bidir?: boolean };

const flows: Flow[] = [
  { from: "phone", to: "tailscale", label: "Tailscale" },
  { from: "tailscale", to: "engine", label: "Mesh" },
  { from: "vps", to: "tailscale", label: "Funnel" },
  { from: "framework", to: "mbp", bidir: false },
  { from: "framework", to: "pi", bidir: true },
  { from: "framework", to: "nvme", bidir: true },
];

function nodeAnchor(n: Node, side: "right" | "left" | "top" | "bottom") {
  switch (side) {
    case "right":
      return { x: n.x + n.w, y: n.y + n.h / 2 };
    case "left":
      return { x: n.x, y: n.y + n.h / 2 };
    case "top":
      return { x: n.x + n.w / 2, y: n.y };
    case "bottom":
      return { x: n.x + n.w / 2, y: n.y + n.h };
  }
}

function pathFor(from: Node, to: Node) {
  // simple right→left or bottom→top path with a midpoint S-curve
  const a = nodeAnchor(from, from.x < to.x ? "right" : "left");
  const b = nodeAnchor(to, to.x < from.x ? "right" : "left");
  const mx = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}

export default function Architecture() {
  const byId = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <section id="architecture" className="px-6 md:px-10 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="04"
          eyebrow="Architecture"
          title={
            <>
              Three tiers.
              <br />
              <em className="text-brass">One mesh.</em>
            </>
          }
          lede="A public layer for the world. A private Engine for the work. A Tailscale tunnel between them — and to the phone in your pocket."
        />

        <div className="md:hidden mb-4 font-mono text-[10px] tracking-eyebrow uppercase text-warmgrey flex items-center gap-2">
          <span className="text-amber">→</span>
          <span>Scroll horizontally to inspect</span>
        </div>

        <div className="border border-brass/30 bg-ivory p-4 md:p-8 relative overflow-x-auto">
          <div className="min-w-[820px] aspect-[11/6]">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
              {/* tier labels */}
              <g
                fontFamily="JetBrains Mono"
                fontSize="11"
                letterSpacing="2"
                fill="#8B8074"
              >
                <text x={60} y={28}>
                  PUBLIC
                </text>
                <text x={360} y={28}>
                  TUNNEL
                </text>
                <text x={700} y={28}>
                  PRIVATE
                </text>
                <text x={60} y={224}>
                  CLIENT
                </text>
              </g>

              {/* tier divider lines */}
              <line
                x1={330}
                y1={20}
                x2={330}
                y2={H - 20}
                stroke="#B89968"
                strokeOpacity="0.25"
                strokeDasharray="2 4"
              />
              <line
                x1={660}
                y1={20}
                x2={660}
                y2={H - 20}
                stroke="#B89968"
                strokeOpacity="0.25"
                strokeDasharray="2 4"
              />

              {/* engine container outline */}
              <rect
                x={byId("engine").x}
                y={byId("engine").y}
                width={byId("engine").w}
                height={byId("engine").h}
                fill="none"
                stroke="#B89968"
                strokeOpacity="0.5"
                strokeDasharray="4 3"
              />

              {/* flows */}
              {flows.map((f, i) => {
                const a = byId(f.from);
                const b = byId(f.to);
                const d = pathFor(a, b);
                const color =
                  f.from === "framework" ? "#B89968" : "#E8A33D";
                return (
                  <g key={i}>
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={color}
                      strokeWidth={1.4}
                      strokeOpacity={0.85}
                      className="dataflow"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </g>
                );
              })}

              {/* nodes */}
              {nodes.map((n) => (
                <motion.g
                  key={n.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height={n.h}
                    rx={2}
                    fill={n.tier === "decor" ? "#F5F1E8" : "#F5F1E8"}
                    stroke={tierColor[n.tier]}
                    strokeWidth={n.id === "engine" ? 0 : 1.2}
                    strokeDasharray={n.tier === "decor" ? "3 3" : undefined}
                  />
                  <text
                    x={n.x + 14}
                    y={n.y + 26}
                    fontFamily="Fraunces"
                    fontSize="18"
                    fill="#1C1C1C"
                  >
                    {n.label}
                  </text>
                  {n.sub && (
                    <text
                      x={n.x + 14}
                      y={n.y + 46}
                      fontFamily="JetBrains Mono"
                      fontSize="10"
                      letterSpacing="1.4"
                      fill={tierColor[n.tier]}
                    >
                      {n.sub.toUpperCase()}
                    </text>
                  )}
                  {/* Status dot */}
                  <circle
                    cx={n.x + n.w - 16}
                    cy={n.y + 16}
                    r={4}
                    fill={tierColor[n.tier]}
                  >
                    {n.tier !== "decor" && (
                      <animate
                        attributeName="opacity"
                        values="0.3;1;0.3"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                </motion.g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px] font-mono tracking-eyebrow uppercase">
            {(
              [
                ["public", "Public layer · world-facing"],
                ["tunnel", "Tunnel · Tailscale mesh"],
                ["private", "Private · the Engine"],
                ["decor", "Decorative · visible mechanism"],
              ] as const
            ).map(([t, label]) => (
              <div key={t} className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5"
                  style={{ background: tierColor[t as Node["tier"]] }}
                />
                <span className="text-warmgrey">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
