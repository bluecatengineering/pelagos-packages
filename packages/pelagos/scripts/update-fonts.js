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
	.then(([yamlText, options]) => {
		const {rootFont, families, fonts} = parse(yamlText);
		return format(
			HEADER.concat(
				`@root-font:{font:${rootFont}};`,
				Object.entries(fonts).map(
					([
						key,
						{
							deprecated,
							specs: {fontFamily, fontSize, lineHeight, fontWeight, letterSpacing},
						},
					]) =>
						deprecated
							? `\n/** @deprecated */\n@${key}:{font-size:${fontSize};font-weight:${fontWeight};${
									lineHeight ? `line-height:${lineHeight}` : ''
								}};`
							: families[fontFamily].default
								? `@${key}:{font-size:${fontSize};line-height:${lineHeight};font-weight:${fontWeight};letter-spacing:${letterSpacing}};`
								: `@${key}:{font:${fontWeight} ${fontSize}/${lineHeight} ${families[fontFamily].css};letter-spacing:${letterSpacing}};`
				),
				''
			).join('\n'),
			{...options, filepath: LESS}
		);
	})
	.then((code) => writeFile(LESS, code))
	.catch((error) => (console.error(error), process.exit(1)));
