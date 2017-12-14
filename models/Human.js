const mongoose = require('mongoose')

let name = 'Human'

let schema = {
	name: { type: String, unique: true }
}

module.exports = {
	name, schema
}