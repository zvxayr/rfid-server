const mongoose = require('mongoose')

const Schema = mongoose.Schema
let ObjectId = Schema.ObjectId

let name = 'Rfid'

let schema = {
	code: { type: String, unique: true },
	human: ObjectId
}

module.exports = {
	name, schema
}