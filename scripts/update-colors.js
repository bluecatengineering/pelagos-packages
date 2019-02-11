const {readFileSync, writeFileSync} = require('fs');

const IN = 'less/colors.less';
const OUT = 'src/Colors.js';

const HEADER = [
	'// This file was generated from colors.less',
	'// it will be re-generated on commit, to generate manually run `npm run update-colors`',
	'',
];

writeFileSync(
	OUT,
	HEADER.concat(
		readFileSync(IN, 'utf8')
			.split('\n')
			.map(line => /^@(\w+): ([^;]+);/.exec(line))
			.filter(r => r)
			.map(r => 'export const ' + r[1].toUpperCase() + " = '" + r[2] + "';"),
		''
	).join('\n')
);
