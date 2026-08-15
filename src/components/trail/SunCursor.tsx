import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const INTERACTIVE = 'a,button,[role="button"],input,select,textarea,summary,label';

export default function SunCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springCfg = reduced
    ? { stiffness: 2000, damping: 100, mass: 0.1 }
    : { stiffness: 420, damping: 32, mass: 0.6 };
  const sx = useSpring(x, springCfg);
  const sy = useSpring(y, springCfg);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHovering(!!target?.closest?.(INTERACTIVE));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("sun-cursor-active");
    return () => document.documentElement.classList.remove("sun-cursor-active");
  }, [enabled]);

  if (!enabled) return null;

  const scale = pressed ? 0.82 : hovering ? 1.35 : 1;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] -ml-3.5 -mt-3.5"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{ scale }}
        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 26 }}
      >
        <motion.svg
          width="28"
          height="28"
          viewBox="0 0 40 40"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={reduced ? undefined : { duration: 18, ease: "linear", repeat: Infinity }}
          style={{
            filter: `drop-shadow(0 0 ${hovering ? 14 : 8}px var(--color-sun))`,
          }}
        >
          <g stroke="var(--color-sun)" strokeWidth="2.4" strokeLinecap="round">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4;
              const r1 = 12.5;
              const r2 = 17;
              return (
                <line
                  key={i}
                  x1={20 + Math.cos(a) * r1}
                  y1={20 + Math.sin(a) * r1}
                  x2={20 + Math.cos(a) * r2}
                  y2={20 + Math.sin(a) * r2}
                />
              );
            })}
          </g>
          <circle cx="20" cy="20" r="9.5" fill="var(--color-sun)" />
          <circle cx="20" cy="20" r="9.5" fill="none" stroke="var(--color-clay)" strokeWidth="1.6" opacity="0.75" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
