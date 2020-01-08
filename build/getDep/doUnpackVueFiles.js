const vueLoader = require('vue-loader');
const fs = require('fs-extra');
const path = require('path');
const templateLoader = require('vue-loader/lib/loaders/templateLoader');

function FakeWebpack () {
    this.target = 'web';
    this.request = '';
    this.minimize = '';
    this.sourceMap = false;
    this.rootContext = '';
    this.resourcePath = '';
    this.resourceQuery = '';
}
FakeWebpack.prototype.emitError = function (errMsg) {
    // 这是webpack报错的方法，需要是报错静默
};
FakeWebpack.prototype.callback = function (errMsg, content, map) {
    this.callback2(content);
};
const fakeWebpack = new FakeWebpack();

// 使用vue-loader提供的功能，将vue文件拆分为3个文件
module.exports = async (vueFilesArr) => {
    for (let i = 0; i < vueFilesArr.length; i++) {
        let file = vueFilesArr[i];
        let filePath = file;
        let dir = path.dirname(filePath);
        let fileName = path.basename(filePath);
        let sourceVue = fs.readFileSync(filePath, 'utf-8');

        await new Promise((resolve) => {
            fakeWebpack.resourceQuery='?vue&type=script';
            fakeWebpack.callback2 = (content) => {
                fs.outputFileSync(`${dir}/${fileName}.script.js`, content);
                resolve();
            }
            vueLoader.bind(fakeWebpack)(sourceVue);
        }).then(() => {
            return new Promise(resolve => {

                fakeWebpack.resourceQuery='?vue&type=template&index=0';
                fakeWebpack.callback2 = (content) => {
                    fs.outputFileSync(`${dir}/${fileName}.template.js`, templateLoader.bind(fakeWebpack)(content));
                    resolve();
                }
                vueLoader.bind(fakeWebpack)(sourceVue);
            })
        }).then(() => {
            return new Promise(resolve => {
                fakeWebpack.resourceQuery='?vue&type=style&index=0';
                fakeWebpack.callback2 = (content) => {
                    // console.log(content);
                    let pathFile = `${dir}/${fileName}.style.scss`;
                    fs.outputFileSync(pathFile, content);
                    scssFiles.push(pathFile);
                    resolve();
                }
                vueLoader.bind(fakeWebpack)(sourceVue);
            })
        }).catch(e => {
            // console.log(e);
        });
    }
}
