import Nav from "./components/Nav";
import HausaDivider from "./components/HausaDivider";
import Hero from "./sections/Hero";
import Anatomy from "./sections/Anatomy";
import Interaction from "./sections/Interaction";
import Architecture from "./sections/Architecture";
import DayWithKoda from "./sections/DayWithKoda";
import Build from "./sections/Build";

export default function App() {
  return (
    <div className="min-h-screen bg-ivory text-obsidian">
      <Nav />
      <main>
        <Hero />
        <HausaDivider />
        <Anatomy />
        <HausaDivider />
        <Interaction />
        <HausaDivider />
        <Architecture />
        <HausaDivider />
        <DayWithKoda />
        <HausaDivider />
        <Build />
      </main>
      <footer className="border-t border-brass/30 py-10 px-6 md:px-16 text-warmgrey">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm font-mono">
          <span>KODA · 01 — A bespoke desk object that runs your AI.</span>
          <span className="opacity-70">
            Prototype · {new Date().getFullYear()} · L. Bello
          </span>
        </div>
      </footer>
    </div>
  );
}
