const fs       = require('fs')
const path     = require('path')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// use global Promise as Promise library
mongoose.Promise = global.Promise

// connect to mongodb database
mongoose.connect('mongodb://localhost:27017/rfid', { useMongoClient: true })

let db = fs
    .readdirSync(__dirname)
    .filter(file => path.extname(file) == '.js' && path.basename(file, '.js') != 'index')
    .map(file => {
        let object = require(`./${file}`)
        let name = object.name
        let schema = new Schema(object.schema)
        let model = mongoose.model(name, schema, name)
        
        return { name, model }
    })
    .reduce((acc, val) => {
        acc[val.name] = val.model
        return acc
    }, {})

// expose the mongoose instance
db.mongoose = mongoose

module.exports = db