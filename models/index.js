const fs       = require('fs')
const path     = require('path')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// use global Promise as Promise library
mongoose.Promise = global.Promise

// connect to mongodb database
mongoose.connect('mongodb://localhost:27017/rfid')

fs
    .readdirSync(__dirname)
    .filter(file => path.extname(file) == '.js' && path.basename(file, '.js') != 'index')
    .map(file => require(`./${file}`))
    .forEach(model => {
        exports[model.collection.collectionName] = model
    })

exports.mongoose = mongoose