const fs = require('fs-extra');
const path = require('path');

// 设置本定的依赖json文件
module.exports = (nowDepencyGraph = {}, localDepency = {}, inCommitHash) => {
    return new Promise(resolve => {
        let newObj = {};
        let {commitHash = '', depency = {}} = localDepency;
        let newCommitHash = inCommitHash || commitHash;
        // let newCommitHash = commitHash;

        Object.keys(nowDepencyGraph).forEach(key => {
            depency[key] = nowDepencyGraph[key];
        });

        newObj.commitHash = newCommitHash;
        newObj.depency = depency;

        resolve(newObj);
    });
}
