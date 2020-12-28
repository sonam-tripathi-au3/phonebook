const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name:String,
    location:String,
    contact:Number
})

module.exports = mongoose.model('Directory', schema)