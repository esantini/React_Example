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

	// devServer: {
	// 	contentBase: './build',
	// 	hot: true,
	// 	port: 8080,
	// 	historyApiFallback: true,
	// 	inline: true
	// },

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
			{
				test: /\.less$/,
				loader: 'less-loader'
			},
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
		new WebpackNotifierPlugin({ alwaysNotify: false })
	],
	stats: {
		warnings: true,
		moduleTrace: false // Omit stack trace
	},
	watch: true
}

var liveServer = require("live-server");

var params = {
	port: 3000, // Set the server port. Defaults to 8080.
	host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
	root: "./build", // Set root directory that's being served. Defaults to cwd.
	open: false, // When false, it won't load your browser by default.
	ignore: 'less,my/templates', // comma-separated string for paths to ignore
	file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
	wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
	mount: [['/components', './node_modules']], // Mount a directory to a route.
	logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
	middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};
liveServer.start(params);