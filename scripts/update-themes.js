const {readFileSync, writeFileSync} = require('fs');

const {load} = require('js-yaml');

const IN = 'defs/themes.yaml';
const LESS = 'less/themes.less';

const HEADER = [
	'// This file was generated from defs/themes.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-themes`',
	'',
	"@import 'colors';",
	"@import 'shadows';",
	"@import 'deprecated-color-tokens';",
	'',
];

const FOOTER = ['.theme-dark() {', '\t.theme-yg100();', '}', '', '.theme-light() {', '\t.theme-cg00();', '}', ''];

const SHADOWS = ['01', '02', '03', '04', '06', '08', '12', '16', '24'];

const themes = Object.entries(load(readFileSync(IN, 'utf8')));

const valueToLess = (value) => {
	const match = /^(.+)\/(\d+%)$/.exec(value);
	return match ? `fade(@${match[1]}, ${match[2]})` : `@${value}`;
};

const entriesToLess = (value) =>
	Object.entries(value)
		.map(([key, value]) => `\t--${key}: ${valueToLess(value)};`)
		.join('\n');

const themeFooter = (key) => {
	const kind = /100$/.test(key) ? 'dark' : 'light';
	return `${SHADOWS.map((n) => `\t--shadow-${n}: @shadow-${kind}-${n};`).join('\n')}
\t--print-color: @black;
\t--print-medium: fade(@black, 65%);
\t.deprecated-color-tokens();
`;
};

writeFileSync(
	LESS,
	HEADER.concat(
		themes.map(([key, value]) => `.theme-${key}() {\n${entriesToLess(value)}\n${themeFooter(key)}}\n`),
		FOOTER
	).join('\n')
);
