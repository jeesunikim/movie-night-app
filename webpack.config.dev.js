const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "bundle.css"
});

module.exports = {
	devtool: "source-map",
	context: path.resolve(__dirname, "src"),
	entry: [
		"webpack-hot-middleware/client?reload=true",
		"index.js", 
		"./assets/styles/styles.scss"
	],
	output: {
		path: path.resolve(__dirname, "public/build"),
		publicPath: "/build",
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/, 
				include: [
					path.resolve(__dirname, "./src")
				],
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["es2015", "react"],
					plugins: ['transform-object-rest-spread']
				},
			},
			{
				test: /\.(sass|scss)$/,
				loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
			},
			{
				test: /\.css$/,
				loader:  ExtractTextPlugin.extract({
		        	loader: 'css-loader?importLoaders=1',
		        }),
			},
		]
	},
	plugins: [
	    extractSass,
	    new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		modules: [
			"node_modules",
			path.resolve('src', 'components'),
			path.resolve('src')
		]
	}
};