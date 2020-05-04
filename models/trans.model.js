var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transSchema = new Schema({
  id: String,
  userId: String,
  bookId: String,
  isComplete: Boolean
});

var Trans = mongoose.model('Trans', transSchema, 'transactions');

module.exports = Trans;