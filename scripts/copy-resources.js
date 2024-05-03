const {
	constants: {COPYFILE_FICLONE},
	copyFileSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} = require('node:fs');
const {join} = require('node:path');

const converter = require('@bluecateng/l10n-icu2obj');

const EXTENSIONS = /\.(less|po|yaml)$/;
const EXCLUDED = /\.stories\.less$/;
const PO = /\.po$/;

const copyDir = (from, to) =>
	readdirSync(from).forEach((name) => {
		const subFrom = join(from, name);
		const subTo = join(to, name);
		const stats = statSync(subFrom);
		if (stats.isDirectory()) {
			copyDir(subFrom, subTo);
		} else if (stats.isFile() && EXTENSIONS.test(name) && !EXCLUDED.test(name)) {
			mkdirSync(to, {recursive: true});
			if (PO.test(name)) {
				writeFileSync(`${subTo}.js`, converter(readFileSync(subFrom, 'utf8'), 'es'));
			} else {
				copyFileSync(subFrom, subTo, COPYFILE_FICLONE);
			}
		}
	});

const output = process.argv[2];
copyDir('src', output);
