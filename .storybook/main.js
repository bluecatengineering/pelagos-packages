module.exports = {
	stories: ['./welcome.mdx', '../packages/**/*.@(mdx|stories.js)'],
	addons: [
		{name: '@storybook/addon-essentials', options: {backgrounds: false}},
		'@storybook/addon-a11y',
		'@storybook/addon-webpack5-compiler-babel',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: true,
	},
	webpackFinal: (config) => ({
		...config,
		module: {
			...config.module,
			rules: [
				...config.module.rules,
				{
					test: /\.less$/,
					use: ['style-loader', 'css-loader', 'less-loader'],
				},
				{
					test: /\.po$/,
					loader: '@bluecateng/l10n-loader',
				},
				{
					test: /\.yaml$/,
					loader: 'yaml-loader',
				},
			],
		},
	}),
};
