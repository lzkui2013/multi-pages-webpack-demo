const path = require('path');
const fs = require('fs-extra');
const HtmlLoader = require('html-loader');

function FakeWebpack () {
    this.target = 'web';
    this.request = '';
    this.minimize = '';
    this.sourceMap = false;
    this.rootContext = '';
    this.resourcePath = '';
    this.query = '?{"attrs":["img:src","img:srcset"]}';
}

const fakeWebpack = new FakeWebpack();

module.exports = async (htmlFiles) => {
    for (let i = 0; i < htmlFiles.length; i++) {
        let file = htmlFiles[i];
        let filePath = file;
        let dir = path.dirname(filePath);
        let fileName = path.basename(filePath);
        let sourceFile = fs.readFileSync(filePath, 'utf-8');

        await new Promise((resolve) => {
            fs.outputFileSync(`${dir}/${fileName}.js`, HtmlLoader.bind(fakeWebpack)(sourceFile));
            resolve();
        });
    }
}
