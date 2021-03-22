const {readFileSync, writeFileSync} = require('fs');

const {load} = require('js-yaml');

const IN = 'defs/shadows.yaml';
const LESS = 'less/shadows.less';

const HEADER = [
	'// This file was generated from defs/shadows.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-shadows`',
	'',
];

const {levels, base, dark, light} = load(readFileSync(IN, 'utf8'));

const color = (alpha) => `rgba(0, 0, 0, ${alpha})`;

const generate = (name, {umbra, penumbra, ambient}) =>
	levels.map(
		(key) =>
			`@shadow-${name}-${`${key}`.padStart(2, '0')}: ${base.umbra[key]} ${color(umbra)}, ${base.penumbra[key]} ${color(
				penumbra
			)}, ${base.ambient[key]} ${color(ambient)};`
	);

writeFileSync(LESS, HEADER.concat(generate('dark', dark), generate('light', light), '').join('\n'));
