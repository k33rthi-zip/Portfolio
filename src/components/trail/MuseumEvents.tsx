import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Reveal from "./Reveal";
import mixerImg from "@/assets/event-mixer.jpg";
import lakeImg from "@/assets/event-lake.jpg";
import stargazeImg from "@/assets/event-stargaze.jpg";

const frames = [
  { img: mixerImg, color: "var(--color-clay)", label: "Campfire Mixer", top: "0%", left: "2%", rotate: -4 },
  { img: lakeImg, color: "var(--color-moss)", label: "Lake Paddle", top: "26%", left: "38%", rotate: 3 },
  { img: stargazeImg, color: "var(--color-sun)", label: "Night Ridge", top: "58%", left: "8%", rotate: -2 },
];

export default function MuseumEvents() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "flying" | "landed">("idle");

  const go = () => navigate("/events/collection");

  const handleExplore = () => {
    if (phase !== "idle") return;
    if (reduced) return go();
    setPhase("flying");
  };

  return (
    <section
      id="events-2"
      className="relative flex min-h-screen items-center overflow-hidden bg-pine-deep py-24 text-cloud"
    >
      {/* gallery wall wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(60% 50% at 25% 40%, var(--color-water-deep), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-6 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        {/* Gallery wall */}
        <Reveal>
          <div className="relative mx-auto h-[26rem] w-full max-w-sm sm:h-[30rem]">
            {frames.map((f) => (
              <motion.figure
                key={f.label}
                className="absolute w-[54%] rounded-md p-2 shadow-lift"
                style={{ top: f.top, left: f.left, backgroundColor: f.color, rotate: f.rotate }}
                whileHover={{ scale: 1.06, rotate: f.rotate + 3 }}
                transition={{ type: "spring", stiffness: 220, damping: 14 }}
              >
                <img
                  src={f.img}
                  alt={`${f.label} exhibit`}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-sm border-2 border-cloud object-cover"
                />
                <figcaption className="pt-1.5 text-center text-[0.7rem] font-bold uppercase tracking-widest text-pine-deep">
                  {f.label}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </Reveal>

        {/* Copy */}
        <div className="relative">
          {/* light beam from the landed firefly toward the text */}
          <AnimatePresence>
            {phase === "landed" && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute h-[24rem] w-[28rem] origin-top-left"
                /* anchored exactly where the firefly lands (x:-12, y:-14) */
                style={{
                  left: "-12px",
                  top: "-14px",
                  clipPath: "polygon(0% 0%, 100% 40%, 58% 100%)",
                  background:
                    "linear-gradient(140deg, oklch(92% 0.18 95 / 0.6), transparent 72%)",
                  filter: "blur(2px)",
                }}
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />

            )}
          </AnimatePresence>

          {/* firefly */}
          <AnimatePresence>
            {phase !== "idle" && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0"
                initial={{ x: -320, y: 260, opacity: 0, scale: 0.6 }}
                animate={{
                  x: [-320, -240, -180, -120, -90, -50, -20, -12],
                  y: [260, 170, 60, 110, 150, 40, -20, -14],
                  opacity: [0, 1, 1, 1, 1, 1, 1, 1],
                  scale: [0.6, 1, 0.95, 1, 0.9, 1.1, 1.15, 1],
                  rotate: [0, -12, 8, -6, 10, -8, 4, 0],
                }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  if (phase === "flying") {
                    setPhase("landed");
                    window.setTimeout(go, 1100);
                  }
                }}
              >
                {/* wings */}
                <motion.span
                  className="absolute -left-[7px] -top-[5px] h-[7px] w-[10px] rounded-full bg-cloud/40"
                  style={{ filter: "blur(0.5px)", transformOrigin: "right center" }}
                  animate={{ rotate: [-22, -52, -22], scaleX: [1, 0.6, 1] }}
                  transition={{ duration: 0.14, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute -right-[7px] -top-[5px] h-[7px] w-[10px] rounded-full bg-cloud/40"
                  style={{ filter: "blur(0.5px)", transformOrigin: "left center" }}
                  animate={{ rotate: [22, 52, 22], scaleX: [1, 0.6, 1] }}
                  transition={{ duration: 0.14, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* body */}
                <span className="block h-[9px] w-[6px] rounded-full bg-pine-deep" />
                {/* glowing abdomen */}
                <motion.span
                  className="absolute -bottom-[3px] left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-sun"
                  style={{ boxShadow: "0 0 16px 6px oklch(88% 0.16 90 / 0.75)" }}
                  animate={{ opacity: [1, 0.45, 1, 0.7, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>


          <Reveal delay={0.1}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sun">Gallery</p>
            <h2 className="text-section mt-3 text-cloud">Events</h2>
            <p className="text-lead mt-5 max-w-reading text-cloud/75">
              A curated hall of everything we've hosted — mixers, volunteer days, treks and
              workshops, hung year by year like exhibits on a gallery wall. Step inside and
              wander the collection at your own pace.
            </p>
            <button
              type="button"
              onClick={handleExplore}
              className="mt-8 rounded-full bg-sun px-7 py-3 font-bold text-pine-deep shadow-lift transition-transform hover:-translate-y-0.5 disabled:opacity-80"
              disabled={phase !== "idle"}
            >
              {phase === "idle" ? "Explore Collection" : "Opening Collection…"}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
