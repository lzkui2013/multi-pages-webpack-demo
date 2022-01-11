const colors = require('colors');
let nowTime;
function pauseBuild(data) {
  console.log(data);
  throw new Error('主动打断');
}

function setShowTime(stageStr, showTime, color = 'green') {
  if (showTime > 500) {
    showTime = `${(showTime / 1000).toFixed(2)}s`;
  } else {
    if (showTime < 0.01) {
      showTime = 0.01;
    }
    showTime = `${showTime.toFixed(2)}ms`;
  }
  console.log(colors[color](`${stageStr}构建历时：${showTime}`));
}
function outPutTime(stageStr, nowTimeSet = nowTime, color = 'green') {
  let timeNow = Date.now();
  let showTime = timeNow - nowTimeSet;
  nowTime = timeNow;

  setShowTime(stageStr, showTime, color);
}

class FakeWebpack {
  constructor(configObj) {
    const fakeWebpackConfig = {
      target: 'web',
      request: '',
      minimize: '',
      sourceMap: false,
      rootContext: '',
      resourcePath: '',
      remainingRequest: '',
      currentRequest: '',
      _compilation: {
        outputOptions: {},
      },
      _compiler: {},
      ...configObj,
      callback: () => {},
      getResolve: () => () => Promise.resolve(),
    };

    Object.keys(fakeWebpackConfig).forEach((key) => {
      this[key] = fakeWebpackConfig[key];
    });
  }

  // webpack5 中新增属性，需要做兼容
  getOptions(config) {
    return config;
  }

  // 用于处理异步loader
  async(errMsg, content, map) {
    let _this = this;
    return function (errMsg, content, map) {
      _this.callback(errMsg, content);
    };
  }

  // 这是webpack报错的方法，提示需要使用VueLoaderPlugin，
  // 此处不需要，同时需要忽略报错信息
  emitError(errMsg) {
    console.log(errMsg);
  }
}

exports = module.exports = {
  pauseBuild,
  outPutTime,
  setShowTime,
  FakeWebpack,
};
