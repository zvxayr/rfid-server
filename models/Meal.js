const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const name = 'Meal';

const schema = new mongoose.Schema({
  date: String,
  meal: { type: String, enum: ['B', 'L', 'D'] },
  menuID: ObjectId
});

const model = mongoose.model(name, schema, name);

module.exports = model;
