# Sun Cursor

Replace the default mouse pointer with a small glowing sun that follows the cursor across the site. The sun fits the daylight palette of the trail (sky, clouds, balloon, mountains) better than a moon.

## Behaviour

- A soft golden sun disc with short rays follows the pointer with a slight spring lag, so it glides rather than snaps.
- Over links, buttons, postcards and other clickable elements, the sun grows a bit and its glow brightens.
- On click, the sun gives a quick pulse.
- The native arrow is hidden on desktop pointers only. Touch devices, and anyone with reduced-motion preference, keep the normal behaviour (reduced motion: sun still shows but follows instantly, no bobbing).
- Text inputs and textareas keep the normal text caret so typing stays usable.

## Technical notes

- New `src/components/trail/SunCursor.tsx`: fixed-position, `pointer-events-none`, `z-[100]` element driven by Framer Motion `useSpring` on pointer x/y; renders an SVG sun using existing `--color-sun` / `--color-clay` tokens.
- Hover state detected with `document.elementFromPoint` / `closest('a,button,[role="button"],input,select')` on pointer move.
- Mounted once in `src/App.tsx` inside `BrowserRouter` so it applies to every route.
- Cursor hiding via a scoped rule in `src/index.css` under `@media (hover: hover) and (pointer: fine)`, with an exception for text fields.
