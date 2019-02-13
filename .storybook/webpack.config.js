const path = require('path');

module.exports = {
	resolveLoader: {
		modules: ['node_modules', 'loaders'],
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				loaders: ['style-loader', 'css-loader', 'less-loader'],
				include: path.resolve(__dirname, '../'),
			},
			{
				test: /\.strings\.yml$/,
				loader: 'strings-loader',
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
};
