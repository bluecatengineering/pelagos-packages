const {readFileSync, writeFileSync} = require('fs');

const {load} = require('js-yaml');

const IN = 'defs/spacing.yaml';
const LESS = 'less/spacing.less';

const HEADER = [
	'// This file was generated from defs/spacing.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-spacing`',
	'',
];

const spacing = Object.entries(load(readFileSync(IN, 'utf8')));

writeFileSync(
	LESS,
	HEADER.concat(
		spacing.map(([key, {size}]) => '@' + key + ': ' + size + 'px;'),
		''
	).join('\n')
);
