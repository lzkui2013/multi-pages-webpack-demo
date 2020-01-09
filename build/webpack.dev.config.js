const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let entryAndHtml = require('./entryAndHtml')();
module.exports = merge(baseConfig, {
    entry: entryAndHtml.entry,
    output: {
        publicPath: '/',
        filename: 'js/[name]-[hash:8].js',
        path: path.resolve(__dirname, '../dist/')
    },
    devtool: '#cheap-module-source-map' ,
    mode: 'development',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        ...entryAndHtml.plugins
    ]
});
