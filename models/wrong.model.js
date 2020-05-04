var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wrongSchema = new Schema({
  hash: Object
});

var Wrong = mongoose.model('Wrong', wrongSchema, 'wrongLoginCount');

module.exports = Wrong;