const path = require('path');
const recursive = require('recursive-readdir');
const fs = require('fs-extra');

// 需要找到文件中的vue，scss，html将它们转换为.js文件
module.exports = async (allFiles, beforeCommitHash) => {
  let nowFilesArr = [];
  let jsFilesArr = [];
  let htmlFilesArr = [];
  let vueFilesArr = [];
  let scssFilesArr = [];
  let lenObj = {
    html: 0,
    scss: 0,
    vue: 0,
    js: 0,
    all: 0,
  };
  if (allFiles && allFiles.length) {
    nowFilesArr = allFiles;
  } else if (allFiles.length === 0 && beforeCommitHash) {
    return { lenObj, scssFilesArr, jsFilesArr, vueFilesArr, htmlFilesArr };
  } else {
    nowFilesArr = await recursive(path.resolve(__dirname, '../../src'));
  }
  fs.outputJSONSync(path.resolve(__dirname, '../dist/nowFilesArr.json'), nowFilesArr);
  for (let i = 0; i < nowFilesArr.length; i++) {
    let fileI = nowFilesArr[i];
    if (/src\/bak\//.test(fileI)) {
      continue;
    }
    if (/\.scss$/.test(fileI)) {
      if (scssFilesArr.indexOf(fileI) === -1) {
        scssFilesArr.push(fileI);
      }
    } else if (/\.js$/.test(fileI)) {
      if (jsFilesArr.indexOf(fileI) === -1) {
        jsFilesArr.push(fileI);
      }
    } else if (/\.vue$/.test(fileI)) {
      if (vueFilesArr.indexOf(fileI) === -1) {
        vueFilesArr.push(fileI);
      }
    } else if (/\.html$/.test(fileI)) {
      if (htmlFilesArr.indexOf(fileI) === -1) {
        htmlFilesArr.push(fileI);
      }
    }
  }
  let htmlLen = htmlFilesArr.length;
  let jsLen = jsFilesArr.length;
  let vueLen = vueFilesArr.length;
  let scssLen = scssFilesArr.length;
  lenObj = {
    all: htmlLen + jsLen + scssLen + vueLen,
    html: htmlLen,
    js: jsLen,
    scss: scssLen,
    vue: vueLen,
  };

  return { lenObj, scssFilesArr, jsFilesArr, vueFilesArr, htmlFilesArr };
};
