const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
		new VanillaExtractPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'babel-loader',
				exclude: ['/node_modules/'],
			},
			{
				test: /\.s?css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								namedExport: false,
							}, // CSS 모듈 활성화
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
};
