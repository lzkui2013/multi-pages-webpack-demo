const path = require('path');
const imgReg = /\.(png|jpg|jpeg|gif|svg)$/;
// 需要注意，我们的项目包含前端项目和nodejs项目
// 作为构建，需要将情况拆分出来
// modified, deleted, added
module.exports = (diffArr) => {
  let pathStatusArr = [];
  let srcPathArr = [];
  let srcArr = [];
  let allModifyArr = [];
  let i = 0;
  let s = {
    isAllDeleteAction: false, // 是否全部都是删除操作
    isCpRoutesDir: false, // 是否需要复制routes文件夹
    isCpAppDir: false, // 是否需要复制app文件夹
    isCpAppDotJsFile: false, // 是否需要复制app.js文件
    isCpBinDir: false, // 是否需要复制bin文件夹
    isDealSrcDir: false, // 是否影响src文件夹
    isDealImg: false, // 修改的文件中是否含有图片
  };
  if (!diffArr) {
    Object.keys(s).forEach((key) => {
      if (key !== 'isAllDeleteAction') {
        s[key] = true;
      }
    });
    return s;
  }

  for (i = 0; i < diffArr.length; i++) {
    let diffI = diffArr[i];
    let { status } = diffI;
    let pathNow = diffI.path;
    pathStatusArr.push(status);
    allModifyArr.push(pathNow);

    if (!s.isDealImg) {
      if (imgReg.test(pathNow)) {
        s.isDealImg = true;
      }
    }

    if (!s.isCpRoutesDir) {
      if (/^routes\/.+/.test(pathNow)) {
        s.isCpRoutesDir = true;
      }
    }
    if (!s.isCpAppDir) {
      if (/^app\/.+/.test(pathNow)) {
        s.isCpAppDir = true;
      }
    }

    if (!s.isCpBinDir) {
      if (/^bin\/.+/.test(pathNow)) {
        s.isCpBinDir = true;
      }
    }

    if (!s.isCpAppDotJsFile) {
      if (/^app\.js$/.test(pathNow)) {
        s.isCpAppDotJsFile = true;
      }
    }

    if (/^src\/.+$/.test(pathNow)) {
      srcPathArr.push(path.resolve(__dirname, `../../${pathNow}`));
      srcArr.push(pathNow);
      if (!s.isDealSrcDir) {
        s.isDealSrcDir = true;
      }
    }
  }

  if (pathStatusArr.indexOf('modified') === -1 && pathStatusArr.indexOf('added') === -1) {
    s.isAllDeleteAction = true;
  }

  s.srcArr = srcArr;
  s.srcPathArr = srcPathArr;
  s.allModifyArr = allModifyArr;

  return s;
};
