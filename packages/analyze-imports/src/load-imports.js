'use strict';

const {opendirSync, readFileSync} = require('fs');
const {basename, join} = require('path');

const parser = require('@babel/parser');

const nodeTypes = ['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration'];

const parseJS = (path, shortPath) => {
	const imports = [];
	try {
		const ast = parser.parse(readFileSync(path, 'utf8'), {
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
					imports.push(join(shortPath, source));
				}
			}
		}
	} catch (e) {
		console.error(`Error parsing ${path}`, e);
		process.exit(1);
	}
	return imports;
};

const scanDir = (map, basePath, shortPath) => {
	const imports = new Map();
	const dir = opendirSync(basePath);
	let entry;
	while ((entry = dir.readSync())) {
		const name = entry.name;
		if (entry.isDirectory()) {
			scanDir(map, `${basePath}/${name}`, `${shortPath}/${name}`);
		} else if (entry.isFile() && /\.js$/.test(name)) {
			for (const i of parseJS(`${basePath}/${name}`, shortPath)) {
				imports.set(i, (imports.get(i) || 0) + 1);
			}
		}
	}
	dir.closeSync();
	map.set(shortPath, imports);
};

module.exports = (dir) => {
	const map = new Map();
	scanDir(map, dir, basename(dir));
	return map;
};
