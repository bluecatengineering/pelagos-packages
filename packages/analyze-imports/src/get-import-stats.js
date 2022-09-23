'use strict';

const {dirname} = require('path');

const loadImports = require('./load-imports');

module.exports = (dir) => {
	const map = loadImports(dir);
	const stats = {};
	for (const [dir, imports] of map.entries()) {
		const counts = {};
		for (const [path, count] of imports.entries()) {
			const target = map.has(path) ? path : dirname(path);
			counts[target] = (counts[target] || 0) + count;
		}
		stats[dir] = counts;
	}
	return stats;
};
