const path = require('path');
const madge = require('madge');
const madgeWebpackConfig = path.resolve(__dirname, './build/webpack.base.config');
const allNeedFiles = require('./build/dist/allNeedFiles.json');

// 获取该需要的文件的依赖

madge(
  '/Users/lizhikui/Documents/work/other/github/multi-pages-webpack-demo/src/public/css/dosome.scss.js',
  {
    baseDir: path.resolve(__dirname, '.'),
    excludeRegExp: [/^src\/bak\/\S+/, /^src\/public\/lib\/\S+/],
    detectiveOptions: {
      es6: {
        mixedImports: true,
      },
    },
    webpackConfig: madgeWebpackConfig,
  }
)
  .then((res) => {
    let outPut = res.obj();
    console.log(outPut);
  })
  .catch((e) => {
    console.log(e);
  });
