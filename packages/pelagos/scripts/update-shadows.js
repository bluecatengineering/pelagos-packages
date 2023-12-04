const {readFile, writeFile} = require('node:fs/promises');

const {parse} = require('yaml');
const {resolveConfig, format} = require('prettier');

const IN = 'defs/shadows.yaml';
const LESS = 'less/shadows.less';

const HEADER = [
	'// This file was generated from defs/shadows.yaml',
	'// it will be re-generated on commit, to generate manually run `npm run update-shadows`',
	'',
];

Promise.all([readFile(IN, 'utf8'), resolveConfig(LESS)])
	.then(([yamlText, options]) => {
		const {levels, umbra, penumbra, ambient} = parse(yamlText);
		return format(
			HEADER.concat(
				levels.map(
					(key) =>
						`@shadow-${`${key}`.padStart(2, '0')}: ${umbra[key]} var(--shadow-umbra), ${
							penumbra[key]
						} var(--shadow-penumbra), ${ambient[key]} var(--shadow-ambient);`
				),
				''
			).join('\n'),
			{...options, filepath: LESS}
		);
	})
	.then((code) => writeFile(LESS, code))
	.catch((error) => (console.error(error), process.exit(1)));
