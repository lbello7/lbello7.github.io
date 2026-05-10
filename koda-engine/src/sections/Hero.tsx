import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmartImage from "../components/SmartImage";

const angles = [
  {
    id: "hero",
    src: "./renders/hero.jpg",
    label: "Three-quarter",
    caption: "Walnut, brass, smoked glass.",
  },
  {
    id: "angle",
    src: "./renders/angle.jpg",
    label: "Lit angle",
    caption: "Internal LEDs through smoked pane.",
  },
  {
    id: "front",
    src: "./renders/front.jpg",
    label: "Front",
    caption: "Dial. OLED. The whole movement.",
  },
  {
    id: "rear",
    src: "./renders/rear.jpg",
    label: "Rear",
    caption: "USB-C, Ethernet, brass nameplate.",
  },
  {
    id: "detail",
    src: "./renders/detail.jpg",
    label: "Detail",
    caption: "Brass corner & Hausa diamond inlay.",
  },
] as const;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || lightbox) return;
    const t = setInterval(() => setActive((i) => (i + 1) % angles.length), 6000);
    return () => clearInterval(t);
  }, [paused, lightbox]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const current = angles[active];

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] pt-24 md:pt-28 pb-16 overflow-hidden grain"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 order-1"
        >
          <div className="eyebrow mb-6 flex items-center gap-3">
            <span className="text-amber">●</span>
            <span>Prototype · No. 01 · MMXXVI</span>
          </div>
          <h1 className="display-xl text-[56px] sm:text-[72px] md:text-[112px]">
            KODA<span className="text-brass align-middle mx-2">·</span>
            <span className="text-brass-deep">01</span>
          </h1>
          <p className="display-md text-[20px] sm:text-[22px] md:text-[26px] text-warmgrey mt-6 max-w-md italic">
            A bespoke desk object that runs your AI.
          </p>
          <div className="rule my-8 max-w-sm" />
          <p className="body-lg max-w-md">
            Walnut, brass, smoked glass. A salvaged movement behind the pane;
            a modern brain hidden beneath. Reachable from your pocket,
            running quietly through the night.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] sm:text-[12px] font-mono tracking-eyebrow uppercase">
            <a
              href="#anatomy"
              className="px-5 py-3 border border-obsidian text-obsidian hover:bg-obsidian hover:text-ivory transition-colors duration-500 ease-editorial"
            >
              Inspect the object →
            </a>
            <a href="#build" className="text-warmgrey hover:text-amber">
              View build ↓
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="md:col-span-7 order-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="relative w-full aspect-[4/3] md:aspect-[3/2] bg-walnut-dark/95 border border-brass/30 cursor-zoom-in overflow-hidden"
            onClick={() => setLightbox(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <SmartImage
                  src={current.src}
                  alt={`KODA · 01 — ${current.label}`}
                  placeholderLabel={`${current.label} render`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-3 pointer-events-none">
              <div className="font-mono text-[10px] tracking-eyebrow uppercase text-ivory/85 bg-black/40 backdrop-blur-sm px-3 py-2 max-w-[70%]">
                ◇ {current.label} — <span className="text-brass">{current.caption}</span>
              </div>
              <div className="font-mono text-[10px] tracking-eyebrow uppercase text-ivory/70 bg-black/40 backdrop-blur-sm px-3 py-2">
                ⤢ Tap to enlarge
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-5 gap-2">
            {angles.map((a, i) => (
              <button
                key={a.id}
                onClick={() => {
                  setActive(i);
                  setPaused(true);
                }}
                aria-label={`Show ${a.label}`}
                className={`relative aspect-[4/3] overflow-hidden border transition-all ${
                  i === active
                    ? "border-amber"
                    : "border-brass/20 hover:border-brass/60"
                }`}
              >
                <SmartImage
                  src={a.src}
                  alt={a.label}
                  placeholderLabel={a.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span
                  className={`absolute bottom-0 left-0 right-0 px-1 py-0.5 font-mono text-[8px] sm:text-[9px] tracking-eyebrow uppercase ${
                    i === active
                      ? "bg-amber text-obsidian"
                      : "bg-black/55 text-ivory/80"
                  }`}
                >
                  0{i + 1}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setLightbox(false)}
          >
            <button
              aria-label="Close"
              className="absolute top-4 right-4 font-mono text-[11px] tracking-eyebrow uppercase text-ivory/80 hover:text-amber"
              onClick={() => setLightbox(false)}
            >
              ✕ Close (esc)
            </button>
            <SmartImage
              src={current.src}
              alt={current.label}
              placeholderLabel={current.label}
              className="max-w-full max-h-full object-contain"
            />

            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {angles.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setActive(i)}
                  className={`w-16 sm:w-20 aspect-[4/3] overflow-hidden border ${
                    i === active ? "border-amber" : "border-brass/30"
                  }`}
                  aria-label={a.label}
                >
                  <SmartImage
                    src={a.src}
                    alt={a.label}
                    placeholderLabel={a.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
