'use strict';

const {readFileSync, writeFileSync} = require('fs');

const {parse} = require('yaml');

const IN = 'defs/breakpoints.yaml';
const LESS = 'less/breakpoints.less';

const HEADER = [
	'// This file was generated from defs/breakpoints.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-breakpoints`',
	'',
	'.breakpoints() {',
];
const FOOTER = [
	'}',
	'',
	'.breakpoint(@name; @content) {',
	'\t// stylelint-disable-next-line media-query-no-invalid -- the value is a variable',
	'\t@media (min-width: .breakpoints[@@name]) {',
	'\t\t@content();',
	'\t}',
	'}',
	'',
];

const breakpoints = Object.entries(parse(readFileSync(IN, 'utf8')));

writeFileSync(
	LESS,
	HEADER.concat(
		breakpoints.map(([key, size]) => `\t@${key}: ${size / 16}rem;`),
		FOOTER
	).join('\n')
);
