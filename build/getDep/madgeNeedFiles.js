const path = require('path');
const madge = require('madge');
const fs = require('fs-extra');
const entryAndHtml = require(path.resolve(__dirname, '../entryAndHtml'));
const entryAll = entryAndHtml().entry;
const madgeWebpackConfig = path.resolve(__dirname, '../webpack.base.config');
const entryAllPath = [];
const rootPath = path.resolve(__dirname, '../../');
Object.keys(entryAll).forEach((key) => {
  let nowPath = entryAll[key] || '';
  nowPath = nowPath.replace(rootPath + '/', '');
  entryAllPath.push(nowPath);
});

// 获取该需要的文件的依赖
module.exports = (allNeedFiles, srcArrOrigin, beforeCommitHash) => {
  let srcArr;
  if (srcArrOrigin && srcArrOrigin.length > 0) {
    srcArr = [...srcArrOrigin];
  }
  return new Promise((resolve, reject) => {
    madge(allNeedFiles, {
      baseDir: path.resolve(__dirname, '../../'),
      excludeRegExp: [/^src\/bak\/\S+/, /^src\/public\/lib\/\S+/],
      detectiveOptions: {
        es6: {
          mixedImports: true,
        },
      },
      webpackConfig: madgeWebpackConfig,
    })
      .then((res) => {
        let outPut = res.obj();
        let obj = {};
        fs.outputJSONSync(path.resolve(__dirname, '../dist/outPut.json'), outPut);
        Object.keys(outPut).map((key) => {
          let keyReal = key;
          let nowIndex = srcArr && srcArr.indexOf(keyReal);
          let fileName = path.basename(key);
          let dir = path.dirname(key);
          let vueRegExp = /\.vue\.((template|script|style)\.js|style.scss((\.js)?))$/;
          let scssRegExp = /\.scss\.js$/;
          let htmlRegExp = /\.html\.js$/;

          if (outPut[key].length > 0) {
            if (vueRegExp.test(fileName)) {
              fileName = fileName.replace(vueRegExp, '.vue');
              let nowName = `${dir}/${fileName}`;
              obj[nowName] = (obj[nowName] || []).concat(outPut[key]);
            } else if (scssRegExp.test(fileName)) {
              fileName = fileName.replace(scssRegExp, '.scss');
              let nowName = `${dir}/${fileName}`;
              obj[nowName] = (obj[nowName] || []).concat(outPut[key]);
            } else if (!htmlRegExp.test(fileName)) {
              obj[key] = (obj[key] || []).concat(outPut[key]);
              if (entryAllPath.indexOf(key) > -1) {
                let htmlFile = key.replace(/\.js$/, '.html');
                obj[key] = (obj[key] || []).concat([key, htmlFile]);
              }
            }
          }
          if (htmlRegExp.test(fileName)) {
            let fileNameHtml = fileName.replace(htmlRegExp, '.html');
            fileNameHtml = `${dir}/${fileNameHtml}`;
            obj[fileNameHtml] = (obj[fileNameHtml] || []).concat(outPut[key]);
          }
        });
        fs.outputJSONSync(path.resolve(__dirname, '../dist/obj.json'), obj);
        let outPutObj = {};
        if (beforeCommitHash && srcArr && srcArr.length) {
          srcArr.forEach((key) => {
            if (obj[key]) {
              outPutObj[key] = obj[key];
            }
          });
        } else {
          outPutObj = obj;
        }
        res.tree = outPutObj;
        res.image(path.resolve(__dirname, '../dist/image.svg'));
        resolve(outPutObj);
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
};
