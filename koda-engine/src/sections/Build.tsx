import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";

type Part = {
  group: "Brain" | "Aesthetic mechanism" | "Control surface" | "Enclosure" | "Misc";
  name: string;
  note?: string;
  cost: number;
  donor?: boolean;
};

const parts: Part[] = [
  { group: "Brain", name: "Framework laptop mainboard (current gen)", note: "Ryzen AI 9 HX 370, 32GB", cost: 720 },
  { group: "Brain", name: "Ubuntu Server 24.04 LTS", note: "Free", cost: 0 },
  { group: "Brain", name: "Raspberry Pi 5 (8GB)", note: "Co-processor", cost: 80 },
  { group: "Brain", name: "2TB NVMe + USB-C enclosure", note: "Expandable storage", cost: 180 },
  { group: "Aesthetic mechanism", name: "MacBook Pro 13″ 2017 logic board", note: "Donor object", cost: 0, donor: true },
  { group: "Aesthetic mechanism", name: "PS4 copper heatsink + centrifugal blower", note: "Salvaged", cost: 35 },
  { group: "Aesthetic mechanism", name: "12V LED rail (warm 2200K)", cost: 18 },
  { group: "Control surface", name: "Brass rotary encoder w/ push (24-step)", cost: 28 },
  { group: "Control surface", name: "1.3″ amber OLED (SSD1306)", cost: 14 },
  { group: "Control surface", name: "Brass push-button (rear)", cost: 12 },
  { group: "Enclosure", name: "Walnut billet, planed", note: "30 × 12 × 10 cm", cost: 95 },
  { group: "Enclosure", name: "Smoked glass front panel, cut to size", cost: 60 },
  { group: "Enclosure", name: "Antique brass corner brackets ×4", note: "Polished", cost: 48 },
  { group: "Enclosure", name: "Hand-inlaid Hausa brass strip", note: "Custom", cost: 70 },
  { group: "Enclosure", name: "Engraved brass nameplate — KODA · 01", cost: 35 },
  { group: "Misc", name: "Cabling, fasteners, finishing oils", cost: 45 },
];

const phases = [
  {
    n: "Phase 01",
    title: "Get Linux running",
    body: "Bench-build the Framework board; install Ubuntu Server; bring up Tailscale; reach the engine from the phone. No enclosure yet.",
    weeks: "Wk 1–2",
  },
  {
    n: "Phase 02",
    title: "Enclosure",
    body: "Mill walnut billet; cut smoked glass; mount corner brackets; hand-inlay the Hausa strip; engrave nameplate.",
    weeks: "Wk 3–6",
  },
  {
    n: "Phase 03",
    title: "Integrations",
    body: "Wire dial + OLED to Pi 5; integrate MBP board for LEDs only; commission as a 24/7 server; build the Claude Code dial-fire prompts.",
    weeks: "Wk 7–9",
  },
];

export default function Build() {
  const total = parts.reduce((acc, p) => acc + p.cost, 0);

  return (
    <section id="build" className="px-6 md:px-10 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="06"
          eyebrow="The build"
          title={
            <>
              Bill of materials,
              <br />
              <em className="text-brass">staged to ship.</em>
            </>
          }
          lede="A targeted bill of materials and a phased build plan. Bench-first, then enclosure, then integrations."
        />

        {/* Phases */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {phases.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="border border-brass/30 p-6 bg-ivory relative"
            >
              <div className="eyebrow mb-3">
                {p.n} · {p.weeks}
              </div>
              <h3 className="display-md text-[26px] mb-3">{p.title}</h3>
              <p className="text-warmgrey leading-relaxed">{p.body}</p>
              <span
                className="absolute top-0 right-0 font-display text-[40px] text-brass/60 px-4 leading-none"
                aria-hidden
              >
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Parts table */}
        <div className="border-t border-b border-obsidian/15">
          <div className="hidden md:grid grid-cols-12 py-4 font-mono text-[10px] tracking-eyebrow uppercase text-warmgrey">
            <div className="col-span-3">Group</div>
            <div className="col-span-7">Item</div>
            <div className="col-span-2 text-right">Cost (£)</div>
          </div>

          {parts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.02 }}
              className="py-4 border-t border-brass/15 hover:bg-brass/5 transition-colors md:grid md:grid-cols-12 md:items-baseline"
            >
              {/* Mobile layout */}
              <div className="md:hidden">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <div className="font-mono text-[10px] tracking-eyebrow uppercase text-brass-deep">
                    {p.group}
                  </div>
                  <div className="font-mono tabular-nums text-[15px]">
                    {p.cost === 0 ? (
                      <span className="text-warmgrey">—</span>
                    ) : (
                      `£${p.cost.toLocaleString()}`
                    )}
                  </div>
                </div>
                <div className="text-obsidian">{p.name}</div>
                {p.note && (
                  <div className="text-warmgrey text-sm italic mt-0.5">
                    {p.note}
                    {p.donor && (
                      <span className="ml-2 font-mono text-[10px] tracking-eyebrow uppercase text-amber not-italic">
                        ◇ Donor object
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Desktop layout */}
              <div className="hidden md:block md:col-span-3 font-mono text-[11px] tracking-eyebrow uppercase text-brass-deep">
                {p.group}
              </div>
              <div className="hidden md:block md:col-span-7">
                <div className="text-obsidian">{p.name}</div>
                {p.note && (
                  <div className="text-warmgrey text-sm italic mt-0.5">
                    {p.note}
                    {p.donor && (
                      <span className="ml-2 font-mono text-[10px] tracking-eyebrow uppercase text-amber not-italic">
                        ◇ Donor object
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="hidden md:block md:col-span-2 text-right font-mono tabular-nums">
                {p.cost === 0 ? (
                  <span className="text-warmgrey">—</span>
                ) : (
                  `£${p.cost.toLocaleString()}`
                )}
              </div>
            </motion.div>
          ))}

          <div className="grid grid-cols-12 py-6 border-t-2 border-obsidian items-baseline gap-x-3">
            <div className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-eyebrow uppercase text-obsidian">
              Total
            </div>
            <div className="hidden md:block col-span-7 text-warmgrey italic text-sm">
              Excluding donor MacBook Pro logic board.
            </div>
            <div className="col-span-12 md:col-span-2 text-right font-display text-[24px] md:text-[28px] tabular-nums">
              £{total.toLocaleString()}
            </div>
            <div className="md:hidden col-span-12 text-warmgrey italic text-sm mt-1">
              Excluding donor MacBook Pro logic board.
            </div>
          </div>
        </div>

        <div className="mt-10 text-warmgrey text-sm font-mono tracking-eyebrow uppercase">
          ◇ Estimates · GBP · subject to sourcing
        </div>
      </div>
    </section>
  );
}
