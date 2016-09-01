const path = require('path')

module.exports = {
  context: __dirname,

  entry: './js/index.js',

  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  resolve: {
    extensions: ['', '.js', '.json']
  },

  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
