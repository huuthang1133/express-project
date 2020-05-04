var db = require('../db');
var mongoose = require('mongoose');
// var shortid = require('shortid');
var Book = require('../models/book.model');

var User = require('../models/user.model');

module.exports.index = async function (req,res){
    var page = parseInt(req.query.page) || 1;
  
    var perPage = 4;
  
    var begin = (page-1)*perPage;
  
    var end = page*perPage;
  
    var drop = (page-1)*perPage
    var books = (await Book.find()).slice(begin, end);
    res.render('books/index.pug', {
      books: books,
      page: page
    });     
}

module.exports.search = async function(req,res){
  var q = req.query.q;
  var books = await Book.find();
  var matchedbook = books.filter(function(book){
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('books/index.pug', {
    books: matchedbook
  });
}

module.exports.create = function(req,res){
  res.render('create.pug')
}

module.exports.update = async function(req,res){
  var books = await Book.find();
  res.render('books/update.pug', {
    books: books
  });
}

module.exports.updateId = async function(req,res){
  var id = req.params.id;
  var book = await Book.find({_id: id});
  res.render('books/view.pug',{
    book: book[0]
  });
}

module.exports.postUpdateId = async function(req,res){
  var books = await Book.find();
  var id = req.params.id;
  var newTitle = req.body.title;
  var book = await Book.find({_id: id});
  User.update({book: book[0].title}, {book: newTitle}, function(err,doc){});
  Book.update({title: book[0].title}, {title: newTitle}, function(err,doc){})
  res.redirect('/books'); 
}

module.exports.delete = async function(req,res){    
  var id = req.params._id;
  var books = await Book.find();
  Book.remove({_id: id},function(err,doc){});
  res.redirect('/books');
  res.render('index.pug',{
    books: books
  })
}

module.exports.postCreate = function(req,res){
  var newBook = new Book (req.body);
  newBook.save();
  res.redirect('/books');
}