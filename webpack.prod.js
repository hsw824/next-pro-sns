const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const esmConfig = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].mjs',
		library: {
			type: 'module',
		},
	},
	experiments: {
		outputModule: true, // ESM 출력을 위해 필요합니다.
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader', // 필요한 경우 Babel을 통해 ES6+ 코드를 변환합니다.
				},
			},
		],
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
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
	].filter(Boolean),
	target: 'web', // 대상 환경을 설정합니다.
	mode: 'production', // 배포용으로 번들링합니다.
};

const cjsConfig = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].cjs',
		library: {
			type: 'commonjs2',
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
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
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
	].filter(Boolean),
	target: 'node', // Node.js 환경을 대상으로 합니다.
	mode: 'production',
};

module.exports = [merge(common, esmConfig), merge(common, cjsConfig)];
