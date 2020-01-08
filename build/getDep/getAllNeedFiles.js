const fs = require('fs-extra');

// 获取那些需要取得依赖的文件
module.exports = (scssFilesArr, jsFilesArr, vueFilesArr, htmlFilesArr) => {
    let fileArr = [];
    let setArrFunc = (file) => {
        if (fs.existsSync(file)) {
            fileArr.push(file)
        }
    };
    let setArr = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            let arrI = arr[i];
            fileArr.push(arrI);
            fileArr.push(`${arrI}.js`);
        }
    }
    setArr(scssFilesArr);
    setArr(htmlFilesArr);

    for (let i = 0; i < vueFilesArr.length; i++) {
        let fileI = vueFilesArr[i];
        setArrFunc(`${fileI}.script.js`);
        setArrFunc(`${fileI}.template.js`);
        setArrFunc(`${fileI}.style.scss`);
    }
    fileArr = fileArr.concat(jsFilesArr);
    return fileArr;
}
