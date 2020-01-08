const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const util = require('util');
let srcDir = path.resolve(__dirname, '../src/views'); // 项目代码
let globInstance = new glob.Glob('*/*', {
    cwd: srcDir,
    sync: true
});
let allFiles = globInstance.found;
let allEntryArr = [];
do {
    let fileFirst = allFiles.shift();
    let reg = /\.js$/;
    if (reg.test(fileFirst)) {
        let allEntryArrI = fileFirst.replace(reg, '');
        let nowHtmlFile = `${allEntryArrI}.html`;
        let htmlIndex = allFiles.indexOf(nowHtmlFile) > -1;
        if (htmlIndex > -1) {
            allFiles.splice(htmlIndex, 1);
            allEntryArr.push(allEntryArrI)
        }
    }

} while (allFiles.length > 0);

/**
 * @param entryFilter Array
 */
function getWebpackEntry (entryFilter = []) {

    let realAllEntryArr = [];
    let entryFilterLen = entryFilter.length;
    let i = 0;
    let webpackEntry = {};
    let webpackHtmlPluginArr = [];

    // 校验传入的entryFilter是否有效
    if (entryFilter.length > 0) {
        for (i = 0; i < entryFilterLen; i++) {
            let entryI = entryFilter[i];
            if (allEntryArr.indexOf(entryI) > -1) {
                realAllEntryArr.push(entryI);
            }
        }
    } else {
        realAllEntryArr = allEntryArr;
    }

    realAllEntryArr.forEach(key => {
        webpackEntry[key] = path.resolve(srcDir, `${key}.js`);
        webpackHtmlPluginArr.push(new HtmlWebpackPlugin({
            template: path.resolve(srcDir, `${key}.html`),
            inject: 'body',
            chunks: ['manifest', key],
            filename: path.resolve(__dirname, `../views/${key}.ejs`),
            minify: {
                removeAttrbutiteQuotes: false,
                collapseWhitespace: true,
                removeComments: true
            }
        }));
    });
    return {
        entry: webpackEntry,
        plugins: webpackHtmlPluginArr
    };
}
module.exports = getWebpackEntry;
