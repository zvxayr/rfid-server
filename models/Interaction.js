const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const name = 'Interaction'

const schema = {
	user: ObjectId,
	timestamp: Date
}

module.exports = {
	name, schema
}