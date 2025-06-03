#!/usr/bin/env node
'use strict';

const {dirname} = require('path');

const loadImports = require('../src/load-imports');

// Based on https://www.baeldung.com/cs/detecting-cycles-in-directed-graph

const IN_STACK = 1;
const DONE = 2;

const appendCycle = (stack, v, cycles) => {
	const stack2 = [];
	let i = stack.length;
	let v1;
	do {
		stack2.push((v1 = stack[--i]));
	} while (v1 !== v);
	cycles.push(stack2.reverse());
};

const processDFSTree = (top, adjacent, stack, visited, cycles) => {
	stack.push(top);
	visited[top] = IN_STACK;
	for (const v of adjacent.get(top)) {
		if (visited[v] === IN_STACK) {
			appendCycle(stack, v, cycles);
		} else if (!visited[v]) {
			processDFSTree(v, adjacent, stack, visited, cycles);
		}
	}
	visited[top] = DONE;
	stack.pop();
};

const findCycles = (adjacent) => {
	const visited = {};
	const cycles = [];
	for (const v of adjacent.keys()) {
		if (!visited[v]) {
			processDFSTree(v, adjacent, [], visited, cycles);
		}
	}
	return cycles;
};

if (process.argv.length !== 3) {
	console.error(`Usage: ${process.argv[1]} <directory name>`);
	process.exit(2);
}

loadImports(process.argv[2])
	.then((map) => {
		const adjacent = new Map();
		for (const [dir, imports] of map.entries()) {
			const vertices = new Set();
			for (const i of imports.keys()) {
				const target = map.has(i) ? i : dirname(i);
				if (target !== dir) {
					vertices.add(target);
				}
			}
			adjacent.set(dir, vertices);
		}
		const cycles = findCycles(adjacent);
		if (cycles.length) {
			console.error(`Cycles found:\n${cycles.map((nodes) => `  ${nodes.join(' → ')}`).join('\n')}`);
			process.exit(1);
		}
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
