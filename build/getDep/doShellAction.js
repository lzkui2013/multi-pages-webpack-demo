const shelljs = require('shelljs');
const { outPutTime } = require('./utils');

module.exports = (shellAction, rootPath, outPutPath) => {
  let {
    isCpRoutesDir, // 是否需要复制routes文件夹
    isCpAppDir, // 是否需要复制app文件夹
    isCpAppDotJsFile, // 是否需要复制app.js文件
    isCpBinDir, // 是否需要复制bin文件夹
    isDealSrcDir,
  } = shellAction;

  shelljs.cd(rootPath);
  if (isCpRoutesDir) {
    shelljs.cp('-Rf', './routes/', outPutPath);
    outPutTime('复制routes文件夹');
  } else {
    outPutTime('不需要处理routes文件夹', undefined, 'blue');
  }

  if (isCpAppDir) {
    shelljs.cp('-Rf', './app/', outPutPath);
    outPutTime('复制app文件夹');
  } else {
    outPutTime('不需要处理app文件夹', undefined, 'blue');
  }

  if (isCpAppDotJsFile) {
    shelljs.cp('-Rf', './app.js', outPutPath);
    outPutTime('复制app.js文件夹');
  } else {
    outPutTime('不需要处理app.js', undefined, 'blue');
  }

  if (isCpBinDir) {
    shelljs.cp('-Rf', './bin/', outPutPath);
    outPutTime('复制bin文件夹');
  } else {
    outPutTime('不需要处理bin文件夹', undefined, 'blue');
  }

  if (isDealSrcDir) {
    shelljs.cp('-Rf', './views/', outPutPath);
    outPutTime('复制views文件夹');
  } else {
    outPutTime('不需要处理views文件夹', undefined, 'blue');
  }
};
