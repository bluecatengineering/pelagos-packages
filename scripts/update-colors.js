const {readFileSync, writeFileSync} = require('fs');

const {load} = require('js-yaml');

const IN = 'defs/colors.yaml';
const LESS = 'less/colors.less';

const HEADER = [
	'// This file was generated from defs/colors.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-colors`',
	'',
];

const colors = Object.entries(load(readFileSync(IN, 'utf8')));

const toLess = ([key, {value}]) => `@${key}: ${value};`;

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
		''
	).join('\n')
);
