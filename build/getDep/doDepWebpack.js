const path = require('path');
const webpack = require('webpack');
let webpackConfig = require(path.resolve(__dirname, '../webpack.dep.config'));

// 需要使用webpack配置，使用自己开发的my-loader去将入口的文件(vue|scss|html)生成.js文件
module.exports = (entry) => {
    return new Promise((resolve, reject) => {
        if (!entry || Object.keys(entry).length === 0) {
            resolve();
            return;
        }
        webpackConfig.entry = entry;
        webpack(webpackConfig,  (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}
