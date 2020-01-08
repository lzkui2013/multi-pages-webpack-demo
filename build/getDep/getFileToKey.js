const path = require('path');
const entryAndHtml = require('../entryAndHtml');
const entryAll = entryAndHtml().entry;
const fs = require('fs-extra');

// 需要找到所有的入口的依赖
module.exports = (depencyObj, srcArrOrigin) => {
    let {depency} = depencyObj;
    let srcArr;
    if (Array.isArray(srcArrOrigin)) {
        srcArr = [...srcArrOrigin];
    }
    fs.outputJSONSync(path.resolve(__dirname, '../dist/entryAll.json'), entryAll);
    // 获取单个入口js所有的依赖
    function getAllKey (key) {
        let objKey = depency[key] || [];
        let arr = [...objKey];
        let outArr = [];

        if (objKey.length === 0) {
            return [];
        }
        do {
            let firstArr = arr[0];
            if (outArr.indexOf(firstArr) > -1) {
                arr.shift();
            } else {
                if (!depency[firstArr]) {
                    if (outArr.indexOf(firstArr) === -1) {
                        outArr.push(firstArr);
                    }
                    arr.shift();
                } else {
                    outArr.push(firstArr);
                    arr = arr.concat(depency[firstArr]);
                    arr.shift();
                }
            }

        } while (arr.length > 0)

        return outArr;
    }
    return new Promise(resolve => {

        let allKeys = Object.keys(entryAll);
        let allEntryLen = allKeys.length;
        let fileToKey = {};
        allKeys.forEach(key => {
            let realKey = `src/views/${key}.js`;
            // 获取当前key入口的所有依赖文件
            let nowKeyArr = getAllKey(realKey);
            // console.log(key);
            if (nowKeyArr && nowKeyArr.length > 0) {
                // 对依赖的文件反推出文件依赖的所有入口
                nowKeyArr.forEach(nowKeyArrI => {
                    let keyReal = nowKeyArrI;
                    let nowIndex = srcArr && srcArr.indexOf(keyReal);
                    if ((srcArr.length === 0 || nowIndex > -1)) {
                        let fileToKeyArr = fileToKey[keyReal] || [];
                        if (fileToKeyArr.indexOf(key) === -1) {
                            fileToKeyArr.push(key);
                        }
                        fileToKey[keyReal] = fileToKeyArr;
                    }
                });
            }
        });
        resolve({fileToKey, allEntryLen});
    });
}
