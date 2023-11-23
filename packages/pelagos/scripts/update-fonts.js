const {readFile, writeFile} = require('node:fs/promises');

const {parse} = require('yaml');
const {resolveConfig, format} = require('prettier');

const IN = 'defs/fonts.yaml';
const LESS = 'less/fonts.less';

const HEADER = [
	'// This file was generated from defs/fonts.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-fonts`',
	'',
	'// stylelint-disable @bluecateng/property-strict-value',
	'',
];

Promise.all([readFile(IN, 'utf8'), resolveConfig(LESS)])
	.then(([yamlText, options]) =>
		format(
			HEADER.concat(
				Object.entries(parse(yamlText)).map(
					([key, {styles}]) =>
						(/^font-/.test(key) ? '\n/** @deprecated */\n' : '') +
						'@' +
						key +
						': {\n' +
						Object.entries(styles)
							.map(([k, v]) => `\t${k}: ${v};`)
							.join('\n') +
						'\n};'
				),
				''
			).join('\n'),
			{...options, filepath: LESS}
		)
	)
	.then((code) => writeFile(LESS, code))
	.catch((error) => (console.error(error), process.exit(1)));
