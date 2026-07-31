# @bluecateng/pelagos [![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/bluecatengineering/pelagos-packages/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@bluecateng/pelagos.svg?style=flat)](https://www.npmjs.com/package/@bluecateng/pelagos)

UI components.

## Installation

```bash
npm i -S @bluecateng/pelagos
```

## Getting started

Two style imports are required before components render correctly: the core
styles and a theme.

```less
@import '@bluecateng/pelagos/less/core';
@import '@bluecateng/pelagos/less/core-dark'; // or core-light
```

Components take their colors from CSS custom properties (`--text-primary`,
`--background`, …) that are defined by the theme. **If components render
colorless or unstyled, the core styles were imported without a theme.**

## Theming

There are two ways to provide the theme:

- **Fixed theme** — import `less/core-dark` or `less/core-light` beside
  `less/core`; the theme applies unconditionally.
- **Switchable theme** — import `less/themes` and bind the theme mixins to
  an attribute you control, for example:

  ```less
  [data-theme='dark'],
  [data-theme='auto'] {
  	.theme-dark();
  }

  [data-theme='light'] {
  	.theme-light();
  }

  [data-theme='auto'] {
  	@media (prefers-color-scheme: light) {
  		.theme-light();
  	}
  }
  ```

  Set the attribute on the root element (`<html data-theme="auto">`), stamp
  `document.documentElement.dataset.theme` to switch at runtime, and persist
  the user's explicit choice — the `auto` binding above follows the OS
  setting until they make one.

## Layout

The core styles apply an opinionated reset (inside `@layer pelagos`):
`div`, `form`, `main`, `header`, and `footer` default to

```css
display: flex;
flex-direction: column;
flex: none;
```

Every plain `div` is therefore already a column flex container — lay out
rows with `flex-direction: row` rather than adding wrapper elements to
fight the default. `flex: none` also means children do not grow; set
`flex: 1` explicitly where content should fill the available space.

## Storybook

For examples and documentation, please see [the Storybook site](https://storybook.dnsedge.tools/)

## Notes for AI coding agents

[AGENTS.md](./AGENTS.md) is a compact list of the non-obvious contracts —
the layout reset, theme wiring, components that clone their children,
labeling rules — that agents (and humans) otherwise rediscover from source.
It ships with the npm package, so it is available in `node_modules` at the
point of use.
