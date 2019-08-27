const {readFileSync, writeFileSync} = require('fs');

const {safeLoad} = require('js-yaml');

const IN = 'defs/fonts.yaml';
const LESS = 'less/fonts.less';

const HEADER = [
	'// This file was generated from defs/fonts.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-fonts`',
	'',
	'// stylelint-disable @bluecat/property-strict-value',
	'',
];

const fonts = Object.entries(safeLoad(readFileSync(IN, 'utf8')));

writeFileSync(
	LESS,
	HEADER.concat(
		fonts.map(
			([key, {styles}]) =>
				'@' +
				key +
				': {\n' +
				Object.entries(styles)
					.map(([k, v]) => `\t${k}: ${v};`)
					.join('\n') +
				'\n};'
		),
		''
	).join('\n')
);
