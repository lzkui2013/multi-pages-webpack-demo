const fs = require('fs-extra');
const path = require('path');
const qs = require('querystring')
const templateLoader = require('vue-loader/lib/loaders/templateLoader');

module.exports = function (source) {
    const loaderContext = this;
    const {
        resourcePath,
        resourceQuery
    } = loaderContext;
    const rawQuery = resourceQuery.slice(1);
    const incomingQuery = qs.parse(rawQuery);
    const {type} = incomingQuery;

    let dir = path.dirname(resourcePath);
    let fileName = path.basename(resourcePath);
    let extname = path.extname(resourcePath);

    // console.log(`resourcePath: ${resourcePath}`);
    // console.log(`resourceQuery: ${resourceQuery}`);
    if (extname === '.vue') {
        if (type === 'template') {
            fs.outputFileSync(`${dir}/${fileName}.template.js`, templateLoader.bind(loaderContext)(source));
        } else if (type === 'style') {
            fs.outputFileSync(`${dir}/${fileName}.style.scss`, source);
        } else if (type === 'script') {
            fs.outputFileSync(`${dir}/${fileName}.script.js`, source);
        }
    } else {
        fs.outputFileSync(`${dir}/${fileName}.js`, source);
    }
    return source;
}
