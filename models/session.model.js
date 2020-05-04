var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
  cart: Object
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;