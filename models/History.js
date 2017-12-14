const mongoose = require('mongoose')

const Schema = mongoose.Schema
let ObjectId = Schema.ObjectId

let name = 'History'

let schema = {
	human: ObjectId,
	location: ObjectId,
	timestamp: Date
}

module.exports = {
	name, schema
}