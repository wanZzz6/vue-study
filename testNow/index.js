const path = require('path')

module.exports = class TestNow{

    /**
     * 
     * @param {*} methodName 
     * @param {*} classFile 
     */
    getTextSource(methodName, classFile){
        console.log('getTextSource', methodName)

        return `
        test('${'TEXT ' + methodName }', () => {
            const ${isClass ? '{' + methodName + '}' : methodName} = require('${'../' + classFile}')
            const ret = ${methodName}()
            //  expect(ret)
            // .toBe('test return')
        })
        `
    }

/**
 * 生成测试文件名
 * @param {*} filename 代码文件名
 */

    getTestFileName(filename){
        const dirName = path.dirname(filename)
        const baseName = path.basename(filename)
        const extName = path.extname(filename)
        const testName = baseName.replace(extName, `.spec${extName}`)

        return path.format({
            root: dirName + '/__test__/',
            base: testName
        }
        )
    }
}