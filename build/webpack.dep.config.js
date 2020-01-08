const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: 8});
const CleanWebpackPlugin = require('clean-webpack-plugin');
const srcPath = path.resolve(__dirname, '../src');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
        alias: require('./alias.js')
    },
    output: {
        publicPath: '/',
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist/')
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [srcPath]
            },
            {
                test: /\.scss$/,
                loader: ['my-loader-for-vue-scss', 'css-loader', 'my-loader'],
                include: [srcPath],
            },

            {
                test: /\.vue$/,
                loader: ['my-loader', 'vue-loader'],
                include: [srcPath],
            },
            {
                test: /\.html$/,
                use: [
                    {loader: 'my-loader'},
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:srcset']
                        }
                    }
                ],
                include: [srcPath],
            },
            {
                test: /\.(gif|jpg|png|ico|svg)\??.*$/,
                use: 'url-loader?limit=10&name=images/[name].[ext]'
            }
        ]
    },
    resolveLoader:{
        // 去哪些目录下寻找 Loader，有先后顺序之分
        modules: ['node_modules', path.resolve(__dirname, './loader')],
    },
    plugins: [
        new CleanWebpackPlugin(['../dist/*', '../views/*'], {
            verbose: false,
            allowExternal: true
        }),
        new VueLoaderPlugin()
    ]
};
