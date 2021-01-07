const { EventEmitter } = require('events')
module.exports = class Connection {
	constructor() {
		this.event = new EventEmitter()
	}

	connection(msg) {
		this.event.emit('conn', msg)
	}

	onConn(cb) {
		this.event.on('conn', cb)
	}
}
