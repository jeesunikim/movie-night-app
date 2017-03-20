const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
	devtool: "source-map",
	entry: "./src/index",
	output: {
		path: path.resolve(__dirname, 'public/assets/js'),
		filename: 'bundle.js'
	},
	modules: {
		rules: [
		//js
			{
                test: /\.js$/, 
                enforce: "pre", 
                exclude: /node_modules/,
                use: [
                    {
                        loader: "jshint-loader"
                    }
                ]
            },
			{
				test: /\.(js|jsx)$, 
				include: [
					path.resolve(__dirname, "src")
				],
				exclude: [
					path.resolve(__dirname, "src/assets"),
					path.resolve(__dirname, "node_modules")
				]
				issuer: {test, include, exclude},
				loader: "babel-loader",
				options: {
					presets: ["es2015"]
				}
			},
			{
				test: /\.(sass|scss)$/,
				use: [{
                	loader: "style-loader" 
            	}, {
                	loader: "css-loader"
            	}, {
                	loader: "sass-loader"
            	}]
			}
		]
	},
	jshint: {
		camelcase: true,
		emitErrors: false,
		 failOnHint: false
	},
	plugins: [
	    new ExtractTextPlugin("styles.css"),
	    new UglifyJSPlugin()
	],
	devServer: {
		proxy: {
			'/api': 'htto://localhost:3000'
		},
		contentBase: path.join(__dirname, 'public'),
	    compress: true,
	    historyApiFallback: true,
	    hot: true,
	    https: false,
	    noInfo: true, 
	}
};
