var path = require('path'),
	webpack = require('webpack'),
	WebpackNotifierPlugin = require('webpack-notifier');
	LiveReload = require("webpack-livereload-plugin");

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: '[name].js',
		publicPath: 'build',
		path: path.resolve('build')
	},

	devServer: {
		port: 3000,
		historyApiFallback: true,
		inline: true
	},

	devtool: 'source-map',
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
		// ,modulesDirectories: ['src', 'node_modules']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader"
			},
			// {
			// 	test: /\.less$/,
			// 	loader: 'less-loader'
			// },
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			},
			{
				test: /\.tsx?$/,
				enforce: 'pre',
				loader: 'tslint-loader',
				options: { 
					
				}
			}
		],
		loaders: [
			{
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		new WebpackNotifierPlugin({ alwaysNotify: false }),
		new LiveReload()
	],
	stats: {
		warnings: true,
		moduleTrace: false // Omit stack trace
	},
	watch: true
}