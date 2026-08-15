import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

type Cluster = {
  label: string;
  /** rows of leaves, laid out centered on cx */
  rows: string[][];
  cx: number;
  /** y of the first (top) row */
  topY: number;
  branch: string;
  twigs: string[];
  foliage: [number, number, number][];
  fill: string;
  stroke: string;
  text: string;
};

const ROW_GAP = 52;

const clusters: Cluster[] = [
  {
    label: "Languages",
    rows: [["Python"], ["SQL", "TypeScript"], ["JavaScript", "R"]],
    cx: 168,
    topY: 120,
    branch: "M450 400C400 372 300 336 218 268",
    twigs: ["M352 350c-24 6-42 22-52 42", "M282 306c-6-22-2-40 8-56"],
    foliage: [
      [372, 344, -150],
      [316, 322, 200],
      [258, 292, -160],
      [300, 386, 30],
      [286, 250, -60],
      [220, 268, -120],
    ],
    fill: "var(--color-pine)",
    stroke: "var(--color-pine-deep)",
    text: "var(--color-cloud)",
  },
  {
    label: "Tools",
    rows: [["Figma"], ["Git", "Tableau"], ["Jira", "Notion"], ["Excel"]],
    cx: 450,
    topY: 70,
    branch: "M450 400V236",
    twigs: ["M450 340c-26-6-42-20-50-40", "M450 300c26-6 42-20 50-40"],
    foliage: [
      [432, 336, 170],
      [468, 300, -10],
      [434, 268, 175],
      [468, 240, -5],
      [396, 296, 200],
      [498, 258, -30],
    ],
    fill: "var(--color-moss)",
    stroke: "var(--color-pine)",
    text: "var(--color-pine-deep)",
  },
  {
    label: "Transferable",
    rows: [["Leadership"], ["Communication"], ["Stakeholder Mgmt"], ["Storytelling", "Facilitation"]],
    cx: 726,
    topY: 70,
    branch: "M450 400C500 372 600 336 682 268",
    twigs: ["M548 350c24 6 42 22 52 42", "M618 306c6-22 2-40-8-56"],
    foliage: [
      [528, 344, -30],
      [584, 322, -20],
      [642, 292, -20],
      [600, 386, 150],
      [614, 250, -120],
      [682, 268, -60],
    ],
    fill: "var(--color-sun)",
    stroke: "var(--color-soil)",
    text: "var(--color-soil-deep)",
  },
];

function leafWidth(label: string) {
  return Math.max(72, label.length * 8.8 + 28);
}

function SkillTree() {
  const reduced = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const on = inView || reduced;

  return (
    <svg
      ref={ref}
      viewBox="0 0 900 520"
      role="img"
      aria-label="A tree whose leaves are skills, grouped into languages, tools and transferable skills"
      className="h-auto w-full overflow-visible"
    >
      {/* ground */}
      <ellipse cx="450" cy="486" rx="210" ry="22" fill="var(--color-soil)" opacity="0.3" />
      <path d="M262 488c56-32 122-46 188-46s132 14 188 46Z" fill="var(--color-soil-deep)" opacity="0.28" />
      {/* grass tufts */}
      {[300, 340, 552, 596, 372, 528].map((gx, i) => (
        <path
          key={gx}
          d={`M${gx} 480c-2-14 2-24 6-32-1 12 2 22 6 30 4-10 10-16 16-20-6 8-8 16-8 24Z`}
          fill="var(--color-moss)"
          opacity={0.55 + (i % 3) * 0.12}
        />
      ))}

      {/* roots */}
      <path d="M450 484c-26 0-46 4-66 12" stroke="var(--color-soil-deep)" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M450 484c26 0 46 4 66 12" stroke="var(--color-soil-deep)" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.55" />

      {/* trunk — tapered */}
      <motion.g
        initial={reduced ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0.2 }}
        animate={on ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "450px 486px" }}
      >
        <path
          d="M430 486c2-52 4-104 8-146 2-22 4-34 12-44 8 10 10 22 12 44 4 42 6 94 8 146Z"
          fill="var(--color-soil-deep)"
        />
        <path
          d="M446 486c-1-56 0-116 4-160 1-12 2-20 4-26 1 8 2 16 3 26"
          stroke="var(--color-soil)"
          strokeWidth="3"
          fill="none"
          opacity="0.45"
        />
      </motion.g>

      {/* branches with twigs */}
      {clusters.map((c, i) => (
        <g key={`b-${c.label}`}>
          <motion.path
            d={c.branch}
            stroke="var(--color-soil-deep)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            animate={on ? { pathLength: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.65 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
          {c.twigs.map((t, ti) => (
            <motion.path
              key={ti}
              d={t}
              stroke="var(--color-soil)"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
              animate={on ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + i * 0.1 + ti * 0.08, ease: "easeOut" }}
            />
          ))}
          {/* little foliage leaves on the branch */}
          {c.foliage.map(([lx, ly, rot], li) => (
            <g key={`f-${li}`} transform={`translate(${lx} ${ly}) rotate(${rot})`}>
              <motion.g
                initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
                animate={on ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.15 + i * 0.1 + li * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ transformOrigin: "0px 0px" }}
              >
                <path d="M0 0c16-10 34-6 42 6-16 10-34 6-42-6Z" fill={c.fill} opacity="0.95" />
                <path d="M0 0c14 2 28 4 42 6" stroke={c.stroke} strokeWidth="1.5" fill="none" opacity="0.4" />
              </motion.g>
            </g>
          ))}
        </g>
      ))}


      {/* leaf clusters */}
      {clusters.map((c, ci) => {
        let n = -1;
        return (
          <motion.g
            key={c.label}
            animate={reduced ? undefined : { rotate: [-0.7, 0.7, -0.7] }}
            transition={{ duration: 7 + ci, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${c.cx}px ${c.topY + 200}px` }}
          >
            <text
              x={c.cx}
              y={c.topY - 42}
              textAnchor="middle"
              fill="var(--color-soil-deep)"
              className="text-[15px] font-bold uppercase tracking-[0.2em]"
            >
              {c.label}
            </text>

            {c.rows.map((row, ri) => {
              const widths = row.map(leafWidth);
              const totalW = widths.reduce((a, b) => a + b, 0) + (row.length - 1) * 14;
              let cursor = c.cx - totalW / 2;
              return row.map((skill, si) => {
                n += 1;
                const w = widths[si];
                const x = cursor + w / 2;
                cursor += w + 14;
                const y = c.topY + ri * ROW_GAP;
                const h = 38;
                const tilt = (n % 2 === 0 ? -1 : 1) * 3.5;
                return (
                  <motion.g
                    key={skill}
                    initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
                    animate={on ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 1.2 + ci * 0.16 + n * 0.08,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    whileHover={reduced ? undefined : { scale: 1.08, y: -4 }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                    transform={`rotate(${tilt} ${x} ${y})`}
                  >
                    <rect
                      x={x - w / 2}
                      y={y - h / 2}
                      width={w}
                      height={h}
                      rx={h / 2}
                      ry={h / 2}
                      fill={c.fill}
                      stroke={c.stroke}
                      strokeWidth="2.5"
                    />
                    <text
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      fill={c.text}
                      className="text-[14px] font-bold"
                    >
                      {skill}
                    </text>
                  </motion.g>
                );
              });
            })}
          </motion.g>
        );
      })}
    </svg>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative bg-cream px-6 pb-28 pt-16">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-section text-pine-deep">Skills</h2>
          <p className="text-lead mt-4 max-w-reading text-foreground/75">
            One tree, three branches — every leaf is something I work with.
          </p>
        </Reveal>

        {/* desktop / tablet: the tree */}
        <Reveal delay={0.1}>
          <div className="mt-10 hidden sm:block">
            <SkillTree />
          </div>
        </Reveal>

        {/* mobile: stacked cluster cards */}
        <div className="mt-10 space-y-6 sm:hidden">
          {clusters.map((c, i) => (
            <Reveal key={c.label} delay={0.1 + i * 0.08}>
              <div className="rounded-[1.5rem] border border-border bg-cloud p-6 shadow-soft">
                <h3 className="text-xs font-bold uppercase tracking-widest text-soil-deep">
                  {c.label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.rows.flat().map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pine"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
