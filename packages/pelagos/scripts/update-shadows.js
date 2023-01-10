const {readFileSync, writeFileSync} = require('fs');

const {parse} = require('yaml');

const IN = 'defs/shadows.yaml';
const LESS = 'less/shadows.less';

const HEADER = [
	'// This file was generated from defs/shadows.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-shadows`',
	'',
];

const {levels, umbra, penumbra, ambient} = parse(readFileSync(IN, 'utf8'));

const generate = () =>
	levels.map(
		(key) =>
			`@shadow-${`${key}`.padStart(2, '0')}: ${umbra[key]} var(--shadow-umbra), ${
				penumbra[key]
			} var(--shadow-penumbra), ${ambient[key]} var(--shadow-ambient);`
	);

writeFileSync(LESS, HEADER.concat(generate(), '').join('\n'));
