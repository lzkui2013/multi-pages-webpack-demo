// 如果是使用git merge request的方式合并的分支，分支提交记录的第一条都是这样的格式：
// Merge branch \'huawei\' into \'master\'\n\nxxxx\n\nSee merge request xx/xx!173
module.exports = (msg) => {
    let msgArr = msg.split(/\n+/);
    let firstMsg = msgArr[0];
    let regex = /^merge branch \'(.+)\' into \'master\'/i;
    let realMsg = '';

    // 匹配通过说明是git merge方式，需要取出真是的提交message
    if (regex.test(firstMsg)) {
        realMsg = msgArr[1];
    } else {
        realMsg = firstMsg;
    }

    return realMsg;
}
