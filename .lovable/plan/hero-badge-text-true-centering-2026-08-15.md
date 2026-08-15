# Hero badge text + true centering

## Is it centered?
Horizontally, yes. Vertically it is slightly low: the hero block uses `justify-center` together with `pt-24` (top padding for the fixed nav) and no matching bottom padding, so the whole text group sits about 96px below the true middle. That is what makes it read as off-center against the sun.

## Changes

`src/components/trail/MountainHero.tsx`

1. Badge text: `The trail starts here` → `UofT CS · 2025 Schulich Leader`
   - Uses a middle dot separator so it reads cleanly in the uppercase, letter-spaced badge style. (Noting the spelling: the award is "Schulich Leader".)
2. Vertical centering: add a matching bottom padding to the headline wrapper (`pb-24` alongside the existing `pt-24`) so the text group is optically centered in the viewport rather than pushed down by the nav offset.

No other content, layout, or animation changes.
