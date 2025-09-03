'use strict';

const {spawn} = require('node:child_process');
const {writeFile, readdir} = require('node:fs/promises');
const {join} = require('node:path');

const {explain} = require('jsdoc-api');
const jsdocParse = require('jsdoc-parse');

const force = process.argv[2] === '-f';

const checkDiff = (path) =>
	new Promise((resolve, reject) => {
		spawn('git', ['diff', '--quiet', '--cached', path], {stdio: 'ignore'}).on('close', resolve).on('error', reject);
	});

const addToGit = (path) =>
	new Promise((resolve, reject) => {
		spawn('git', ['add', path]).on('close', resolve).on('error', reject);
	});

const renderType = ({names}) => `\`${names.join(' / ')}\``;

const renderParams = (params) =>
	params.length
		? `

## Parameters

<table>
<thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead>
<tbody>
${params
	.map(({name, type, description}) => `<tr><td>${name}</td><td>${renderType(type)}</td><td>${description}</td></tr>`)
	.join('\n')}
</tbody>
</table>`
		: '';

const renderReturns = (returns) =>
	returns
		? `

## Returns

${returns.map(({type, description}) => `${renderType(type)}${description ? ` - ${description}` : ''}`).join('\n')}`
		: '';

const renderExamples = (examples) =>
	examples
		? `

## Example

\`\`\`js
${examples[0]}
\`\`\``
		: '';

const renderProperties = (props) =>
	props.length
		? `

#### Properties

<table>
<thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead>
<tbody>
${props
	.map(({name, type, description}) => `<tr><td>${name}</td><td>${renderType(type)}</td><td>${description}</td></tr>`)
	.join('\n')}
</tbody>
</table>`
		: '';

const otherRenderers = {
	typedef: ({id, description, type, properties}) => `

### ${id}

${renderType(type)} - ${description}${renderProperties(properties)}
`,
};

const renderOthers = (others) =>
	others.length
		? `

## Other types${others
				.map((data) => otherRenderers[data.kind]?.(data))
				.filter(Boolean)
				.join('\n')}`
		: '';

const renderMD = (
	group,
	[{id, description, params, returns, examples, meta}, ...others]
) => `{/* DO NOT EDIT, generated from ${meta.filename} */}

import {Meta} from '@storybook/addon-docs/blocks';

<Meta title="${group}/${id}" />

# ${id}

${description}${renderParams(params)}${renderReturns(returns)}${renderExamples(examples)}${renderOthers(others)}
`;

const generateDoc = (group, path) => {
	const outputPath = `${path.slice(0, -2)}mdx`;
	return explain({files: path})
		.then(jsdocParse)
		.then((result) =>
			result.length && result[0].access !== 'private'
				? writeFile(outputPath, renderMD(group, result)).then(() => addToGit(outputPath))
				: null
		);
};

const processFile = (group, path) =>
	force ? generateDoc(group, path) : checkDiff(path).then((code) => (code === 1 ? generateDoc(group, path) : null));

const scan = (group, basePath) =>
	readdir(basePath, {encoding: 'utf8', withFileTypes: true}).then((entries) =>
		Promise.all(
			entries.map((entry) => {
				const name = entry.name;
				return entry.isFile() && name !== 'index.js' && /\.js$/.test(name)
					? processFile(group, `${basePath}/${name}`)
					: Promise.resolve();
			})
		)
	);

Promise.all(['functions', 'hooks'].map((group) => scan(group, join(__dirname, '../src', group)))).catch(
	(error) => (console.error(error), process.exit(1))
);
