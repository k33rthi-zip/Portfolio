import { Link, useParams } from "react-router-dom";
import { getEvent, trailEvents } from "@/data/events";

export default function EventDetail() {
  const { slug } = useParams();
  const event = getEvent(slug);

  if (!event) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-cream px-6 text-center">
        <h1 className="text-section text-pine-deep">Trail not found</h1>
        <Link to="/#events" className="font-bold text-pine underline underline-offset-4">
          ← Back to Main Portfolio
        </Link>
      </main>
    );
  }

  const others = trailEvents.filter((e) => e.slug !== event.slug);

  return (
    <main className="min-h-screen bg-cream pb-24">
      <div className="mx-auto max-w-4xl px-6 pt-10">
        <Link
          to="/#events"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-cloud px-4 py-2 text-sm font-bold text-pine shadow-soft transition-transform hover:-translate-x-1"
        >
          ← Back to Main Portfolio
        </Link>

        <header className="mt-8">
          <h1 className="text-section text-pine-deep">{event.title}</h1>
          <p className="mt-3 text-sm font-bold uppercase tracking-widest text-water-deep">
            {event.date} · {event.location}
          </p>
        </header>

        <div className="mt-8 grid aspect-[16/9] gap-[3px] overflow-hidden rounded-[1.75rem] border-4 border-cloud bg-cloud shadow-lift sm:grid-cols-3 sm:grid-rows-2">
          {(event.gallery ?? [event.image]).map((src, i) => (
            <img
              key={src + i}
              src={src}
              alt={`${event.title} illustration ${i + 1}`}
              width={1024}
              height={768}
              loading={i === 0 ? "eager" : "lazy"}
              className={`h-full w-full object-cover ${
                i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            />
          ))}
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.55fr_0.65fr]">
          <div className="rounded-[1.5rem] border border-border bg-cloud/70 p-7 shadow-soft sm:p-9">
            <h2 className="text-xl text-pine-deep">About this event</h2>
            <div className="mt-5 space-y-6 text-lg leading-relaxed text-foreground/80">
              {event.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-[1.5rem] bg-moss/20 p-6">
            <h2 className="text-xl text-pine-deep">Details</h2>
            <dl className="mt-4 space-y-4">
              {event.details.map((d) => (
                <div key={d.label}>
                  <dt className="text-xs font-bold uppercase tracking-widest text-water-deep">
                    {d.label}
                  </dt>
                  <dd className="mt-1 font-semibold text-pine-deep">{d.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <section className="mt-10 w-full rounded-[1.5rem] border border-border bg-cloud/70 p-7 shadow-soft sm:p-9">
          <h2 className="text-xl text-pine-deep">Skills</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {event.skills.map((s) => (
              <li
                key={s}
                className="rounded-full bg-moss/25 px-5 py-2 text-sm font-bold text-pine-deep"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>




        <section className="mt-16">
          <h2 className="text-2xl text-pine-deep">More along the trail</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {others.map((e) => (
              <Link
                key={e.slug}
                to={`/events/${e.slug}`}
                className="group rounded-[1.5rem] border-4 border-cloud bg-cloud p-3 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift"
              >
                <img
                  src={e.image}
                  alt={`${e.title} illustration`}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[1.1rem] object-cover"
                />
                <p className="px-2 pb-1 pt-4 text-lg font-bold text-pine-deep group-hover:underline">
                  {e.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
