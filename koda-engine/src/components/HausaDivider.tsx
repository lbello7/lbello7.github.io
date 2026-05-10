export default function HausaDivider() {
  return (
    <div
      aria-hidden
      className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16"
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] tracking-eyebrow uppercase text-brass-deep/80">
          ◇
        </span>
        <div className="flex-1 hausa-strip" />
        <span className="font-mono text-[10px] tracking-eyebrow uppercase text-brass-deep/80">
          ◇
        </span>
      </div>
    </div>
  );
}
