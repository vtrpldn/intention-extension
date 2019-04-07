const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

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
    new CopyPlugin([
      { from: './src/manifest.json', to: '../manifest.json' },
      { from: './src/img', to: '../img' }
    ]),
    new HtmlWebpackPlugin({
      chunks: ['options'],
      title: 'Options - Intension Ext',
      filename: '../html/options.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      title: 'Popup - Intention Ext',
      filename: '../html/popup.html'
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/js')
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src/js'), 'node_modules']
  }
}
