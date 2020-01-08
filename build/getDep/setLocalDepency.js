const fs = require('fs-extra');
const path = require('path');

// 设置本定的依赖json文件
module.exports = (newObj, newCommitHash) => {
    newObj.commitHash = newCommitHash;
    return new Promise(resolve => {
        fs.outputJson(path.resolve(__dirname, './localDepency.json'), newObj).then(() => {
            resolve(newObj)
        });
    });
}
