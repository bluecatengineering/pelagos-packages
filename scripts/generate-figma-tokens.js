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
	Promise.all(['themes', 'themes-meta'].map((name) => readFile(`packages/pelagos/defs/${name}.yaml`, 'utf8'))).then(
		([themes, metaText]) => {
			const meta = parse(metaText);
			return Object.fromEntries(
				Object.entries(parse(themes))
					.filter(([k]) => meta[k]?.group !== 'deprecated')
					.map(([k, v]) => [
						k,
						Object.fromEntries(
							Object.entries(v).map(([k, v]) => {
								const parts = v.split('/');
								return [
									k,
									{
										type: 'color',
										value: parts.length === 1 ? `{colors.${v}}` : `rgba($colors.${parts[0]},${parts[1]})`,
									},
								];
							})
						),
					])
			);
		}
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

const shadowNames = ['umbra', 'penumbra', 'ambient'];
const generateShadow = (values, index) => {
	const [x, y, blur, spread] = values.split(' ');
	return {type: 'dropShadow', color: `{shadow-${shadowNames[index]}}`, x, y, blur, spread};
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
	.then(([colors, {cg00, yg100}, spacing, fonts, shadows]) =>
		writeFile(
			'build/storybook/figma-tokens.json',
			JSON.stringify({global: {colors}, cg00, yg100, spacing, fonts, shadows})
		)
	)
	// eslint-disable-next-line no-console
	.catch((error) => (console.error(error), process.exit(1)));
