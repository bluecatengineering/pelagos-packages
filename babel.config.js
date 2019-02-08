module.exports = {
	presets: [
		['@babel/env', {loose: true, modules: false, targets: {ie: '11', chrome: '68', firefox: '60'}}],
		['@babel/react', {useBuiltIns: true}],
	],
	plugins: ['@babel/plugin-proposal-class-properties'],
	env: {
		test: {
			sourceMaps: 'both',
			presets: [['@babel/env', {loose: true, targets: {node: true}}], ['@babel/react', {useBuiltIns: true}]],
		},
	},
};
