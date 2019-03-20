const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    background: './src/js/background/index.js',
    popup: './src/js/popup/Popup.js',
    options: './src/js/options/Options.js',
    main: './src/js/content/App.js'
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
      template: './src/html/options.html',
      inject: false,
      chunks: ['options'],
      filename: '../html/options.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/html/popup.html',
      inject: false,
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
