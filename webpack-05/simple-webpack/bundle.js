// 读取配置
const options = require('./webpack.config.js')
// 引入webpack

const webpack = require('./lib/webpack.js')
// webpack接收配置 启动入口函数，执行打包

new webpack(options).run()
