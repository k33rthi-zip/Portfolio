# Fix hero link row: styling and destinations

## What's happening now
- The Resume button uses a filled dark-green style (`bg-pine` with light text), while LinkedIn and GitHub use the outlined cream style. That's why Resume looks "coloured in" — it was styled as the primary action.
- Resume points to `/resume.pdf`, which is still the placeholder file.
- LinkedIn points to `https://www.linkedin.com/in/keerthi-pawar-m/`. The URL itself is valid; links open in a new tab, which the embedded preview often blocks — worth re-checking on the published site. If the handle is wrong, the correct one is needed.

## Changes
1. In `src/components/trail/HeroLinks.tsx`, give Resume the same outlined style as LinkedIn and GitHub so all three buttons match.
2. In `src/data/portfolio-data.ts`, change `profileLinks.resume` to `https://www.google.com` for now (temporary placeholder until the real PDF is uploaded).
3. Keep `target="_blank"` + `rel="noopener noreferrer"` on all three.

## Question
If the LinkedIn URL above isn't your profile, send the correct link and I'll swap it in.
