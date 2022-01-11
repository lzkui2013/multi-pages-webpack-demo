const path = require('path');
const fs = require('fs-extra');
const HtmlLoader = require('html-loader');
const { FakeWebpack } = require('./utils');

const fakeWebpack = new FakeWebpack({ query: '?{"attrs":["img:src","img:srcset"]}' });

module.exports = async (htmlFiles) => {
  for (let i = 0; i < htmlFiles.length; i++) {
    let file = htmlFiles[i];
    let filePath = file;
    let dir = path.dirname(filePath);
    let fileName = path.basename(filePath);
    let sourceFile = fs.readFileSync(filePath, 'utf-8');

    await new Promise((resolve) => {
      const loaderDealData = HtmlLoader.bind(fakeWebpack)(sourceFile);
      const outputFileAction = (fileCon) => {
        const outCon = fileCon.replace(/new URL/g, 'require');
        fs.outputFileSync(`${dir}/${fileName}.js`, outCon);
        resolve();
      };
      // html-loader新版返回的是promise，老版本返回的是string
      if (Array.prototype.toString.call(loaderDealData) === '[object Promise]') {
        loaderDealData.then((con) => {
          outputFileAction(con);
        });
      } else {
        outputFileAction(loaderDealData);
      }
    });
  }
};
