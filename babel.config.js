module.exports = {
	presets: [['@babel/react', {useBuiltIns: true, runtime: 'automatic'}]],
	plugins: [
		'macros',
		'@babel/plugin-proposal-do-expressions',
		['@babel/plugin-proposal-class-properties', {loose: true}],
		['@babel/plugin-proposal-private-methods', {loose: true}],
		['@babel/plugin-proposal-private-property-in-object', {loose: true}],
	],
	env: {
		test: {
			sourceMaps: 'both',
			presets: [['@babel/env', {loose: true, targets: {node: true}}]],
		},
		production: {
			presets: [['@babel/env', {loose: true, modules: false, targets: {chrome: '69', firefox: '61'}}]],
		},
	},
};
