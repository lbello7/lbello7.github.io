import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import SectionHeader from "../components/SectionHeader";

type OLEDState = {
  text: string;
  hint: string;
  flavor: string;
};

const states: OLEDState[] = [
  { text: "KODA · 14:32", hint: "Clock", flavor: "GMT · drift ±0.4s/day" },
  { text: "KODA · WORKING", hint: "Status", flavor: "Agent active · Claude Code" },
  { text: "KODA · IDLE", hint: "Status", flavor: "Standby · 12W" },
  { text: "KODA · 5h 23m / 40h", hint: "Usage", flavor: "Claude weekly budget" },
  { text: "KODA · LAST: BoE summary 14:21", hint: "Last", flavor: "Last completion" },
];

export default function Interaction() {
  const [idx, setIdx] = useState(0);
  const [pressed, setPressed] = useState(false);
  const [tickTime, setTickTime] = useState(0);
  const dialControls = useAnimation();
  const rotationRef = useRef(0);

  const cycle = async () => {
    rotationRef.current += 36;
    setTickTime(Date.now());
    setIdx((i) => (i + 1) % states.length);
    await dialControls.start({
      rotate: rotationRef.current,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    });
  };

  const press = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 280);
  };

  // Keyboard control: → / Space
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") cycle();
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        press();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = states[idx];

  return (
    <section id="interaction" className="px-6 md:px-10 py-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="03"
          eyebrow="Interaction"
          title={
            <>
              Turn to cycle.
              <br />
              <em className="text-brass">Press to fire.</em>
            </>
          }
          lede="A single brass dial governs the surface. Turn it to cycle through OLED display modes. Press it to dispatch a pre-configured Claude Code prompt."
        />

        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Front-panel mock */}
          <div className="md:col-span-7">
            <div className="relative aspect-[3/2] sm:aspect-[2/1] md:aspect-[5/2] w-full">
              {/* Walnut panel */}
              <div
                className="absolute inset-0 rounded-sm shadow-2xl"
                style={{
                  background:
                    "linear-gradient(160deg, #5C3A21 0%, #3A2412 50%, #2A1808 100%)",
                  boxShadow:
                    "inset 0 1px 0 #8B5E3A, inset 0 -2px 8px rgba(0,0,0,0.6), 0 30px 60px rgba(0,0,0,0.25)",
                }}
              />

              {/* Hausa diamond strip top */}
              <div
                className="absolute left-4 right-4 top-3 h-3"
                aria-hidden
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #B89968 0 6px, #3A2412 6px 12px)",
                  opacity: 0.7,
                }}
              />

              {/* Smoked glass window */}
              <div
                className="absolute left-[6%] right-[6%] top-[18%] bottom-[42%] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(22,20,18,0.9), rgba(22,20,18,0.8))",
                  border: "1px solid rgba(184,153,104,0.35)",
                }}
              >
                {/* Hint of board behind */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 60%, #E8A33D 0px, transparent 50px), radial-gradient(circle at 70% 40%, #B89968 0px, transparent 80px)",
                    filter: "blur(8px)",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent 49%, #8B7548 49% 51%, transparent 51%), linear-gradient(0deg, transparent 70%, #1C2C1C 70% 100%)",
                    backgroundSize: "60px 100%, 100% 100%",
                  }}
                />
              </div>

              {/* OLED — lower-right */}
              <div
                className="absolute right-[6%] bottom-[8%] w-[34%] h-[24%] flex items-center justify-center px-3"
                style={{
                  background: "#0A0806",
                  border: "1px solid rgba(184,153,104,0.4)",
                  boxShadow:
                    "inset 0 0 12px rgba(232,163,61,0.2), inset 0 0 1px rgba(232,163,61,0.4)",
                }}
              >
                <motion.div
                  key={tickTime}
                  className="oled-flicker font-mono text-amber leading-tight w-full text-center"
                  style={{
                    fontSize: "clamp(10px, 1.6vw, 16px)",
                    textShadow:
                      "0 0 6px rgba(232,163,61,0.7), 0 0 12px rgba(232,163,61,0.3)",
                  }}
                >
                  {current.text}
                </motion.div>
              </div>

              {/* Dial — lower-left */}
              <button
                onClick={cycle}
                onContextMenu={(e) => {
                  e.preventDefault();
                  press();
                }}
                aria-label="Brass dial — left click cycles OLED, right click presses"
                className="absolute left-[6%] bottom-[8%] aspect-square h-[40%] cursor-pointer group"
              >
                {/* base bezel */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #5C3A21, #2A1808)",
                  }}
                />
                {/* knurled brass dial */}
                <motion.div
                  animate={dialControls}
                  className="absolute inset-[10%] rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #D4B585, #8B7548, #D4B585, #8B7548, #D4B585, #8B7548, #D4B585, #8B7548, #D4B585)",
                    boxShadow:
                      "inset 0 2px 6px rgba(255,255,255,0.25), inset 0 -2px 6px rgba(0,0,0,0.4), 0 4px 14px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* knurl notches */}
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute left-1/2 top-0 origin-bottom"
                      style={{
                        width: 2,
                        height: "12%",
                        background: "rgba(0,0,0,0.35)",
                        transform: `translateX(-50%) rotate(${i * 15}deg)`,
                        transformOrigin: "50% 200%",
                      }}
                    />
                  ))}
                  {/* indicator dot */}
                  <span
                    className="absolute left-1/2 top-[18%] -translate-x-1/2 rounded-full"
                    style={{
                      width: "10%",
                      aspectRatio: "1",
                      background: "#1C1C1C",
                      boxShadow: "inset 0 1px 0 rgba(0,0,0,0.4)",
                    }}
                  />
                </motion.div>
                {/* press flash */}
                <motion.div
                  className="absolute inset-[10%] rounded-full pointer-events-none"
                  animate={{
                    boxShadow: pressed
                      ? "0 0 0 6px rgba(232,163,61,0.4), 0 0 30px rgba(232,163,61,0.6)"
                      : "0 0 0 0 rgba(232,163,61,0)",
                  }}
                  transition={{ duration: 0.28 }}
                />
              </button>

              {/* Brass corner brackets */}
              {(
                [
                  ["top-2", "left-2"],
                  ["top-2", "right-2"],
                  ["bottom-2", "left-2"],
                  ["bottom-2", "right-2"],
                ] as const
              ).map(([v, h], i) => (
                <span
                  key={i}
                  aria-hidden
                  className={`absolute ${v} ${h}`}
                  style={{
                    width: 22,
                    height: 22,
                    background:
                      "linear-gradient(135deg, #D4B585, #8B7548)",
                    clipPath:
                      i === 0
                        ? "polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)"
                        : i === 1
                        ? "polygon(0 0, 100% 0, 100% 100%, 70% 100%, 70% 30%, 0 30%)"
                        : i === 2
                        ? "polygon(0 0, 30% 0, 30% 70%, 100% 70%, 100% 100%, 0 100%)"
                        : "polygon(70% 0, 100% 0, 100% 100%, 0 100%, 0 70%, 70% 70%)",
                  }}
                />
              ))}
            </div>

            {/* Action hints */}
            <div className="mt-6 flex flex-wrap gap-6 text-[11px] font-mono tracking-eyebrow uppercase text-warmgrey">
              <span>← Click dial · turn</span>
              <span>← Right-click · press</span>
              <span>↑ → · turn (kbd)</span>
              <span>␣ space · press (kbd)</span>
            </div>
          </div>

          {/* Live state readout */}
          <div className="md:col-span-5">
            <div className="border border-brass/30 bg-walnut-dark/95 p-8 text-ivory">
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-[10px] tracking-eyebrow uppercase text-amber">
                  ● Live OLED
                </span>
                <span className="font-mono text-[10px] tracking-eyebrow uppercase text-warmgrey">
                  {idx + 1} / {states.length}
                </span>
              </div>

              <motion.div
                key={current.text + tickTime}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="font-mono text-amber text-[24px] mb-3"
                  style={{
                    textShadow:
                      "0 0 8px rgba(232,163,61,0.7), 0 0 18px rgba(232,163,61,0.3)",
                  }}
                >
                  {current.text}
                </div>
                <div className="font-mono text-[11px] tracking-eyebrow uppercase text-brass mb-4">
                  {current.hint}
                </div>
                <p className="text-ivory/70 italic">{current.flavor}</p>
              </motion.div>

              <div className="rule my-6 opacity-30" />

              <div>
                <div className="font-mono text-[10px] tracking-eyebrow uppercase text-warmgrey mb-3">
                  Press fires (example prompts)
                </div>
                <ul className="font-mono text-[12px] text-ivory/80 space-y-1.5">
                  <li>→ summarise overnight agent runs</li>
                  <li>→ start BoE → Markets brief</li>
                  <li>→ pause / resume current task</li>
                  <li>→ post Koda dev status to phone</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
