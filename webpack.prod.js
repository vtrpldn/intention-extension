const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        background: './src/js/background/index.js',
        popup: './src/js/popup/index.js',
        options: './src/js/options/index.js',
        main: './src/js/content_scripts/index.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/[name].css'
        }),
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