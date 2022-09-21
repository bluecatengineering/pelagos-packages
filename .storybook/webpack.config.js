const path = require('path');

module.exports = ({config}) => ({
	...config,
	resolveLoader: {
		...config.resolveLoader,
		modules: ['node_modules', 'loaders'],
	},
	module: {
		...config.module,
		rules: [
			...config.module.rules,
			{
				test: /\.less$/,
				loaders: ['style-loader', 'css-loader', 'less-loader'],
				include: path.resolve(__dirname, '../'),
			},
			{
				test: /\.po$/,
				loader: '@bluecat/l10n-loader',
			},
			{
				test: /\.yaml$/,
				loader: 'yaml-loader',
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[sha256:hash:base64:7].[ext]',
							outputPath: 'assets/',
						},
					},
				],
			},
		],
	},
});
