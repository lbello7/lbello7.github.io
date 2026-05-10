import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";

const moments = [
  {
    time: "07:00",
    title: "Overnight review",
    body: "Wake up. The dial reads KODA · LAST: BoE summary 04:21. Open the phone, browse the agent's overnight commits over coffee, approve and ship.",
    glyph: "☼",
  },
  {
    time: "10:00",
    title: "Midday brief",
    body: "Press the dial. KODA dispatches a pre-configured prompt: a Markets brief from the day's filings, dropped into Obsidian and surfaced on the phone.",
    glyph: "◐",
  },
  {
    time: "13:00",
    title: "Quiet hours",
    body: "OLED reads KODA · IDLE. Engine pulls 12W. Nextcloud quietly indexes new photos; Obsidian sync hums in the background.",
    glyph: "◇",
  },
  {
    time: "18:00",
    title: "Koda dev session",
    body: "From a café across town, open Claude on the phone. SSH through Tailscale to the Engine. Ship a feature for Koda — production environment, fully local.",
    glyph: "✦",
  },
  {
    time: "23:00",
    title: "Set & forget",
    body: "Hand the agent a ten-hour task. Turn the dial to KODA · WORKING. The amber LED settles into the smoked glass. Sleep.",
    glyph: "☾",
  },
];

export default function DayWithKoda() {
  return (
    <section id="day" className="px-6 md:px-10 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="05"
          eyebrow="A day with KODA"
          title={
            <>
              From dawn,
              <br />
              <em className="text-brass">through to night.</em>
            </>
          }
          lede="A typical day with the Engine — present without being demanding, an instrument that does its work while you do yours."
        />

        <ol className="relative border-l border-brass/40 ml-3 md:ml-10 space-y-16">
          {moments.map((m, i) => (
            <motion.li
              key={m.time}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pl-8 md:pl-12 relative"
            >
              {/* node */}
              <span className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-amber shadow-[0_0_10px_#E8A33D]" />
              <div className="grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-2">
                  <div className="font-mono text-amber text-[28px] tabular-nums leading-none">
                    {m.time}
                  </div>
                  <div className="eyebrow mt-2">Hour {String(i + 1).padStart(2, "0")}</div>
                </div>
                <div className="md:col-span-2 flex md:justify-center">
                  <span
                    className="font-display text-[64px] text-brass leading-none select-none"
                    aria-hidden
                  >
                    {m.glyph}
                  </span>
                </div>
                <div className="md:col-span-8">
                  <h3 className="display-md text-[28px]">{m.title}</h3>
                  <p className="body-lg mt-3 text-warmgrey max-w-xl">
                    {m.body}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
