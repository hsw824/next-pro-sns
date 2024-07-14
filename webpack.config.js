// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';

const config = {
	entry: './src/index.tsx',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	devServer: {
		open: true,
		host: 'localhost',
		historyApiFallback: true,
		hot: true,
		port: '3000',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				diagnosticOptions: {
					semantic: true,
					syntactic: true,
				},
			},
		}),
		!isProduction && new ReactRefreshWebpackPlugin(),
	].filter(Boolean),
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'babel-loader',
				exclude: ['/node_modules/'],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},

			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
	devtool: 'inline-source-map',
};

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';
	} else {
		config.mode = 'development';
	}
	return config;
};
