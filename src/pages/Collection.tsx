import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { collectionEvents, yearsInOrder, CollectionEvent } from "@/data/collection";

function PuzzleButton({
  year,
  active,
  onClick,
  color,
}: {
  year: number;
  active: boolean;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="group relative block w-full text-left transition-transform hover:translate-x-1"
    >
      <svg viewBox="-4 -14 208 92" className="w-full overflow-visible drop-shadow-sm" aria-hidden="true">
        <path
          d="M6 6h48a10 10 0 0 1 20 0h56a10 10 0 0 1 0 20v12a10 10 0 0 1 0 20H74a10 10 0 0 0-20 0H6a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4Z"
          fill={active ? color : "var(--color-cloud)"}
          stroke={color}
          strokeWidth="3"
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center font-display text-2xl font-semibold ${
          active ? "text-cloud" : "text-pine-deep"
        }`}
      >
        {year}
      </span>
    </button>
  );
}

export default function Collection() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [open, setOpen] = useState<CollectionEvent | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return collectionEvents.filter(
      (e) => (!q || e.name.toLowerCase().includes(q)) && (!year || e.year === year)
    );
  }, [query, year]);

  const colors: Record<number, string> = {
    2026: "var(--color-clay)",
    2025: "var(--color-moss)",
    2024: "var(--color-water-deep)",
  };

  const selectYear = (y: number) => {
    const next = year === y ? null : y;
    setYear(next);
    if (next) {
      requestAnimationFrame(() => {
        document.getElementById(`year-${y}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  return (
    <main className="min-h-screen bg-cream pb-24">
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <Link
          to="/#events-2"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-cloud px-4 py-2 text-sm font-bold text-pine shadow-soft transition-transform hover:-translate-x-1"
        >
          ← Back to Main Portfolio
        </Link>

        <header className="mt-8">
          <h1 className="text-section text-pine-deep">Exhibition Collection</h1>
          <p className="text-lead mt-3 max-w-reading text-foreground/75">
            Every event, hung year by year. Search by name or pick a year to jump straight there.
          </p>
        </header>

        <div className="mt-10 grid gap-10 md:grid-cols-[0.32fr_0.68fr] md:items-start">
          <aside className="md:sticky md:top-24">
            <label htmlFor="event-search" className="sr-only">
              Search events by name
            </label>
            <input
              id="event-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events…"
              className="w-full rounded-full border-2 border-border bg-cloud px-5 py-3 text-base outline-none focus:border-pine"
            />

            <div className="mt-6 space-y-3">
              {yearsInOrder.map((y) => (
                <PuzzleButton
                  key={y}
                  year={y}
                  color={colors[y]}
                  active={year === y}
                  onClick={() => selectYear(y)}
                />
              ))}
            </div>

          </aside>

          <div className="space-y-14">
            {yearsInOrder.map((y) => {
              const items = filtered.filter((e) => e.year === y);
              if (!items.length) return null;
              return (
                <section key={y} id={`year-${y}`} className="scroll-mt-24">
                  <div className="flex items-center gap-4">
                    <h2 className="text-3xl text-pine-deep">{y}</h2>
                    <span className="h-1 flex-1 rounded-full" style={{ background: colors[y] }} />
                    
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => setOpen(e)}
                        className="group rounded-[1.25rem] border-4 border-cloud bg-cloud p-3 text-left shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift"
                      >
                        <img
                          src={e.image}
                          alt={`${e.name} exhibit`}
                          loading="lazy"
                          className="aspect-[4/3] w-full rounded-[0.9rem] object-cover"
                        />
                        <p className="px-1 pt-3 font-bold text-pine-deep group-hover:underline">
                          {e.name}
                        </p>
                        <p className="px-1 pb-1 pt-1 text-sm text-foreground/70">{e.short}</p>
                      </button>
                    ))}
                  </div>
                </section>
              );
            })}

            {!filtered.length && (
              <p className="text-lead text-foreground/60">No events match that search.</p>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-pine-deep/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={open.name}
              className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[1.5rem] bg-cream p-6 shadow-lift"
              initial={{ y: 30, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(ev) => ev.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-water-deep">
                    {open.date} · {open.location}
                  </p>
                  <h3 className="mt-2 text-3xl text-pine-deep">{open.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="rounded-full border border-border bg-cloud px-3 py-1 text-sm font-bold text-pine"
                >
                  Close
                </button>
              </div>
              <img
                src={open.image}
                alt={`${open.name} exhibit`}
                className="mt-5 aspect-[4/3] w-full rounded-[1.1rem] border-4 border-cloud object-cover"
              />
              <div className="mt-5 space-y-4 text-foreground/80">
                {open.details.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
