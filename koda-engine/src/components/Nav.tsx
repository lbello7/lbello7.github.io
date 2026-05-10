import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const items = [
  { id: "hero", label: "01 — Object" },
  { id: "anatomy", label: "02 — Anatomy" },
  { id: "interaction", label: "03 — Interaction" },
  { id: "architecture", label: "04 — Architecture" },
  { id: "day", label: "05 — A Day" },
  { id: "build", label: "06 — Build" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-editorial ${
        scrolled
          ? "bg-ivory/85 backdrop-blur-md border-b border-brass/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display text-[19px] tracking-editorial flex items-baseline gap-2"
          aria-label="KODA · 01"
        >
          <span className="font-medium">KODA</span>
          <span className="text-brass">·</span>
          <span className="font-mono text-[11px] tracking-eyebrow text-brass-deep translate-y-[-1px]">
            01
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className="font-mono text-[11px] tracking-eyebrow uppercase text-warmgrey hover:text-obsidian transition-colors"
            >
              {it.label}
            </a>
          ))}
          <Link
            to="/spec"
            className="font-mono text-[11px] tracking-eyebrow uppercase text-brass-deep hover:text-amber transition-colors"
          >
            ↗ Spec
          </Link>
        </nav>
      </div>
    </header>
  );
}
