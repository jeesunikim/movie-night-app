const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
	devtool: "source-map",
	context: path.resolve(__dirname, "src"),
	entry: "index.js",
	output: {
		path: path.resolve(__dirname, "public/build"),
		publicPath: "/build",
		filename: "bundle.js"
	},
	module: {
		rules: [
			// {
   //              test: /\.js$/, 
   //              enforce: "pre", 
   //              exclude: /node_modules/,
   //              use: [
   //              	{
			// 	    	loader: "jshint-loader"
   //              	}
   //              ]
   //          },
			{
				test: /\.js$/, 
				include: [
					path.resolve(__dirname, "./src")
				],
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["es2015", "react"]
				},
			},
			{
				test: /\.(sass|scss)$/,
				use: [{
                	loader: "style-loader" // the order is backward so sass is loading first
            	}, {
                	loader: "css-loader"
            	}, {
                	loader: "sass-loader"
            	}]
			},
			{
				test: /\.css$/,
				loader:  ExtractTextPlugin.extract({
		        	loader: 'css-loader?importLoaders=1',
		        }),
			},
		]
	},
	// jshint: {
	// 	camelcase: true,
	// 	emitErrors: false,
	// 	failOnHint: false
	// },
	plugins: [
	    new ExtractTextPlugin({
	    	filename: 'bundle.css',
	    	allChunks: true,
	    }),
	],
	resolve: {
		modules: [
			"node_modules",
			path.resolve('src', 'components'),
			path.resolve('src')
		]
	}
	// devServer: {
	// 	proxy: {
	// 		'/api': 'htto://localhost:3000'
	// 	},
	// 	contentBase: path.join(__dirname, './public'),
	//     compress: true,
	//     historyApiFallback: true,
	//     hot: true,
	//     https: false,
	//     noInfo: true, 
	// }
};
