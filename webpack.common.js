const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    background: './src/js/background/index.js',
    popup: './src/js/react/Popup.js',
    options: './src/js/react/Options.js',
    main: './src/js/react/App.js'
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
    new webpack.DefinePlugin({
      __DEV__: true,
      __PROD__: false
    }),
    new CopyPlugin([
      { from: './src/manifest.json', to: '../manifest.json' },
      { from: './src/img', to: '../img' }
    ]),
    new HtmlWebpackPlugin({
      chunks: ['options'],
      title: 'Options',
      filename: '../html/options.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      title: 'Popup',
      filename: '../html/popup.html'
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/js')
  },
  resolve: {
    modules: ['node_modules']
  }
}
