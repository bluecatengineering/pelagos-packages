const {createTransformer} = require('@swc/jest');
const l10nSwcPlugin = require('@bluecateng/l10n-swc-plugin/config').default;

module.exports = createTransformer({
	jsc: {
		parser: {jsx: true},
		transform: {react: {runtime: 'automatic'}},
		experimental: {plugins: [l10nSwcPlugin()]},
	},
});
