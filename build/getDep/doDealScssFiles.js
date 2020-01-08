const cssLoader = require('css-loader');
const sassLoader = require('sass-loader');
const path = require('path');
const fs = require('fs-extra');
const decomment = require('decomment');

function FakeWebpack () {
    this.target = 'web';
    this.request = '';
    this.minimize = '';
    this.sourceMap = false;
    this.rootContext = '';
    this.resourcePath = '';
    this.query = '?importLoaders=false';
    this.remainingRequest = '';
    this.currentRequest = '';
}
FakeWebpack.prototype.async = function (errMsg, content, map) {
    let _this = this;
    return function (errMsg, content, map) {
        _this.callback(errMsg, content);
    }
};
const fakeWebpack = new FakeWebpack();
// 将scss编译为js文件
module.exports = async (scssFiles = [], vueFiles) => {
    let i = 0;
    let vueCompileScssFiles = [];
    for (; i < vueFiles.length; i++) {
        let nowScssFile = `${vueFiles[i]}.style.scss`;
        if (fs.existsSync(nowScssFile)) {
            vueCompileScssFiles.push(nowScssFile);
        }
    }
    scssFiles = scssFiles.concat(vueCompileScssFiles);
    for (i = 0; i < scssFiles.length; i++) {
        let file = scssFiles[i];
        let filePath = file;
        let dir = path.dirname(filePath);
        let fileName = path.basename(filePath);
        let sourceFile = fs.readFileSync(filePath, 'utf-8');

        await new Promise((resolve, reject) => {
            sourceFile  = decomment.text(sourceFile);
            fakeWebpack.remainingRequest = filePath;
            fakeWebpack.currentRequest = filePath;
            cssLoader.bind(fakeWebpack)(sourceFile);
            fakeWebpack.callback = (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    fs.outputFileSync(`${dir}/${fileName}.js`, content);
                    resolve();
                }
            }
        });
    }
}
