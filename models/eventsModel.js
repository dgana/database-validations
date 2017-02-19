var mongoose = require('mongoose')
var Schema = mongoose.Schema

var eventsSchema = new Schema({  'date': String,  'title': String,  'name': String,  'email': String})

module.exports = mongoose.model('events', eventsSchema)
