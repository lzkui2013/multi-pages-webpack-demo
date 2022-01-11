const cssLoader = require('css-loader');
const path = require('path');
const fs = require('fs-extra');
const decomment = require('decomment');
const { FakeWebpack } = require('./utils');

const fakeWebpack = new FakeWebpack({
  query: '?importLoaders=false',
});

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
      sourceFile = decomment.text(sourceFile);
      fakeWebpack.remainingRequest = filePath;
      fakeWebpack.currentRequest = filePath;
      fakeWebpack.callback = (err, content) => {
        if (err) {
          reject(err);
        } else {
          fs.outputFileSync(`${dir}/${fileName}.js`, content.replace(/new URL/g, 'require'));
          resolve();
        }
      };
      cssLoader.bind(fakeWebpack)(sourceFile);
    });
  }
};
