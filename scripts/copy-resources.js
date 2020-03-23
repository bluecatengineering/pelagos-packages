const {mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} = require('fs');
const {dirname, join} = require('path');

const EXTENSIONS = /\.(less|yaml)$/;

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

const copyFile = (from, to) => writeFileSync(to, readFileSync(from));

const copyDir = (from, to) =>
	readdirSync(from).forEach((name) => {
		const subFrom = join(from, name);
		const subTo = join(to, name);
		const stats = statSync(subFrom);
		if (stats.isDirectory()) {
			copyDir(subFrom, subTo);
		} else if (stats.isFile() && EXTENSIONS.test(name)) {
			mkdirs(to);
			copyFile(subFrom, subTo);
		}
	});

copyDir('src', process.argv[2]);
