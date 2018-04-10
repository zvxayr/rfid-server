const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const name = 'Interaction';

const schema = new mongoose.Schema({
  userID: ObjectId,
  mealID: ObjectId,
  timestamp: Date
});

const model = mongoose.model(name, schema, name);

module.exports = model;
