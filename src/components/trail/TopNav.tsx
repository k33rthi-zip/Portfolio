import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { personalInfo } from "@/data/portfolio-data";

const stops = [
  { id: "home", label: "Home" },
  { id: "events", label: "Experience" },
  { id: "experience", label: "Projects" },
  { id: "events-2", label: "Events" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function TopNav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    stops.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="border-b border-border/60 bg-cream/85 backdrop-blur">
        <div className="flex w-full items-center justify-between gap-4 px-5 sm:px-8 py-3">
          <a href="#home" className="flex shrink-0 items-center gap-2 font-display text-lg font-semibold text-pine-deep">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7">
              <circle cx="16" cy="16" r="16" fill="var(--color-sky)" />
              <path d="M4 26l8-13 5 8 3-5 8 10Z" fill="var(--color-pine)" />
              <circle cx="22" cy="9" r="3.5" fill="var(--color-sun)" />
            </svg>
            <span className="hidden whitespace-nowrap sm:inline">{personalInfo.name}</span>
          </a>

          <nav aria-label="Section navigation">
            <ul className="flex items-center gap-1 sm:gap-2">
              {stops.map((stop) => (
                <li key={stop.id}>
                  <a
                    href={`#${stop.id}`}
                    aria-current={active === stop.id ? "true" : undefined}
                    className={`block rounded-full px-3 sm:px-4 py-1.5 text-sm font-bold transition-colors ${
                      active === stop.id
                        ? "bg-pine text-primary-foreground"
                        : "text-foreground/70 hover:text-pine"
                    }`}
                  >
                    {stop.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <motion.div
        className="h-1 origin-left bg-sun"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
    </header>
  );
}
