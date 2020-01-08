const Git = require('nodegit-kit');
const getGitMsg = require('./getGitMsg');
module.exports = (repo, commit2, config) => {
    return new Promise((resolve, reject) => {
        return Git.log(repo, config).then(history => {
            let historyObj = history[0];
            commitMsg = getGitMsg(historyObj.message);

            let commit1 = historyObj.commit;
            if (commit2) {
                if (commit1 === commit2) {
                    reject(new Error('git 版本无变化，构建取消'));
                    return;
                }
                Git.diff(repo, commit2, commit1).then(diffArr => {
                    resolve({
                        diffArr,
                        commitHash: commit1,
                        commitMsg
                    });
                });
            } else {
                resolve({
                    commitHash: commit1,
                    commitMsg
                });
            }
        }).catch(e => {
            reject(e);
        });
    });
}
