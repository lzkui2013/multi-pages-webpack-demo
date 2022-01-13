const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const srcPath = path.resolve(__dirname, '../src');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    alias: require('./alias.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['thread-loader', 'babel-loader'],
        include: [srcPath],
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        include: [srcPath],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        include: [srcPath],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        include: [srcPath],
      },
      {
        test: /\.css$/,
        include: [srcPath],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(gif|jpg|png|ico|svg)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: true,
            },
          },
        ],
        include: [srcPath],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: Infinity,
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
};
