const {readFileSync, writeFileSync} = require('fs');

const {load} = require('js-yaml');

const IN = 'defs/colors.yaml';
const JS = 'src/Colors.js';
const LESS_DARK = 'less/colors-dark.less';
const LESS_LIGHT = 'less/colors-light.less';
const LESS = 'less/colors.less';

const HEADER = [
	'// This file was generated from defs/colors.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-colors`',
	'',
];

const colors = Object.entries(load(readFileSync(IN, 'utf8')));

const toLess = ([key, {value}]) => `@${key}: ${value};`;

writeFileSync(
	JS,
	HEADER.concat(
		colors
			.filter(([, {tags}]) => tags && !tags.includes('background'))
			.map(([key, {value}]) => 'export const ' + key.toUpperCase() + " = '" + value + "';"),
		''
	).join('\n')
);

writeFileSync(
	LESS_DARK,
	HEADER.concat(colors.filter(([, {tags}]) => tags && tags.includes('dark')).map(toLess), '').join('\n')
);

writeFileSync(
	LESS_LIGHT,
	HEADER.concat(colors.filter(([, {tags}]) => tags && tags.includes('light')).map(toLess), '').join('\n')
);

const normalColors = colors.filter(([, {normal}]) => normal);

const hoverColors = colors.filter(([, {hover}]) => hover);

writeFileSync(
	LESS,
	HEADER.concat(
		colors.filter(([, {tags}]) => tags && tags.includes('global')).map(toLess),
		normalColors.flatMap(([key, {css, normal}]) =>
			normal.map((value, index) => `@${css || key}-${10 + index * 10}: ${value};`)
		),
		hoverColors.flatMap(([key, {css, hover}]) =>
			hover.map((value, index) => `@${css || key}-${10 + index * 10}-hover: ${value};`)
		),
		normalColors.flatMap(([key, {normal}]) =>
			normal.map((value, index) => `// @deprecated\n@${key}${10 + index * 10}: ${value};`)
		),
		hoverColors.flatMap(([key, {hover}]) =>
			hover.map((value, index) => `// @deprecated\n@${key}Hover${10 + index * 10}: ${value};`)
		),
		colors
			.filter(([, {tags}]) => tags && tags.includes('background'))
			.map(([key, {value}]) => `// @deprecated\n@${key}: ${value};`),
		''
	).join('\n')
);
