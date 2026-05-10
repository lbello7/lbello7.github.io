import SectionHeader from "../components/SectionHeader";
import Inspector, { type InspectorView, roleColor } from "../components/Inspector";

const views: InspectorView[] = [
  {
    id: "front",
    src: "./renders/front.png",
    label: "Front",
    hotspots: [
      {
        id: "hausa",
        x: 50,
        y: 16,
        label: "Hausa diamond inlay",
        role: "enclosure",
        one_liner: "Hand-inlaid matte brass, top edge.",
        detail:
          "A traditional Hausa diamond pattern hand-inlaid in matte brass along the top edge — quietly West African, a small signature you only notice up close.",
      },
      {
        id: "corner-tl",
        x: 7,
        y: 12,
        label: "Polished corner bracket",
        role: "enclosure",
        one_liner: "Antique brass corner — one of four.",
        detail:
          "Polished antique brass corner brackets at all four corners, riveted into the walnut. The same family of hardware you find on a steamer trunk or a Pelican case.",
      },
      {
        id: "glass",
        x: 50,
        y: 45,
        label: "Smoked glass front",
        role: "enclosure",
        one_liner: "Tinted pane revealing the visible movement.",
        detail:
          "A single piece of smoked glass, gasket-sealed against the walnut. Lets the amber LEDs glow through and frames the MBP board like a watch dial.",
      },
      {
        id: "mbp",
        x: 65,
        y: 45,
        label: "MBP logic board (2017)",
        role: "visible",
        one_liner: "The aesthetic mechanism — visible, lit, decorative.",
        detail:
          "Original 13″ MacBook Pro (2017) logic board, powered for LEDs and the cooling fan only. Not the brain — the watch movement. Apple logo intentional.",
      },
      {
        id: "ps4",
        x: 25,
        y: 45,
        label: "PS4 heatsink + blower",
        role: "visible",
        one_liner: "Salvaged copper heatsink, centrifugal blower.",
        detail:
          "Used decoratively to cool the visible MBP board. The copper heatsink picks up the brass tones; the blower hub becomes part of the front-glass warmth.",
      },
      {
        id: "dial",
        x: 12,
        y: 80,
        label: "Brass rotary encoder",
        role: "control",
        one_liner: "Knurled brass dial — turn to cycle, press to fire.",
        detail:
          "Lower-left of the front face. Turn to cycle the OLED display modes; press to fire pre-configured Claude Code prompts.",
      },
      {
        id: "oled",
        x: 84,
        y: 84,
        label: "Amber OLED",
        role: "control",
        one_liner: "Discreet 1.3″ amber screen.",
        detail:
          'Cycles through clock, status, Claude usage, and last completion. "KODA · 14:32" / "KODA · WORKING" / "KODA · 5h 23m / 40h".',
      },
    ],
  },
  {
    id: "rear",
    src: "./renders/rear.png",
    label: "Rear",
    hotspots: [
      {
        id: "nameplate",
        x: 60,
        y: 78,
        label: "Engraved brass nameplate",
        role: "enclosure",
        one_liner: 'Reads "KODA · 01".',
        detail:
          "Engraved brass nameplate centered on the rear panel. Each Engine gets a unique serial — KODA · 01 is the prototype.",
      },
      {
        id: "io",
        x: 47,
        y: 50,
        label: "USB-C + Ethernet",
        role: "io",
        one_liner: "USB-C for storage, Ethernet for the always-on uplink.",
        detail:
          "USB-C carries the 2 TB external NVMe (expandable). Ethernet is the always-on uplink for Tailscale and remote agent sessions.",
      },
      {
        id: "power",
        x: 80,
        y: 50,
        label: "Brass push-button power",
        role: "io",
        one_liner: "Polished brass momentary switch.",
        detail:
          "A polished brass momentary push-button. Long-press for hard power; short-press wakes the Pi 5 from low-power.",
      },
      {
        id: "framework",
        x: 25,
        y: 45,
        label: "Framework mainboard (hidden)",
        role: "hidden",
        one_liner: "The actual brain — modern, upgradable.",
        detail:
          "Current-gen Framework laptop motherboard running Ubuntu Server 24.04 LTS. Hidden inside the lower compartment. Swappable when AMD/Intel ship the next generation.",
      },
      {
        id: "pi",
        x: 25,
        y: 65,
        label: "Raspberry Pi 5 (hidden)",
        role: "hidden",
        one_liner: "Co-processor for the OLED, dial, and aux services.",
        detail:
          "Drives the amber OLED, reads the brass rotary encoder, and runs auxiliary services like the always-on clock and Tailscale health.",
      },
    ],
  },
];

export default function Anatomy() {
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
          lede="Tap a hotspot to inspect a component. Toggle between front and rear to see the visible mechanism, the hidden brain, the controls, and the I/O."
        />

        <Inspector views={views} />

        {/* Legend */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3 text-[11px] font-mono tracking-eyebrow uppercase">
          {(
            [
              ["visible", "Visible behind glass"],
              ["hidden", "Hidden brain"],
              ["control", "Control surface"],
              ["io", "I/O"],
              ["enclosure", "Enclosure"],
            ] as const
          ).map(([role, label]) => (
            <div key={role} className="flex items-center gap-2">
              <span
                className="inline-block w-2.5 h-2.5"
                style={{
                  background:
                    roleColor[role as keyof typeof roleColor],
                }}
              />
              <span className="text-warmgrey">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
