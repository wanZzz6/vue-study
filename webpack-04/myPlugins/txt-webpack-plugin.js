// 插件的结构

module.exports = class txtwebpackplugin {
	constructor(options) {
		console.log(options)
	}
	// apply
	apply(compiler) {
		//钩入hook
		compiler.hooks.emit.tapAsync('txtwebpackplugin', (compilation, cb) => {
			// console.log(compilation.assets)
			let allFileName = Object.keys(compilation.assets)
			let content = `total number ${allFileName.length}\n\n- ${allFileName.join('\n- ')}`
			compilation.assets['fileList.txt'] = {
				source: function () {
					return content
				},
				size: function () {
					return content.length
				},
			}
			cb()
		})
		//同步的写法
		compiler.hooks.compile.tap('txtwebpackplugin', (compilation) => {
			console.log('测试同步钩子')
		})
	}
}
