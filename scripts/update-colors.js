const {readFileSync, writeFileSync} = require('fs');

const {safeLoad} = require('js-yaml');

const IN = 'defs/colors.yaml';
const JS = 'src/Colors.js';
const LESS = 'less/colors.less';

const HEADER = [
	'// This file was generated from defs/colors.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-colors`',
	'',
];

const colors = Object.entries(safeLoad(readFileSync(IN, 'utf8')));

writeFileSync(
	JS,
	HEADER.concat(
		colors
			.filter(([, {tags}]) => tags && tags.includes('primary'))
			.map(([key, {value}]) => 'export const ' + key.toUpperCase() + " = '" + value + "';"),
		''
	).join('\n')
);

writeFileSync(
	LESS,
	HEADER.concat(
		colors.map(
			([key, {value, alias, base, fade}]) =>
				'@' + key + ': ' + (value ? value : alias ? '@' + alias : 'fade(@' + base + ', ' + fade + ')') + ';'
		),
		''
	).join('\n')
);
