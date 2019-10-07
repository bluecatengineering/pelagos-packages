module.exports = {
	presets: [['@babel/react', {useBuiltIns: true}]],
	plugins: ['@babel/plugin-proposal-class-properties'],
	env: {
		test: {
			sourceMaps: 'both',
			presets: [['@babel/env', {loose: true, targets: {node: true}}]],
		},
		es5: {
			presets: [['@babel/env', {loose: true, modules: false, useBuiltIns: 'usage', corejs: 3, targets: {ie: '11'}}]],
		},
		es6: {
			presets: [['@babel/env', {loose: true, modules: false, targets: {chrome: '69', firefox: '61'}}]],
		},
	},
};
