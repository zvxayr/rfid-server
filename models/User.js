const name = 'User'

const schema = {
	name: { type: String, unique: true },
	cardId: { type: String, unique: true }
}

module.exports = {
	name, schema
}