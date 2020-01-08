const path = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: 8});
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('../webpack.base.config');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = (entryFilter) => {
    let startTime = Date.now();
    let entryAndHtml = require('../entryAndHtml')(entryFilter);

    return merge(baseConfig, {
        entry: entryAndHtml.entry,
        output: {
            publicPath: '/',
            filename: 'js/[name]-[chunkhash:8].js',
            path: path.resolve(__dirname, '../../dist/')
        },
        mode: 'production',
        devtool: 'false' ,
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name]-[contenthash:8].css',
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new OptimizeCSSAssetsPlugin(),
            ...entryAndHtml.plugins
        ]
    });
}
