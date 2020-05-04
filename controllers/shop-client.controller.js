var db = require('../db');
var mongoose = require('mongoose');
// var shortid = require('shortid');
var Book = require('../models/book.model');

var User = require('../models/user.model');

module.exports.clientIndex = async function (req, res){
  var id = req.params.id;
  
  var page = parseInt(req.query.page) || 1;

  var perPage = 4;

  var begin = (page-1)*perPage;

  var end = page*perPage;
  
  var books = await User.find({_id: id});
  console.log(books);
  res.render('shop/client/index.pug', {
    books: books[0].BookInShop.slice(begin,end),
    page: page,
    id: id
  });    
}

