const {readFileSync, writeFileSync} = require('fs');

const {safeLoad} = require('js-yaml');

const IN = 'defs/shadows.yaml';
const LESS = 'less/shadows.less';

const HEADER = [
	'// This file was generated from defs/shadows.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-shadows`',
	'',
];

const spacing = Object.entries(safeLoad(readFileSync(IN, 'utf8')));

writeFileSync(
	LESS,
	HEADER.concat(
		spacing.map(([key, {value}]) => '@' + key + ': ' + value + ';'),
		''
	).join('\n')
);
