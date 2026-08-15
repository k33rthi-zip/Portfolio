# New typography: Abril Fatface + Cabin

Swap the site-wide font pairing from Fraunces + Nunito to a playful display pair.

- Headings: **Abril Fatface** — bold, high-contrast display serif with a creative-portfolio feel.
- Body: **Cabin** — friendly humanist sans, easy to read at paragraph sizes.

## What changes

1. `index.html` — replace the Google Fonts link with Abril Fatface (400) + Cabin (400/500/600/700).
2. `src/index.css` — update the font tokens:
   - `--font-display: 'Abril Fatface', Georgia, serif`
   - `--font-sans: 'Cabin', ui-sans-serif, system-ui, sans-serif`
3. Heading rule tuning: Abril Fatface ships a single weight, so `h1–h4` drop `font-weight: 600` to `400` and loosen letter-spacing slightly (`-0.01em`) since it is already tightly set.
4. Body sizing check: Cabin runs slightly smaller than Nunito, so nudge base size to `1.09375rem` to keep paragraph rhythm.

No component files change — everything reads from the tokens, so headings, postcards, the collection page, and the contact footer update automatically.

## Notes

Since Abril Fatface has no bold, any `font-bold` on a heading will render the same weight — that's expected and keeps the display type clean.
