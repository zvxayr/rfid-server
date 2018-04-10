const mongoose = require('mongoose');

const name = 'Menu';

const schema = new mongoose.Schema({
    name: { type: String, unique: true }
});

const model = mongoose.model(name, schema, name);

module.exports = model;