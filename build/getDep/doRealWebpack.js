const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const getBuildWebpackConfig = require('./getBuildWebpackConfig');

// 开始真正项目的构建
module.exports = (allEntry) => {
    return new Promise((resolve, reject) => {
        let webpackConfig = getBuildWebpackConfig(allEntry);
        if (!webpackConfig.entry) {
            reject(new Error('真实项目构建webpack无入口文件'));
            return;
        }
        fs.outputJSONSync(path.resolve(__dirname, '../dist/realEntry.json'), webpackConfig.entry);
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}
