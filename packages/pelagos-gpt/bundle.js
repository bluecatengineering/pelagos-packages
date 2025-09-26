const {build} = require('esbuild');
const {lessLoader} = require('esbuild-plugin-less');

build({
	entryPoints: ['src/index.js'],
	bundle: true,
	minify: true,
	outdir: 'dist',
	format: 'esm',
	external: ['react', 'react-dom', 'prop-types'],
	plugins: [lessLoader()],
});
