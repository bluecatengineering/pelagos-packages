'use strict';

const {
	constants: {COPYFILE_FICLONE},
	copyFileSync,
	mkdirSync,
	readdirSync,
	statSync,
} = require('node:fs');
const {join} = require('node:path');

const EXTENSIONS = /\.(less|yaml)$/;
const EXCLUDED = /\.stories\.less$/;

const copyDir = (from, to) =>
	readdirSync(from).forEach((name) => {
		const subFrom = join(from, name);
		const subTo = join(to, name);
		const stats = statSync(subFrom);
		if (stats.isDirectory()) {
			copyDir(subFrom, subTo);
		} else if (stats.isFile() && EXTENSIONS.test(name) && !EXCLUDED.test(name)) {
			mkdirSync(to, {recursive: true});
			copyFileSync(subFrom, subTo, COPYFILE_FICLONE);
		}
	});

const output = process.argv[2];
copyDir('src', output);
