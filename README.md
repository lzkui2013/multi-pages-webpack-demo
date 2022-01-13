这是针对使用 vue 的多页面应用使用「增量编译」的方式优化 webpack 构建速度的 demo
这是整个项目中所有文件的依赖关系图：[https://raw.githubusercontent.com/lzkui2013/multi-pages-webpack-demo/master/demo/project-depency-graph.svg](https://raw.githubusercontent.com/lzkui2013/multi-pages-webpack-demo/master/demo/project-depency-graph.svg)

可以自己在 master 分支上，修改或新增文件然后 commit 来体验一下「增量构建」，执行 `npm run build` 之后在 `build/dist` 文件夹下可以看到一个 image.svg 文件，这是更改后项目新的文件依赖图，可以对比刚才构建的入口，修改的文件影响的是不是相应的入口。
如果想要全量构建，可以删除 `build/getDep/localDepency.json`文件即可。

tip：demo 中没有做本地依赖更新操作，所以，无论本地 commit 多少次，比对修改都是跟线上 master 做的对比。

执行方法：

```bash
npm install
npm run build
```
