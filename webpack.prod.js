const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    background: './src/js/background/index.js',
    popup: './src/js/Popup.js',
    options: './src/js/Options.js',
    main: './src/js/App.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: '../html/options.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      filename: '../html/popup.html'
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/js')
  }
}
