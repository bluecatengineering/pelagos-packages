const {readFileSync, writeFileSync} = require('fs');

const {parse} = require('yaml');

const IN = 'defs/themes.yaml';
const LESS = 'less/themes.less';

const HEADER = [
	'// This file was generated from defs/themes.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-themes`',
	'',
	"@import 'colors';",
	"@import 'shadows';",
	'',
];

const FOOTER = ['.theme-dark() {', '\t.theme-yg100();', '}', '', '.theme-light() {', '\t.theme-cg00();', '}', ''];

const SHADOWS = parse(readFileSync('defs/shadows.yaml', 'utf8')).levels.map((l) => `${l}`.padStart(2, '0'));

const themes = Object.entries(parse(readFileSync(IN, 'utf8')));

const valueToLess = (value) => {
	const match = /^(.+)\/(\d+%)$/.exec(value);
	return match ? `fade(@${match[1]}, ${match[2]})` : `@${value}`;
};

const entriesToLess = (value) =>
	Object.entries(value)
		.map(([key, value]) => `\t--${key}: ${valueToLess(value)};`)
		.join('\n');

const themeFooter = () =>
	`${SHADOWS.map((n) => `\t--shadow-${n}: @shadow-${n};`).join('\n')}
\t--print-color: @black;
\t--print-medium: fade(@black, 65%);
`;

writeFileSync(
	LESS,
	HEADER.concat(
		themes.map(([key, value]) => `.theme-${key}() {\n${entriesToLess(value)}\n${themeFooter(key)}}\n`),
		FOOTER
	).join('\n')
);
