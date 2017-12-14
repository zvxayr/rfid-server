const mongoose = require('mongoose')

let name = 'Location'

let schema = {
	name: { type: String, unique: true }
}

module.exports = {
	name, schema
}