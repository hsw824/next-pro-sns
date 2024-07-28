const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		open: true,
		host: 'localhost',
		historyApiFallback: true,
		hot: true,
		port: '3000',
	},
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
	].filter(Boolean),
});
