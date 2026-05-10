import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmartImage from "./SmartImage";

export type Hotspot = {
  id: string;
  // Position as % of the image (0-100)
  x: number;
  y: number;
  label: string;
  role: "visible" | "hidden" | "control" | "io" | "enclosure";
  one_liner: string;
  detail: string;
};

export type InspectorView = {
  id: string;
  src: string;
  label: string;
  hotspots: Hotspot[];
};

type Props = {
  views: InspectorView[];
};

export const roleColor: Record<Hotspot["role"], string> = {
  visible: "#5C3A21",
  hidden: "#8B7548",
  control: "#E8A33D",
  io: "#8B8074",
  enclosure: "#B89968",
};

export default function Inspector({ views }: Props) {
  const [viewIdx, setViewIdx] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(
    views[0].hotspots[0]?.id ?? null,
  );

  const view = views[viewIdx];
  const active = view.hotspots.find((h) => h.id === activeHotspotId) ?? null;

  return (
    <div className="grid md:grid-cols-12 gap-6 md:gap-10">
      {/* Image with hotspots */}
      <div className="md:col-span-7">
        {/* View toggle */}
        {views.length > 1 && (
          <div className="flex gap-2 mb-3">
            {views.map((v, i) => (
              <button
                key={v.id}
                onClick={() => {
                  setViewIdx(i);
                  setActiveHotspotId(v.hotspots[0]?.id ?? null);
                }}
                className={`font-mono text-[10px] tracking-eyebrow uppercase px-3 py-2 border transition-colors ${
                  i === viewIdx
                    ? "border-amber text-obsidian bg-amber/15"
                    : "border-brass/30 text-warmgrey hover:border-brass/60 hover:text-obsidian"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative w-full aspect-[3/2] bg-walnut-dark/95 border border-brass/30 overflow-hidden">
          <SmartImage
            src={view.src}
            alt={view.label}
            placeholderLabel={`${view.label} render`}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Hotspot dots */}
          {view.hotspots.map((h, i) => {
            const isActive = h.id === activeHotspotId;
            return (
              <button
                key={h.id}
                onClick={() => setActiveHotspotId(h.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                aria-label={`Inspect: ${h.label}`}
              >
                <span className="relative flex items-center justify-center">
                  {/* Pulse ring */}
                  <span
                    className="absolute inline-flex h-7 w-7 rounded-full opacity-60 animate-ping"
                    style={{ background: roleColor[h.role] }}
                  />
                  {/* Solid dot */}
                  <span
                    className={`relative inline-flex items-center justify-center rounded-full font-mono font-medium transition-all ${
                      isActive ? "h-7 w-7 text-[11px]" : "h-6 w-6 text-[10px]"
                    }`}
                    style={{
                      background: isActive ? roleColor[h.role] : "#1C1C1C",
                      color: isActive ? "#1C1C1C" : roleColor[h.role],
                      border: `1.5px solid ${roleColor[h.role]}`,
                      boxShadow: isActive
                        ? `0 0 16px ${roleColor[h.role]}AA`
                        : "0 2px 8px rgba(0,0,0,0.5)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                {/* Hover/active label */}
                <span
                  className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-eyebrow uppercase px-2 py-1 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    background: "rgba(0,0,0,0.65)",
                    color: roleColor[h.role],
                    border: `1px solid ${roleColor[h.role]}55`,
                  }}
                >
                  {h.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile-friendly chip list */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {view.hotspots.map((h, i) => (
            <button
              key={h.id}
              onClick={() => setActiveHotspotId(h.id)}
              className={`font-mono text-[10px] tracking-eyebrow uppercase px-2.5 py-1.5 border transition-colors ${
                h.id === activeHotspotId
                  ? "bg-obsidian text-ivory border-obsidian"
                  : "border-brass/25 text-warmgrey hover:text-obsidian hover:border-brass/60"
              }`}
            >
              {String(i + 1).padStart(2, "0")} · {h.label}
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="md:col-span-5">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-2 pl-6 sticky top-24"
              style={{ borderColor: roleColor[active.role] }}
            >
              <div
                className="eyebrow"
                style={{ color: roleColor[active.role] }}
              >
                {active.role}
              </div>
              <h3 className="display-md text-[26px] sm:text-[32px] mt-3">
                {active.label}
              </h3>
              <p className="mt-4 italic text-warmgrey">{active.one_liner}</p>
              <p className="mt-4 body-lg text-obsidian/80 text-[16px] sm:text-[19px]">
                {active.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
