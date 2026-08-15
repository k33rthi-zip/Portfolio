import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { trailEvents } from "@/data/events";
import Reveal from "./Reveal";

function Stamp() {
  return (
    <svg viewBox="0 0 90 100" aria-hidden="true" className="h-20 w-[4.5rem] drop-shadow-sm">
      <defs>
        <mask id="perf">
          <rect width="90" height="100" fill="white" />
          {Array.from({ length: 9 }).map((_, i) => (
            <g key={i}>
              <circle cx={(i + 1) * 9} cy="2" r="4" fill="black" />
              <circle cx={(i + 1) * 9} cy="98" r="4" fill="black" />
            </g>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={`v${i}`}>
              <circle cx="2" cy={(i + 1) * 9} r="4" fill="black" />
              <circle cx="88" cy={(i + 1) * 9} r="4" fill="black" />
            </g>
          ))}
        </mask>
      </defs>
      <g mask="url(#perf)">
        <rect width="90" height="100" fill="var(--color-cloud)" />
        <rect x="8" y="8" width="74" height="84" fill="var(--color-sky)" />
        <circle cx="62" cy="30" r="10" fill="var(--color-sun)" />
        <path d="M8 92l24-40 16 22 12-16 22 34Z" fill="var(--color-pine)" />
        <path d="M8 92l18-24 14 24Z" fill="var(--color-moss)" />
      </g>
    </svg>
  );
}

function Rock({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group absolute -top-14 left-1/2 z-30 -translate-x-[calc(50%+3.5rem)] rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine"
    >
      <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-soil-deep">
        Next
      </span>
      <svg viewBox="0 0 120 76" aria-hidden="true" className="h-[4.5rem] w-28 drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-active:translate-y-0.5">
        <path d="M14 70L34 22l22-14 30 10 18 52Z" fill="var(--color-soil)" />
        <path d="M34 22l22-14 16 62H24Z" fill="var(--color-sand)" />
        <path d="M56 8l30 10 8 24-22 28Z" fill="var(--color-soil-deep)" opacity="0.55" />
        <ellipse cx="60" cy="72" rx="52" ry="5" fill="var(--color-soil-deep)" opacity="0.25" />
      </svg>
    </button>
  );
}

export default function PostcardDeck() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduced = useReducedMotion();
  const waterRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: waterProgress } = useScroll({
    target: waterRef,
    offset: ["start end", "end start"],
  });
  const p = (v: number) => (reduced ? 0 : v);
  const backX = useTransform(waterProgress, [0, 1], [p(-60), p(60)]);
  const bladesX = useTransform(waterProgress, [0, 1], [p(80), p(-80)]);
  const backY = useTransform(waterProgress, [0, 1], [p(-40), p(60)]);
  const frontY = useTransform(waterProgress, [0, 1], [p(-80), p(120)]);
  const total = trailEvents.length;
  const event = trailEvents[index];

  const go = (step: number) => {
    setDir(step);
    setIndex((i) => (i + step + total) % total);
  };

  return (
    <section id="events" className="relative -mt-14 overflow-hidden bg-cream px-6 pb-28 pt-0">
      {/* water band above the section */}
      <div ref={waterRef} className="relative -mx-6 h-28 w-auto overflow-hidden sm:h-36">
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 1200 140"
          preserveAspectRatio="none"
          className="absolute inset-x-[-12%] top-0 h-full w-[124%]"
          style={{ x: backX, y: backY }}
        >
          <path d="M0 60c120-50 240 50 360 0s240-60 360 0 240 40 360 0 240-30 320 10v200H0Z" fill="var(--color-water)" opacity="0.6" />
        </motion.svg>
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 1200 140"
          preserveAspectRatio="none"
          className="absolute inset-x-[-12%] top-6 h-full w-[124%]"
          style={{ x: bladesX, y: frontY }}
        >
          <path d="M0 80c140 40 260-60 400-20s240 60 380 10 320-40 420 10v200H0Z" fill="var(--color-water-deep)" opacity="0.45" />
        </motion.svg>
      </div>

      <div className="mx-auto max-w-5xl">
        <Reveal className="mt-16 text-left sm:mt-24">
          <h2 className="text-section text-pine-deep">Experience</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mx-auto mt-24 max-w-5xl"
            tabIndex={0}
            role="group"
            aria-roledescription="postcard deck"
            aria-label={`Event ${index + 1} of ${total}: ${event.title}`}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                go(1);
              }
              if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                go(-1);
              }
            }}
          >
            <div className="relative">
            <Rock onClick={() => go(1)} label="Next postcard" />

            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={event.slug}
                custom={dir}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: dir * 70 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: dir * -70 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag={reduced ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="grid cursor-grab items-stretch gap-6 active:cursor-grabbing sm:grid-cols-[2fr_1fr]"
              >
                {/* postcard */}
                <article className="relative">
                  {/* fanned cards behind */}
                  <div aria-hidden="true" className="absolute inset-0">
                    <div className="absolute inset-0 translate-y-5 rotate-[3deg] rounded-[1.5rem] border border-border bg-sand/70 shadow-soft" />
                    <div className="absolute inset-0 translate-y-2.5 -rotate-[2deg] rounded-[1.5rem] border border-border bg-cloud shadow-soft" />
                  </div>

                  <div className="relative z-20 flex h-full flex-col rounded-[1.5rem] border border-border bg-cloud p-6 shadow-lift sm:p-8">
                    <div className="absolute right-5 top-5">
                      <Stamp />
                    </div>

                    <div className="pr-24">
                      <p className="text-xs font-bold uppercase tracking-widest text-water-deep">
                        {event.date} · {event.location}
                      </p>
                      <h3 className="mt-2 text-3xl text-pine-deep">{event.title}</h3>
                      <p className="font-bold text-pine">{event.company}</p>
                    </div>
                    <p className="mt-4 text-foreground/75">{event.description[0]}</p>
                    <Link
                      to={`/events/${event.slug}`}
                      className="mt-auto pt-5 text-sm font-bold text-pine underline underline-offset-4"
                    >
                      Read the full story →
                    </Link>
                  </div>
                </article>

                {/* polaroid — side by side, never overlapping */}
                <div className="flex justify-center sm:justify-start">
                  <div className="flex h-full w-full max-w-xs rotate-[-3deg] flex-col rounded-sm border border-border bg-white p-3 pb-10 shadow-lift">
                    <img
                      src={event.image}
                      alt={`${event.title} illustration`}
                      width={512}
                      height={384}
                      loading="lazy"
                      className="h-full min-h-40 w-full flex-1 object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            </div>


            <div className="mt-8 flex items-center justify-center gap-2" aria-hidden="true">
              {trailEvents.map((e, i) => (
                <span
                  key={e.slug}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-7 bg-pine" : "w-2 bg-pine/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
