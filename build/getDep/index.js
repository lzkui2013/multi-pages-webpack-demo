const path = require('path');
const shelljs = require('shelljs');
const fs = require('fs-extra');
const getGitRepo = require('./getGitRepo');
const getGitDiff = require('./getGitDiff');
const getAllEntry = require('./getAllEntry');
const doDepWebpack = require('./doDepWebpack');
const doUnpackVueFiles = require('./doUnpackVueFiles');
const doDealHtmlFiles = require('./doDealHtmlFiles');
const doDealScssFiles = require('./doDealScssFiles');
const doUploadStaticFilesToAliOss = require('./doUploadStaticFilesToAliOss');
const doShellAction = require('./doShellAction');
const doGitCommit = require('./doGitCommit');
const getShellAction = require('./getShellAction');
const getAllNeedFiles = require('./getAllNeedFiles');
const madgeNeedFiles = require('./madgeNeedFiles');
const getLocalDepency = require('./getLocalDepency');
const getNewDepency = require('./getNewDepency');
const setLocalDepency = require('./setLocalDepency');
const getFileToKey = require('./getFileToKey');
const mergeFileToKey = require('./mergeFileToKey');
const doRealWebpack = require('./doRealWebpack');
const { pauseBuild, outPutTime } = require('./utils');
const beginTime = Date.now();
const rootPath = path.resolve(__dirname, '../../');
const outPutPath = path.resolve(__dirname, '../../../outPutPath');

async function getDep(buildType) {
  try {
    // 获取本地保留的依赖
    let localDepency = await getLocalDepency();
    outPutTime('获取本地依赖文件', beginTime);

    // 获取之前构建的git的commit号
    let beforeCommitHash = localDepency.commitHash;
    // 获取git仓库
    let repo = await getGitRepo();
    outPutTime('获取本地git仓库');

    // 获取git仓库的最新commit号，以及对比之前commit号的文件修改数组
    let { commitHash, diffArr } = await getGitDiff(repo, beforeCommitHash, {
      branch: 'master',
    });
    outPutTime('比对文件差异');

    // 根据对比出来的文件修改获取接下来需要做的处理
    let shellAction = await getShellAction(diffArr);
    let { srcPathArr = [], srcArr = [], allModifyArr = [], isDealSrcDir, isDealImg } = shellAction;
    fs.outputJSONSync(path.resolve(__dirname, '../dist/diffArr.json'), allModifyArr);
    outPutTime('获取构建处理步骤');
    fs.outputJSONSync(path.resolve(__dirname, '../dist/srcArr.json'), srcArr);

    // 如果影响src文件夹，则直接结束
    if (isDealSrcDir) {
      // 根据修改文件中src目录的下的修改，获取需要使用获取依赖的webpack入口
      let { lenObj, scssFilesArr, jsFilesArr, vueFilesArr, htmlFilesArr } = await getAllEntry(
        srcPathArr,
        beforeCommitHash
      );
      outPutTime(
        `获取本地所有文件【${lenObj.all}】个；scss【${lenObj.scss}】个；js【${lenObj.js}】个；html【${lenObj.html}】个；vue【${lenObj.vue}】个`
      );
      // 执行文件拆分
      await Promise.all([doDealHtmlFiles(htmlFilesArr), doUnpackVueFiles(vueFilesArr)]);
      await doDealScssFiles(scssFilesArr, vueFilesArr);
      outPutTime('使用nodejs+loader将文件拆分处理');

      // 获取需要madge去拿到依赖的所有文件
      let allNeedFiles = getAllNeedFiles(scssFilesArr, jsFilesArr, vueFilesArr, htmlFilesArr);
      outPutTime('获取所有需要madge文件');
      fs.outputJSONSync(path.resolve(__dirname, '../dist/allNeedFiles.json'), allNeedFiles);

      // 执行madge，获取所有依赖
      let depencyGraph = await madgeNeedFiles(allNeedFiles, srcArr, beforeCommitHash);
      outPutTime(`执行madge，共【${allNeedFiles.length}】个文件，过程`);
      fs.outputJSONSync(path.resolve(__dirname, '../dist/depencyGraph.json'), depencyGraph);

      // 根据madge执行获取的依赖去更新本地的依赖文件
      let newDepencyGraph = await getNewDepency(depencyGraph, localDepency, commitHash);
      outPutTime('获取新版本依赖');
      fs.outputJSONSync(path.resolve(__dirname, '../dist/newDepencyGraph.json'), newDepencyGraph);

      // 根据新的依赖去获取目前的修改文件影响的所有入口
      let { fileToKey, allEntryLen } = await getFileToKey(newDepencyGraph, srcArr);
      fs.outputJSONSync(path.resolve(__dirname, '../dist/fileToKey.json'), fileToKey);
      let realWebpackEntry = await mergeFileToKey(fileToKey);
      outPutTime(`获取本次文件更改影响的入口【${realWebpackEntry.length}/${allEntryLen}】`);

      // 执行线上webpack构建
      await doRealWebpack(realWebpackEntry);
      outPutTime('线上项目真实构建');

      // shelljs.exec('git clean -df', { silent: true });
      // outPutTime('清除本地生成的无效文件');

      let { imgLen, cssLen, jsLen, allLen } = await doUploadStaticFilesToAliOss(
        rootPath,
        isDealImg
      );
      outPutTime(
        `上传【${imgLen}】个图片【${cssLen}】个css【${jsLen}】个js共${allLen}文件到阿里oss上`
      );

      // await setLocalDepency(newDepencyGraph, commitHash);
      // outPutTime('更新本地依赖json文件');
    } else {
      await setLocalDepency(localDepency, commitHash);
      outPutTime('更新本地commitHash');
      outPutTime('不需要处理src文件夹', undefined, 'blue');
    }

    outPutTime('本次构建', beginTime, 'magenta');
  } catch (e) {
    console.log(e);
  }
}

module.exports = getDep;
