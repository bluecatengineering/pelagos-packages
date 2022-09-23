module.exports = {
	presets: [['@babel/react', {useBuiltIns: true, runtime: 'automatic'}]],
	plugins: ['macros', '@babel/plugin-proposal-do-expressions'],
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
