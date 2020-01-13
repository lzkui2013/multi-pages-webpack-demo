const fs = require('fs-extra');
const path = require('path');

module.exports = function (source) {
    const {resourcePath} = this;

    let dir = path.dirname(resourcePath);
    let fileName = path.basename(resourcePath);

    if (/\.vue$/.test(resourcePath)) {
        fs.outputFileSync(`${dir}/${fileName}.style.scss.js`, source);
    } else {
        fs.outputFileSync(`${dir}/${fileName}.js`, source);
    }

    return source;
}
