const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });

const extractSass = new ExtractTextPlugin({
    filename: "bundle.css"
});

module.exports = {
    mode: "development",
    devtool: "source-map",
    context: path.resolve(__dirname, "src"),
    entry: [
        "@babel/polyfill",
        "webpack-hot-middleware/client?reload=true",
        "index.js",
        "./styles/styles.scss"
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
                include: [path.resolve(__dirname, "./src")],
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: ["@babel/plugin-proposal-class-properties"]
                }
            },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(["css-loader", "style-loader"])
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        extractSass,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(dotenv.parsed)
        })
    ],
    resolve: {
        modules: [
            "node_modules",
            path.resolve("src", "components"),
            path.resolve("src")
        ],
        extensions: [".ts", ".tsx", ".js", ".json"]
    }
};
