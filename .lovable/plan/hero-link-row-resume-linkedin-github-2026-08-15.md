# Hero link row: Resume, LinkedIn, GitHub

Add a row of three links in the hero, below your name and the short intro paragraph.

## What it looks like

- Three pill buttons in a horizontal row (stacking on small phones), styled with the existing trail palette: Resume filled in pine with cream text, LinkedIn and GitHub outlined.
- Each has a small flat geometric icon matching the site's illustration style (a folded page, the LinkedIn mark, the GitHub mark).
- Subtle hover lift, and they respect the sun cursor's interactive grow state.
- Same parallax/fade motion as the rest of the hero text, so they move together on scroll.

## Behavior

- Resume: opens a PDF in a new tab.
- LinkedIn: https://www.linkedin.com/in/keerthi-pawar-m/ in a new tab.
- GitHub: https://github.com/k33rthi-zip in a new tab.

## Resume file

I'll wire the button to `/resume.pdf` and add a placeholder file at that path. To use your real resume, upload the PDF in chat (or drop it into the project's `public` folder as `resume.pdf`) and it will work immediately — no code change needed.

## Technical notes

- New component `src/components/trail/HeroLinks.tsx` with the three links and inline SVG icons.
- Rendered inside the existing headline block in `src/components/trail/MountainHero.tsx`, after the intro paragraph, with spacing adjusted so the block stays vertically centered.
- Link URLs added to `socialLinks` / a small constant in `src/data/portfolio-data.ts` so they live with the rest of the content.
- All links use `target="_blank"` with `rel="noopener noreferrer"`; the resume link also gets a `download` affordance and accessible labels.
