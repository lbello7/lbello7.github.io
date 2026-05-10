import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
};

export default function SectionHeader({ index, eyebrow, title, lede }: Props) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid md:grid-cols-12 gap-6 mb-14 md:mb-20"
    >
      <div className="md:col-span-3">
        <div className="eyebrow flex items-center gap-3">
          <span className="text-amber">●</span>
          <span>
            {index} · {eyebrow}
          </span>
        </div>
      </div>
      <div className="md:col-span-9">
        <h2 className="display-lg text-[40px] md:text-[64px]">{title}</h2>
        {lede && (
          <p className="body-lg mt-6 max-w-2xl text-warmgrey">{lede}</p>
        )}
      </div>
    </motion.header>
  );
}
