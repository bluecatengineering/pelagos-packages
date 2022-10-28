const {spawn} = require('child_process');
const {opendir, writeFile} = require('fs/promises');
const {join} = require('path');

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

| Param | Type | Description |
| --- | --- | --- |
${params.map(({name, type, description}) => `| ${name} | ${renderType(type)} | ${description} |`).join('\n')}`
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

| Name | Type | Description |
| --- | --- | --- |
${props.map(({name, type, description}) => `| ${name} | ${renderType(type)} | ${description} |`).join('\n')}`
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
) => `<!-- DO NOT EDIT, generated from ${meta.filename} -->

import {Meta} from '@storybook/addon-docs';

<Meta title="${group}/${id}" parameters={{previewTabs: {canvas: {hidden: true}}}} />

# ${id}

${description}${renderParams(params)}${renderReturns(returns)}${renderExamples(examples)}${renderOthers(others)}
`;

const generateDoc = (group, path) => {
	const outputPath = `${path.slice(0, -2)}stories.mdx`;
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
	opendir(basePath).then((dir) => {
		const process = (entry) => {
			if (!entry) {
				return dir.close();
			}

			const name = entry.name;
			return (
				entry.isFile() && name !== 'index.js' && /\.js$/.test(name)
					? processFile(group, `${basePath}/${name}`)
					: Promise.resolve()
			)
				.then(() => dir.read())
				.then(process);
		};

		return dir.read().then(process);
	});

Promise.all(['functions', 'hooks'].map((group) => scan(group, join(__dirname, '../src', group)))).catch(
	(error) => (console.error(error), process.exit(1))
);
