# Pelagos — notes for AI coding agents

Load-bearing facts about `@bluecateng/pelagos` that are hard to guess from
component names and easy to get wrong. Useful for humans too. When a prop is
unclear, the propTypes JSDoc in `dist/components/*.js` and the bundled
`dist/index.d.ts` are accurate — prefer reading them over guessing.

## Styling context

- `less/core` applies an opinionated reset (inside `@layer pelagos`):
  `div`, `form`, `main`, `header`, and `footer` default to `display: flex;
flex-direction: column; flex: none`. Every plain `div` is a column flex
  container — lay out rows with `flex-direction: row` instead of adding
  wrapper elements to fight the default. `flex: none` also means children
  do not grow; set `flex: 1` explicitly where content should fill.
- Components take their colors from CSS custom properties
  (`--text-primary`, `--background`, …) that are defined by a **theme**.
  Symptom: everything renders colorless or unstyled → `less/core` was
  imported without a theme. For a fixed theme, import `less/core-dark` or
  `less/core-light` beside `less/core`; if using `.CssSpinner`, import the
  corresponding `less/spinner-dark` or `less/spinner-light`. For a
  user-selectable theme, import `less/themes` and `less/spinner`, then bind
  the theme mixins and spinner animation names to the same `data-theme`
  attribute (see "Getting started" in the README).

## Component contracts

- `Collapsible` takes exactly two children — header and content — and
  **clones the content element**, stamping `id`, `role="region"`,
  `aria-labelledby`, and a ref onto it. Pass an element that can carry
  `role="region"` (for example a `div` wrapper): passing a `<ul>` or
  `<table>` directly overrides its semantics, so a list's `<li>` children
  lose their list parent and axe reports `listitem` violations.
- `IconButton`'s `tooltipText` labels the button only **while the tooltip
  is visible** (`aria-labelledby`). Also set `aria-label`, or the button
  has no accessible name at rest and axe reports `button-name`.

## Theming and visual tests

- Theme changes transition colors. Tools that sample rendered colors —
  axe's color-contrast rule, screenshot diffs — immediately after stamping
  a theme attribute will see mid-animation frames (phantom interpolated
  colors that exist on no steady frame). Disable CSS transitions and
  animations in the test context first. Tooltips fade under JS control and
  ignore that CSS override — dismiss them (unhover and blur) before
  sampling.
- Status tokens are not text colors: `--support-success` and
  `--support-caution-major` fall below the WCAG 4.5:1 text ratio on light
  backgrounds (and `--support-error` is borderline on tinted layers). Use
  them for icons and borders. For text over tag backgrounds use the
  theme-paired combination: `--tag-color-*` on `--tag-background-*`.
