var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
	id: Object,
	cart: Object
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;