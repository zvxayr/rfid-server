const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const saltRounds = 10;

const name = 'Admin';

const schema = new mongoose.Schema({
    name: { type: String, unique: true, trim: true },
    sex: { type: String, enum: ['M', 'F'] },
    username: { type: String, unique: true, trim: true },
    email: { type: String, trim: true },
    password: String,
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