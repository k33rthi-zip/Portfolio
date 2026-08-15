import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Github } from "lucide-react";
import { trailProjects } from "@/data/portfolio-data";
import Reveal from "./Reveal";


export default function GrassExperience() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathLength = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section id="experience" ref={ref} className="relative overflow-hidden bg-cream pb-24 pt-8">
      <div className="relative mx-auto max-w-5xl px-6 pt-12">
        <Reveal>
          <h2 className="text-section text-pine-deep">Projects</h2>
          <p className="text-lead mt-4 max-w-reading text-foreground/75">
            A few things I've built along the trail.
          </p>
        </Reveal>

        <div className="relative mt-14 pl-10 sm:pl-16">
          {/* dirt path */}
          <svg
            aria-hidden="true"
            viewBox="0 0 40 1000"
            preserveAspectRatio="none"
            className="absolute left-2 top-0 h-full w-8 sm:left-4"
          >
            <path d="M20 0V1000" stroke="var(--color-soil)" strokeWidth="14" strokeLinecap="round" opacity="0.35" />
            <motion.path
              d="M20 0V1000"
              stroke="var(--color-soil-deep)"
              strokeWidth="6"
              strokeDasharray="14 20"
              strokeLinecap="round"
              style={{ pathLength: reduced ? 1 : pathLength }}
            />
          </svg>

          <ol className="space-y-8">
            {trailProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08}>
                <li className="relative rounded-[1.5rem] border border-border bg-cloud p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 sm:p-8">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.35rem] top-9 h-5 w-5 rounded-full border-4 border-cream bg-pine sm:-left-[3.1rem]"
                  />
                  <h3 className="text-2xl text-pine-deep">{project.name}</h3>
                  {project.subtitle && <p className="font-bold text-pine">{project.subtitle}</p>}
                  <p className="mt-3 text-foreground/75">{project.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border bg-cream px-3 py-1 text-xs font-bold uppercase tracking-widest text-water-deep"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 font-bold text-pine underline underline-offset-4 hover:text-pine-deep"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      View on GitHub
                    </a>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
