const fs = require('fs')
module.exports.parser = (path) => {
	const readStream = fs.createReadStream(path)
	let reqData = []
	let size = 0
	return new Promise((resolve) => {
		readStream.on('data', (data) => {
			reqData.push(JSON.parse(data.toString()))
			console.log(reqData[size])
			resolve(reqData[size])
			size++
			// 暗号 二分查找
		})
	})
}
