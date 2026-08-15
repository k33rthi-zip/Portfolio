# Skills as a skill tree

Replace the tree-rings graphic with a single illustrated tree: a trunk, three main branches, and clusters of leaves where each leaf is one skill.

## Structure

- One geometric tree centered in the Skills section: soil mound, tapered trunk, three branches reaching up-left, up-center, and up-right.
- Each branch ends in a leaf cluster = one skill category:
  - Languages (e.g. Python, SQL, JavaScript, TypeScript)
  - Tools (e.g. Figma, Git, Tableau, Jira, Notion)
  - Transferable Skills (e.g. Leadership, Communication, Stakeholder Management, Storytelling)
- Each leaf is a rounded leaf shape with the skill name inside it, tinted in the existing pine/moss/sun palette so the three clusters read as distinct groups.
- A small label sits near each cluster naming the category.

## Motion

- On scroll into view: trunk draws upward, branches draw outward, then leaves pop in one by one with a slight stagger.
- Gentle idle sway on the leaf clusters; hovering a leaf lifts and brightens it.
- Reduced-motion users get the finished tree with no drawing or sway.

## Layout

- Desktop: full-width tree illustration with leaves labeled directly on the tree.
- Mobile: the tree scales down and the three clusters collapse into stacked category cards with skill chips, so text stays readable.

## Technical notes

- Rewrite `src/components/trail/SkillsSection.tsx`; drop the `TreeRings` ring component and the current three ring cards.
- Skills data moves to a typed array of `{ category, skills[] }` at the top of the file.
- SVG tree drawn inline with existing design tokens (`--color-soil`, `--color-pine`, `--color-moss`, `--color-sun`); leaf text rendered as SVG `<text>` on desktop.
- Animation with framer-motion `useInView` + `pathLength`, matching the current file's patterns; `useReducedMotion` respected.
- Mobile fallback cards reuse the existing chip styling.
