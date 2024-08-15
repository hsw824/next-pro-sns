const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				diagnosticOptions: {
					semantic: true,
					syntactic: true,
				},
			},
		}),
		new ReactRefreshWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
	].filter(Boolean),
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								namedExport: false,
							},
						},
					},
					'sass-loader',
				],
			},
		],
	},
});
