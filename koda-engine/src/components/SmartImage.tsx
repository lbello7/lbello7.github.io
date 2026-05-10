import { useState, type CSSProperties } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  placeholderLabel?: string;
  onClick?: () => void;
};

/**
 * Renders an <img> that gracefully falls back to a placeholder card
 * (smoke + brass border) when the file 404s. Used so the site looks
 * intentional even before the renders are uploaded to /koda/renders/.
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  style,
  placeholderLabel,
  onClick,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative ${className}`}
        style={{
          background:
            "linear-gradient(135deg, #3A2412 0%, #1C1410 60%, #0A0806 100%)",
          ...style,
        }}
        onClick={onClick}
      >
        <div className="absolute inset-3 border border-brass/30 flex flex-col items-center justify-center text-center px-4">
          <div className="font-mono text-[10px] tracking-eyebrow uppercase text-brass-deep mb-2">
            ◇ Render pending
          </div>
          <div className="font-mono text-[11px] text-amber/80 leading-relaxed">
            {placeholderLabel ?? alt}
          </div>
          <div className="mt-3 font-mono text-[9px] tracking-eyebrow uppercase text-warmgrey/70">
            Drop into /koda/renders/
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onClick={onClick}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}
