const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.local')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: './js',
  hot: true,
  quiet: false,
  displayChunks: false,
  stats: {
    colors: true
  },
  proxy: {
    '/**': {
      target: 'http://site.lays.dev',
      secure: false,
      bypass: (req, res, proxyOptions) => {}
    }
  }
})
  .listen(3000, 'localhost', err => {
    if (err) {
      console.log(err)
    }

    console.log('Listening at localhost:3000')
  })
