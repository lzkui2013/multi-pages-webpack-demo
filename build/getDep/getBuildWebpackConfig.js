const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('../webpack.base.config');

module.exports = (entryFilter) => {
  let entryAndHtml = require('../entryAndHtml')(entryFilter);

  return merge(baseConfig, {
    entry: entryAndHtml.entry,
    output: {
      publicPath: '/',
      filename: 'js/[name]-[chunkhash:8].js',
      path: path.resolve(__dirname, '../../dist/'),
    },
    mode: 'production',
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name]-[contenthash:8].css',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      ...entryAndHtml.plugins,
    ],
  });
};
