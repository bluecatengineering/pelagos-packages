// Compiles the .js files in ./src to ./dist and copies the .less files ignoring any story files, it must be run from the package directory.
// Usage: node ../../scripts/swc-build.mjs

import {swcDir} from '@swc/cli';
import l10nSwcPlugin from '@bluecateng/l10n-swc-plugin/config';

const swcOptions = {
	jsc: {
		parser: {jsx: true},
		transform: {react: {runtime: 'automatic'}},
		experimental: {plugins: [l10nSwcPlugin()]},
	},
	env: {},
	module: {type: 'es6'},
};

swcDir({
	cliOptions: {
		outDir: './dist',
		filenames: ['./src'],
		extensions: ['.js'],
		stripLeadingPaths: true,
		deleteDirOnStart: true,
		copyFiles: true,
		only: ['**/*.js', '**/*.less'],
		ignore: ['**/*.stories.*', '**/story-helpers.*'],
	},
	swcOptions,
}).catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
