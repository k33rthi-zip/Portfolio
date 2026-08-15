import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { personalInfo } from "@/data/portfolio-data";
import Reveal from "./Reveal";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const pathLength = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden">
      <div className="relative bg-cream">
        {/* grass strip sitting above the soil */}
        <svg aria-hidden="true" viewBox="0 0 1200 90" preserveAspectRatio="none" className="block h-16 w-full">
          <path d="M0 40c150-26 320 14 470-6s330-40 470-18 260 26 260 26v48H0Z" fill="var(--color-moss)" />
          <g fill="var(--color-pine)">
            {Array.from({ length: 40 }).map((_, i) => (
              <path key={i} d={`M${i * 30 + 6} 90 L${i * 30 + 14} ${44 + (i % 3) * 8} L${i * 30 + 22} 90 Z`} />
            ))}
          </g>
        </svg>
        <svg aria-hidden="true" viewBox="0 0 1200 180" preserveAspectRatio="none" className="h-32 w-full">

          <path d="M0 0h1200v70c-160 44-340 30-540 74S220 200 0 160Z" fill="var(--color-soil)" />
          <path d="M0 160c220 32 480-28 680-40s380 2 520-38v138H0Z" fill="var(--color-soil-deep)" />
          <motion.path
            d="M600 -10C560 60 700 90 620 150S560 200 600 240"
            fill="none"
            stroke="var(--color-sand)"
            strokeWidth="8"
            strokeDasharray="16 18"
            strokeLinecap="round"
            style={{ pathLength: reduced ? 1 : pathLength }}
          />
        </svg>
      </div>

      {/* soil */}
      <div className="bg-soil-deep text-cream">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 pb-24 pt-4 md:grid-cols-2">
          <Reveal className="md:pt-16">
            <h2 className="text-section text-cream">You made it down.</h2>
            <p className="text-lead mt-5 text-cream/80">
              The trail ends here, on solid ground. If you'd like to walk the next stretch
              together, send a note — I answer every one.
            </p>

            <div className="mt-9 space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="block text-lg font-bold text-sun underline underline-offset-4"
              >
                {personalInfo.email}
              </a>
              <p className="text-cream/70">
                {personalInfo.location.city}, {personalInfo.location.country}
              </p>
              {personalInfo.website && (
                <a
                  href={`https://${personalInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-semibold text-cream underline underline-offset-4"
                >
                  {personalInfo.website}
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.svg
              viewBox="0 0 320 300"
              className="mx-auto w-full max-w-sm"
              role="img"
              aria-label="Flat illustration of a tent and roots in the soil"
            >
              <circle cx="160" cy="150" r="120" fill="var(--color-soil)" opacity="0.55" />
              <path d="M160 80l72 116H88Z" fill="var(--color-clay)" />
              <path d="M160 80v116" stroke="var(--color-soil-deep)" strokeWidth="6" />
              <path d="M160 196c-30 30-70 40-110 46M160 196c34 28 74 38 118 44M160 196v70" stroke="var(--color-sand)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.7" />
              <g fill="var(--color-moss)">
                <path d="M56 92l20-42 20 42Z" />
                <path d="M240 108l18-38 18 38Z" />
              </g>
              <circle cx="264" cy="52" r="14" fill="var(--color-sun)" />
            </motion.svg>
          </Reveal>
        </div>

        <p className="pb-10 text-center text-sm text-cream/60">
          © {new Date().getFullYear()} {personalInfo.name}
        </p>
      </div>
    </section>
  );
}
