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

writeFileSync(
	LESS,
	HEADER.concat(
		colors.filter(([, {tags}]) => tags && tags.includes('global')).map(toLess),
		colors
			.filter(([, {palette}]) => palette)
			.flatMap(([key, {palette}]) => palette.map((value, index) => `@${key}${10 + index * 10}: ${value};`)),
		colors.filter(([, {tags}]) => tags && tags.includes('background')).map(toLess),
		''
	).join('\n')
);
