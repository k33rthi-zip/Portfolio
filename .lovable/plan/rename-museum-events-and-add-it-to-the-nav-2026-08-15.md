# Rename "Museum Events" and add it to the nav

## Naming
The section title becomes **Events**. "Collection" stays reserved for the destination page, so the flow reads: Events → Explore Collection → collection page.

## Changes

1. `src/components/trail/MuseumEvents.tsx`
   - Heading: `Museum Events` → `Events`
   - Eyebrow label: `Events 2` → `Gallery` (the "Events 2" placeholder no longer makes sense once the section is named)


2. `src/components/trail/TopNav.tsx`
   - Add a nav stop `{ id: "events-2", label: "Events" }` placed after `Experience` and before `Projects`, matching the position circled in the screenshot's page order.
   - The existing IntersectionObserver picks up the new id automatically since the section already has `id="events-2"`.

Nav becomes: Home · Experience · Events · Projects · Skills · Contact

## Notes
- No data or routing changes; the `/events/collection` page and its "Back to Main Portfolio" link stay as-is.
