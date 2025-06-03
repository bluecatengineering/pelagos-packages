'use strict';

const {readdir, readFile} = require('node:fs/promises');
const {basename, join} = require('node:path');

const parser = require('@babel/parser');

const nodeTypes = ['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration'];

const parseJS = (imports, path, shortPath) =>
	readFile(path, 'utf8').then(
		(text) => {
			try {
				const ast = parser.parse(text, {
					sourceType: 'module',
					plugins: ['jsx', 'classProperties', 'doExpressions', 'throwExpressions'],
				});
				if (ast.type !== 'File') {
					console.error(`Unexpected ast type: ${ast.type}`);
					process.exit(1);
				}

				for (const node of ast.program.body) {
					if (nodeTypes.includes(node.type) && node.source) {
						const source = node.source.value;
						if (source[0] === '.') {
							const sourcePath = join(shortPath, source);
							imports.set(sourcePath, (imports.get(sourcePath) || 0) + 1);
						}
					}
				}
			} catch (e) {
				console.error(`Error parsing ${path}`, e);
				process.exit(1);
			}
		},
		(error) => {
			console.error(`Error reading ${path}: ${error.message}`, error);
			process.exit(1);
		}
	);

const scanDir = (map, basePath, shortPath) => {
	const imports = new Map();
	map.set(shortPath, imports);
	return readdir(basePath, {withFileTypes: true}).then((entries) =>
		Promise.all(
			entries.map((entry) => {
				const name = entry.name;
				return entry.isDirectory()
					? scanDir(map, `${basePath}/${name}`, `${shortPath}/${name}`)
					: entry.isFile() && /\.js$/.test(name) && !/\.stories\.js$/.test(name)
						? parseJS(imports, `${basePath}/${name}`, shortPath)
						: Promise.resolve();
			})
		)
	);
};

module.exports = (dir) => {
	const map = new Map();
	return scanDir(map, dir, basename(dir)).then(() => map);
};
