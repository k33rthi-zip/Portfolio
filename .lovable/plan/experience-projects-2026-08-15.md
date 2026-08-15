# Experience → Projects

Turn the timeline section into a Projects section: drop dates and location, add a tech stack and a GitHub link per project.

## Changes

1. **Data** (`src/data/portfolio-data.ts` + `src/types/portfolio.ts`)
   - Reshape the two existing entries into project entries: `id`, `name`, `subtitle` (the current company line, optional), `description`, `stack: string[]`, `githubUrl`.
   - Placeholder GitHub URLs and stacks go in for now (e.g. React, TypeScript, Node, PostgreSQL) — you can swap in real values, or tell me the real names/links/stacks and I'll fill them in.

2. **Section** (`src/components/trail/GrassExperience.tsx`)
   - Heading becomes "Projects", intro line rewritten ("A few things I've built along the trail.").
   - Card layout: project title, description, a row of stack chips, and a "View on GitHub" link with an icon. The date/location eyebrow line is removed.
   - Dirt-path timeline, reveal animations, and card styling stay as they are.

3. **Nav** (`src/components/trail/TopNav.tsx`)
   - Rename the "Experience" nav label to "Projects" (anchor id stays `#experience` unless you want it renamed to `#projects`, which I'd also update in the nav and section).

## Notes

The old `Experience` type stays in `src/types/portfolio.ts` if other files use it; the new `Project` shape is used by this section.
