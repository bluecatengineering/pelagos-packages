#!/usr/bin/env node

'use strict';

const {readFile, writeFile} = require('node:fs/promises');

const {parse} = require('yaml');

const groupBy = (items, getKey) => {
	const map = new Map();
	for (const item of items) {
		const key = getKey(item);
		const array = map.get(key);
		if (array) {
			array.push(item);
		} else {
			map.set(key, [item]);
		}
	}
	return map;
};

const processEntries = (map, mapFn) => {
	const result = {};
	for (const [k, v] of map.entries()) {
		result[k] = Object.fromEntries(v.map(mapFn));
	}
	return result;
};

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
	Promise.all(['themes', 'themes-meta'].map((name) => readFile(`packages/pelagos/defs/${name}.yaml`, 'utf8'))).then(
		([themes, metaText]) => {
			const meta = parse(metaText);
			return Object.fromEntries(
				Object.entries(parse(themes)).map(([k, v]) => [
					k,
					processEntries(
						groupBy(
							Object.entries(v).filter(([k]) => meta[k]?.group !== 'deprecated'),
							([k]) => meta[k].group
						),
						([k, v]) => {
							const parts = v.split('/');
							return [
								k,
								{
									type: 'color',
									value: parts.length === 1 ? `{colors.${v}}` : `rgba($colors.${parts[0]},${parts[1]})`,
								},
							];
						}
					),
				])
			);
		}
	);

const loadSpacing = () =>
	readFile('packages/pelagos/defs/spacing.yaml', 'utf8').then((text) =>
		Object.fromEntries(Object.entries(parse(text)).map(([k, size]) => [k, {type: 'spacing', value: `${size}px`}]))
	);

const loadFonts = () =>
	readFile('packages/pelagos/defs/fonts.yaml', 'utf8').then((text) =>
		processEntries(
			groupBy(
				Object.entries(parse(text).fonts).filter(([, v]) => !v.deprecated),
				([, {group}]) => group
			),
			([k, {use, specs}]) => [
				k,
				{
					type: 'typography',
					value: specs,
					description: use,
				},
			]
		)
	);

const shadowNames = ['umbra', 'penumbra', 'ambient'];
const generateShadow = (values, index) => {
	const [x, y, blur, spread] = values.split(' ');
	return {type: 'dropShadow', color: `{shadow.shadow-${shadowNames[index]}}`, x, y, blur, spread};
};

const loadShadows = () =>
	readFile('packages/pelagos/defs/shadows.yaml', 'utf8').then((text) => {
		const {levels, umbra, penumbra, ambient} = parse(text);
		return Object.fromEntries(
			levels.map((l) => [
				`shadow-${`${l}`.padStart(2, '0')}`,
				{type: 'boxShadow', value: [umbra[l], penumbra[l], ambient[l]].map(generateShadow)},
			])
		);
	});

Promise.all([loadColors(), loadThemes(), loadSpacing(), loadFonts(), loadShadows()])
	.then(([colors, themes, spacing, fonts, shadows]) =>
		writeFile(
			'build/storybook/figma-tokens.json',
			JSON.stringify({global: {colors, ...spacing, ...fonts, ...shadows}, ...themes})
		)
	)
	.catch((error) => (console.error(error), processEntries.exit(1)));
