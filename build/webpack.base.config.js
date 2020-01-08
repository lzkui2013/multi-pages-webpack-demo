const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: 8});
const srcPath = path.resolve(__dirname, '../src');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
        alias: require('./alias.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=happyBabel',
                include: [srcPath]
            },
            {
                test: /\.tsx?$/,
                loader: ['babel-loader', 'ts-loader'],
                include: [srcPath],
            },
            {
                test: /\.vue$/,
                loader: ['vue-loader'],
                include: [srcPath]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=style'],
                include: [srcPath],
            },
            {
                test: /\.css$/,
                include: [srcPath],
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: 'happypack/loader?id=html',
                include: [srcPath],
            },
            {
                test: /\.(gif|jpg|png|ico|svg)\??.*$/,
                loader: 'url-loader?limit=10&name=images/[name].[hash:8].[ext]'
            }
        ]
    },
    externals: {
        'AMap': 'AMap',
        'swiper': 'Swiper',
        'vue-upload-component': 'VueUploadComponent',
        'vuex': 'Vuex'
    },
    plugins: [
        new CleanWebpackPlugin(['../dist/*', '../views/*'], {
            verbose: false,
            allowExternal: true
        }),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HappyPack({
            id: 'style',
            threadPool: happyThreadPool,
            verbose: false,
            loaders: [
                'css-loader', 'postcss-loader', 'sass-loader'
            ]
        }),
        new HappyPack({
            id: 'happyBabel',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
            verbose: false
        }),
        new HappyPack({
            id: 'html',
            loaders: [
                {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:srcset']
                    }
                }
            ],
            threadPool: happyThreadPool,
            verbose: false
        }),

    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: Infinity
                }
            },
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
};
