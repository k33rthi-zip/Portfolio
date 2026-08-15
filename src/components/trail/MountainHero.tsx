import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { personalInfo } from "@/data/portfolio-data";
import HeroLinks from "./HeroLinks";

export default function MountainHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const p = (v: number) => (reduced ? 0 : v);
  const backY = useTransform(scrollYProgress, [0, 1], [0, p(-60)]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, p(-140)]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, p(-260)]);
  const cloudX = useTransform(scrollYProgress, [0, 1], [0, p(160)]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, p(120)]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduced ? 1 : 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-sky"
    >
      {/* sun */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[22%] -translate-x-1/2 h-56 w-56 rounded-full bg-sun/70 blur-[2px]"
        style={{ y: backY }}
      />

      {/* clouds + balloon */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1200 300"
        className="absolute top-[12%] left-0 w-full"
        style={{ x: cloudX }}
      >
        <g fill="var(--color-cloud)" opacity="0.95">
          <ellipse cx="180" cy="70" rx="70" ry="30" />
          <ellipse cx="230" cy="58" rx="46" ry="34" />
          <ellipse cx="840" cy="130" rx="86" ry="32" />
          <ellipse cx="900" cy="116" rx="52" ry="38" />
        </g>
        <g transform="translate(1050 16)">
          <path d="M44 122C14 92 0 62 0 44a44 44 0 0 1 88 0c0 18-14 48-44 78Z" fill="var(--color-clay)" />
          <line x1="44" y1="122" x2="44" y2="132" stroke="var(--color-soil)" strokeWidth="3" />
          <rect x="34" y="132" width="20" height="14" rx="3" fill="var(--color-soil)" />
        </g>
      </motion.svg>

      {/* headline */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-24 text-center"
      >
        <span className="rounded-full border border-pine/25 bg-cream/70 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-pine">
          UofT CS · 2025 Schulich Leader
        </span>
        <h1 className="text-display mt-6 text-pine-deep">{personalInfo.name}</h1>
        <p className="text-lead mt-5 max-w-reading font-semibold text-pine">
          {personalInfo.title} — building things with the same patience it takes to
          climb a ridge. Scroll down and walk the route with me: peaks, rivers, and
          finally solid ground.
        </p>
        <HeroLinks />
      </motion.div>

      {/* mountain layers */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-[45vh] w-full"
        style={{ y: backY }}
      >
        <path d="M0 420V220l180-130 150 120 190-160 200 180 160-90 320 200v180Z" fill="var(--color-sky-deep)" />
      </motion.svg>

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-[38vh] w-full"
        style={{ y: midY }}
      >
        <path d="M0 420V300l220-170 210 180 180-140 250 210 340-140v200Z" fill="var(--color-moss)" />
      </motion.svg>

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-[30vh] w-full"
        style={{ y: frontY }}
      >
        <path d="M0 420V340l260-190 230 200 220-120 490 250v-60Z" fill="var(--color-pine)" />
        {/* summit flag */}
        <g transform="translate(486 148)">
          <rect x="0" y="0" width="5" height="70" fill="var(--color-soil-deep)" />
          <path d="M5 4h58l-16 16 16 16H5Z" fill="var(--color-clay)" />
        </g>
        {/* pines */}
        <g fill="var(--color-pine-deep)">
          <path d="M90 420l40-90 40 90Z" />
          <path d="M1040 420l34-78 34 78Z" />
        </g>
      </motion.svg>

      <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}
