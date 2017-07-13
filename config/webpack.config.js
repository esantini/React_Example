var path = require('path'),
	webpack = require('webpack'),
	WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: '[name].js',
		publicPath: 'build',
		path: path.resolve('build')
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
				loader: "awesome-typescript-loader"
			},
			// {
			// 	test: /\.less$/,
			// 	loader: 'less-loader'
			// },
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}
		],
		loaders: [
			{
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		new WebpackNotifierPlugin({ alwaysNotify: false })
	],
	watch: true
}