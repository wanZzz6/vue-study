const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')
const { exception } = require('console')
//@babel/preset-env

module.exports = class webpack {
	constructor(options) {
		const { entry, output } = options
		this.entry = entry
		this.output = output
		this.modules = []
	}
	run() {
		// 开发编译，执行打包
		const info = this.parse(this.entry)
		this.modules.push(info)

		for (let i = 0; i < this.modules.length; i++) {
			const item = this.modules[i]
			const dependencies = item.dependencies
			if (dependencies) {
				for (let j in dependencies) {
					this.modules.push(this.parse(dependencies[j]))
				}
			}
		}
		// 数组结构转对象结构
		const obj = {}
		this.modules.forEach((item) => {
			obj[item.entryFile] = {
				dependencies: item.dependencies,
				code: item.code,
			}
		})
		this.file(obj)
	}
	parse(entryFile) {
		// 分析入口模块的内容
		const content = fs.readFileSync(entryFile, 'utf-8')

		// 处理依赖
		const ast = parser.parse(content, {
			sourceType: 'module',
		})
		const dependencies = {}
		traverse(ast, {
			ImportDeclaration({ node }) {
				//补全路径：./src/index.js，Windows不可用 /
				const pathName = './' + path.join(path.dirname(entryFile), node.source.value) //./a.js ./b.js
				dependencies[node.source.value] = pathName
			},
		})

		// 处理内容
		const { code } = transformFromAst(ast, null, {
			presets: ['@babel/preset-env'],
		})
		return {
			entryFile,
			dependencies,
			code,
		}
	}
	file(code) {
		console.log(code)
		// 生成代码内容 webpack启动函数
		const filePath = path.join(this.output.path, this.output.filename)
		const newCode = JSON.stringify(code)
		const bundle = `(function(modules){
        function require(module){
            function PathRequire(relativePath){
				//把相对于入口的路径换成相对于项目根路径下的路径
               return require(modules[module].dependencies[relativePath])
            }
            const exports = {};
            (function(require, exports, code){
               eval(code)
            })(PathRequire, exports, modules[module].code)
            return exports;
        }
        require('${this.entry}')
    })(${newCode})`
		// 生成main.js 位置是./dist目录
		fs.writeFileSync(filePath, bundle, 'utf-8')
	}
}
