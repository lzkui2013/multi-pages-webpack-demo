const vueLoader = require('vue-loader');
const fs = require('fs-extra');
const path = require('path');
const templateLoader = require('vue-loader/lib/loaders/templateLoader');
const { FakeWebpack } = require('./utils');

function generateFile(type, fileName, sourceVue) {
  return new Promise((resolve) => {
    const fakeWebpack = new FakeWebpack();
    let typeObj = {
      template: '?vue&type=template&index=0',
      script: '?vue&type=script',
      style: '?vue&type=style&index=0',
    };
    fakeWebpack['thread-loader'] = true;
    fakeWebpack.resourceQuery = typeObj[type];
    fakeWebpack.callback = (errMsg, content, map) => {
      if (content) {
        let outData = null;
        if (type === 'template') {
          outData = templateLoader.bind(fakeWebpack)(content);
        } else {
          outData = content;
        }
        fs.outputFileSync(fileName, outData);
      }
      resolve();
    };
    vueLoader.bind(fakeWebpack)(sourceVue);
  }).catch((e) => {
    // 这里需要捕捉错误，因为如果这个vue文件没有全部包含template，script，style就会报错
    // 本身vue文件缺少某个部分都是可行的
  });
}

// 使用vue-loader提供的功能，将vue文件拆分为3个文件
module.exports = async (vueFilesArr) => {
  for (let i = 0; i < vueFilesArr.length; i++) {
    let file = vueFilesArr[i];
    let filePath = file;
    let dir = path.dirname(filePath);
    let fileName = path.basename(filePath);
    let sourceVue = fs.readFileSync(filePath, 'utf-8');
    await Promise.all([
      generateFile('template', `${dir}/${fileName}.template.js`, sourceVue),
      generateFile('script', `${dir}/${fileName}.script.js`, sourceVue),
      generateFile('style', `${dir}/${fileName}.style.scss`, sourceVue),
    ]);
  }
};
