const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const saltRounds = 10;

const name = 'User';

const schema = new mongoose.Schema({
  name: { type: String, trim: true, unique: true },
  sex: { type: String, enum: ['M', 'F'] },
  cardUID: { type: String, trim: true, unique: true },
  username: { type: String, trim: true, unique: true },
  email: { type: String, trim: true, unique: true },
  password: String,
  state: Boolean,
});

schema.pre('save', async function() {
  if (!this.isModified('password')) return;

  this.password = await this.encryptPassword(this.password);
});

schema.methods = {
  authenticate(plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
  },
  encryptPassword(plainPassword) {
    return bcrypt.hash(plainPassword, saltRounds);
  }
};

const model = mongoose.model(name, schema, name);

module.exports = model;
