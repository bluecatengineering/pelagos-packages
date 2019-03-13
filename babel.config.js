module.exports = {
	presets: [['@babel/react', {useBuiltIns: true}]],
	plugins: ['@babel/plugin-proposal-class-properties'],
	env: {
		test: {
			sourceMaps: 'both',
			presets: [['@babel/env', {loose: true, targets: {node: true}}], ['@babel/react', {useBuiltIns: true}]],
		},
		es5: {
			presets: [['@babel/env', {loose: true, modules: false, useBuiltIns: 'usage', targets: {ie: '11'}}]],
		},
		es6: {
			presets: [
				['@babel/env', {loose: true, modules: false, useBuiltIns: false, targets: {chrome: '68', firefox: '60'}}],
			],
		},
	},
};
