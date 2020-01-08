const shelljs = require('shelljs');

module.exports = (outPutPath, commitMsg) => {
    shelljs.cd(outPutPath);
    shelljs.exec('git add -A');
    shelljs.exec('git commit -m "' + commitMsg  + '"');
    shelljs.exec('git push -u origin master');
}
