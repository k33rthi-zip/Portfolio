import { speaking } from "@/data/portfolio-data";
import SplitSection from "@/components/ui/split-section";

/**
 * EventsSection Component
 * Speaking engagements and events
 */
export default function EventsSection() {
  const sorted = [...speaking].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <SplitSection title="Events" id="events">
      <div className="space-y-16 md:space-y-20">
        {sorted.map((talk, index) => (
          <div key={talk.id}>
            {index > 0 && <hr className="border-t border-foreground/15 mb-16 md:mb-20" />}
            <div className="space-y-3">
              <h3 className="text-large leading-tight">{talk.talk}</h3>
              <p className="text-small">
                {talk.event} — {new Date(talk.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })} · {talk.location}
              </p>
              {talk.description && (
                <p className="text-body leading-relaxed mt-6">{talk.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SplitSection>
  );
}
