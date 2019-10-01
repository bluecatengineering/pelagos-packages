const {readFileSync, writeFileSync} = require('fs');

const {safeLoad} = require('js-yaml');

const IN = 'defs/elevations.yaml';
const LESS = 'less/elevations.less';

const HEADER = [
	'// This file was generated from defs/elevations.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-elevations`',
	'',
	"@import 'colors';",
	"@import 'shadows';",
	'',
];

const elevations = Object.entries(safeLoad(readFileSync(IN, 'utf8')));

writeFileSync(
	LESS,
	HEADER.concat(
		elevations.map(
			([key, {bg, shadow, zIndex}]) =>
				`@${key}: {
	background-color: @${bg};
	box-shadow: @${shadow};
	z-index: ${zIndex};
};`
		),
		''
	).join('\n')
);
