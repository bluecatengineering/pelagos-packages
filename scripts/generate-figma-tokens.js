#!/usr/bin/env node

const {readFile, writeFile} = require('node:fs/promises');

const {parse} = require('yaml');

const loadColors = () =>
	readFile('packages/pelagos/defs/colors.yaml', 'utf8').then((text) => {
		const allColors = Object.entries(parse(text));
		const type = 'color';
		const colors = {};
		for (const [k, v] of allColors) {
			const {value, css, normal, hover} = v;
			if (value) {
				colors[k] = {type, value};
			} else {
				const name = css || k;
				for (let i = 0; i < normal.length; ++i) {
					colors[`${name}-${10 + i * 10}`] = {type, value: normal[i]};
				}
				for (let i = 0; i < hover.length; ++i) {
					colors[`${name}-${10 + i * 10}-hover`] = {type, value: hover[i]};
				}
			}
		}
		return colors;
	});

const loadThemes = () =>
	readFile('packages/pelagos/defs/themes.yaml', 'utf8').then((text) =>
		Object.fromEntries(
			Object.entries(parse(text)).map(([k, v]) => [
				k,
				Object.fromEntries(
					Object.entries(v).map(([k, v]) => {
						const parts = v.split('/');
						return [
							k,
							{type: 'color', value: parts.length === 1 ? `{colors.${v}}` : `rgba($colors.${parts[0]},${parts[1]})`},
						];
					})
				),
			])
		)
	);

const loadSpacing = () =>
	readFile('packages/pelagos/defs/spacing.yaml', 'utf8').then((text) =>
		Object.fromEntries(Object.entries(parse(text)).map(([k, {size}]) => [k, {type: 'spacing', value: `${size}px`}]))
	);

const loadFonts = () =>
	readFile('packages/pelagos/defs/fonts.yaml', 'utf8').then((text) =>
		Object.fromEntries(
			Object.entries(parse(text))
				.filter(([k]) => k !== 'root-font')
				.map(
					([
						k,
						{
							use,
							styles: {'font-size': fontSize, 'font-weight': fontWeight, 'line-height': lineHeight},
						},
					]) => [
						k,
						{
							type: 'typography',
							value: {
								fontFamily: 'Open Sans',
								fontWeight,
								fontSize,
								lineHeight: `${(lineHeight || 1.5) * parseInt(fontSize)}px`,
							},
							description: use,
						},
					]
				)
		)
	);

Promise.all([loadColors(), loadThemes(), loadSpacing(), loadFonts()])
	.then(([colors, {cg00, yg100}, spacing, fonts]) =>
		writeFile('.out/figma-tokens.json', JSON.stringify({global: {colors}, cg00, yg100, spacing, fonts}))
	)
	// eslint-disable-next-line no-console
	.catch((error) => (console.error(error), process.exit(1)));
