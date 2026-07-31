# @bluecateng/pelagos [![GitHub license](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/bluecatengineering/pelagos-packages/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@bluecateng/pelagos.svg?style=flat)](https://www.npmjs.com/package/@bluecateng/pelagos)

UI components.

## Installation

```bash
npm i -S @bluecateng/pelagos
```

## Getting started

Add the shared component styles to your application's entry `.less` file.
Choose one theme setup below; the core and spinner theme must use the same
light or dark variant.

### Fixed theme

For an application that always uses one theme, import the fixed core and
spinner theme files:

```less
@import '@bluecateng/pelagos/less/core';
@import '@bluecateng/pelagos/less/core-dark'; // or core-light
@import '@bluecateng/pelagos/less/inputs';
@import '@bluecateng/pelagos/less/scrollbar';
@import '@bluecateng/pelagos/less/spinner-dark'; // or spinner-light
```

### User-selectable theme

For runtime theme selection, import the theme and spinner bases, then bind
their mixins to a root attribute. This is the setup used by the example
application.

```less
@import '@bluecateng/pelagos/less/core';
@import '@bluecateng/pelagos/less/themes';
@import '@bluecateng/pelagos/less/inputs';
@import '@bluecateng/pelagos/less/scrollbar';
@import '@bluecateng/pelagos/less/spinner';

[data-theme='light'],
[data-theme='auto'] {
	.theme-light();
}

[data-theme='dark'] {
	.theme-dark();
}

[data-theme='auto'] {
	@media (prefers-color-scheme: dark) {
		.theme-dark();
	}
}

.CssSpinner {
	.css-spinner();

	[data-theme='light'] &,
	[data-theme='auto'] & {
		animation-name: spinner-light;
	}

	[data-theme='dark'] & {
		animation-name: spinner-dark;
	}

	[data-theme='auto'] & {
		@media (prefers-color-scheme: dark) {
			animation-name: spinner-dark;
		}
	}
}
```

Set the attribute on the root element (`<html data-theme="auto">`) and update
`document.documentElement.dataset.theme` to switch at runtime. The `auto`
binding above follows the OS preference. Components take their colors from CSS
custom properties supplied by the theme; importing `core` without either theme
setup leaves them colorless or unstyled.

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

## Example application

[pelagos-example](https://github.com/bluecatengineering/pelagos-example) is a
small runnable application whose examples are indexed by what each one
demonstrates — including the theme switching and layout patterns described
above.

## Notes for AI coding agents

[AGENTS.md](./AGENTS.md) is a compact list of the non-obvious contracts —
the layout reset, theme wiring, components that clone their children,
labeling rules — that agents (and humans) otherwise rediscover from source.
It ships with the npm package, so it is available in `node_modules` at the
point of use.
