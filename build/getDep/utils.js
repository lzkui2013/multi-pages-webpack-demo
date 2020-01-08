const colors = require('colors');
let nowTime;
function pauseBuild(data) {
    console.log(data);
    throw new Error('主动打断');
}

function setShowTime (stageStr, showTime, color = 'green') {
    if (showTime > 500) {
        showTime = `${(showTime / 1000).toFixed(2)}s`;
    } else {
        if (showTime < 0.01) {
            showTime = 0.01;
        }
        showTime = `${(showTime).toFixed(2)}ms`;
    }
    console.log(colors[color](`${stageStr}构建历时：${showTime}`));
}
function outPutTime (stageStr, nowTimeSet = nowTime, color = 'green') {
    let timeNow = Date.now();
    let showTime = timeNow - nowTimeSet;
    nowTime = timeNow;

    setShowTime(stageStr, showTime, color);
}

exports = module.exports = {
    pauseBuild,
    outPutTime,
    setShowTime
};
