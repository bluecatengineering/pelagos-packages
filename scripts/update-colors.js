const {readFileSync, writeFileSync} = require('fs');

const {load} = require('js-yaml');

const IN = 'defs/colors.yaml';
const JS = 'src/Colors.js';
const LESS_DARK = 'less/colors-dark.less';
const LESS_LIGHT = 'less/colors-light.less';

const HEADER = [
	'// This file was generated from defs/colors.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-colors`',
	'',
];

const colors = Object.entries(load(readFileSync(IN, 'utf8')));

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
	HEADER.concat(
		colors.filter(([, {tags}]) => tags && tags.includes('dark')).map(([key, {value}]) => `@${key}: ${value};`),
		''
	).join('\n')
);

writeFileSync(
	LESS_LIGHT,
	HEADER.concat(
		colors.filter(([, {tags}]) => tags && tags.includes('light')).map(([key, {value}]) => `@${key}: ${value};`),
		''
	).join('\n')
);
