const hashLength = require('./scripts/hash-length');

module.exports = {
	presets: [['@babel/react', {useBuiltIns: true, runtime: 'automatic'}]],
	plugins: [
		['@babel/plugin-proposal-class-properties', {loose: true}],
		['@babel/plugin-proposal-private-methods', {loose: true}],
		['@babel/plugin-proposal-private-property-in-object', {loose: true}],
	],
	env: {
		test: {
			sourceMaps: 'both',
			presets: [['@babel/env', {loose: true, targets: {node: true}}]],
		},
		es5: {
			presets: [['@babel/env', {loose: true, modules: false, useBuiltIns: 'usage', corejs: 3, targets: {ie: '11'}}]],
			plugins: [['@bluecat/transform-hash-icu-key', {hashLength}]],
		},
		es6: {
			presets: [['@babel/env', {loose: true, modules: false, targets: {chrome: '69', firefox: '61'}}]],
			plugins: [['@bluecat/transform-hash-icu-key', {hashLength}]],
		},
	},
};
