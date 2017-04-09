const path = require('path');
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.dev");
const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  path: path.resolve(__dirname, "/public/build"),
  index: 'index.html'
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});