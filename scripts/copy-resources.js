const {
	constants: {COPYFILE_FICLONE},
	copyFileSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} = require('fs');
const {dirname, join} = require('path');

const generator = require('@bluecat/strings-generator');

const hashLength = require('./hash-length');

const EXTENSIONS = /\.(less|yaml)$/;
const STRINGS = /\.strings\.yaml$/;

const mkdirs = (path) => {
	try {
		mkdirSync(path);
	} catch (err) {
		if (err.code === 'ENOENT') {
			mkdirs(dirname(path));
			mkdirSync(path);
		} else if (err.code !== 'EEXIST') {
			throw err;
		}
	}
};

const copyDir = (from, to) =>
	readdirSync(from).forEach((name) => {
		const subFrom = join(from, name);
		const subTo = join(to, name);
		const stats = statSync(subFrom);
		if (stats.isDirectory()) {
			copyDir(subFrom, subTo);
		} else if (stats.isFile() && EXTENSIONS.test(name)) {
			mkdirs(to);
			if (STRINGS.test(name)) {
				writeFileSync(`${subTo}.js`, generator(readFileSync(subFrom, 'utf8'), output, hashLength));
			} else {
				copyFileSync(subFrom, subTo, COPYFILE_FICLONE);
			}
		}
	});

const output = process.argv[2];
copyDir('src', output);
