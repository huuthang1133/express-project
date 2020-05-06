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
    var books = await User.find({_id: res.locals._id});
    res.render('shop/index.pug', {
      books: books[0].BookInShop.slice(begin,end),
      page: page,
      user: books[0]
    });        
}

module.exports.create = function(req,res){
  res.render('shop/create.pug')
}

module.exports.postCreate = async function(req,res){
  var arr = await User.find({_id: res.locals._id})
  var BookInShop = arr[0].BookInShop
  BookInShop.push(req.body)
  User.update({_id: res.locals._id}, {BookInShop: BookInShop},function(err,doc){
    if (err){
      console.log(err);
    }
    else
      console.log(doc);
  });
  res.redirect('/shop');
}

module.exports.update = async function(req,res){
  var books = await User.find({_id: res.locals._id});
  res.render('shop/update.pug',{
    books: books[0].BookInShop
  });
}


module.exports.updateId = async function(req,res){
  var id = req.params.id;
  var user = await User.find({_id: res.locals._id});
  var bookInShop = user[0].BookInShop;
  var bookUpdate = bookInShop.find(function(x){
    return x._id == id;
  });
  var a = bookInShop.indexOf(bookUpdate);
  res.render('shop/view.pug',{
    book: bookUpdate
  });
}

module.exports.postUpdateId = async function(req,res){
  var user = await User.find({_id: res.locals._id});
  var id = req.params.id;
  var bookInShop = user[0].BookInShop;
  var bookUpdate = bookInShop.find(function(book){
    return book._id == id;    
  });
  req.body.description = bookUpdate.description;
  var a = bookInShop.indexOf(bookUpdate);
  bookInShop[a] = req.body;
  User.update({_id: res.locals._id}, {BookInShop: bookInShop},function(err,doc){
    if (err)
      console.log(err);
    else
      console.log(doc);
  })
  res.redirect('/shop'); 
}

module.exports.delete = async function (req,res){
  var user = await User.find({_id: res.locals._id});
  var id = req.params.id;
  var bookInShop = user[0].BookInShop;  
  var bookDelete = bookInShop.find(function(book){
    return book._id == id;    
  });
  var index = bookInShop.indexOf(bookDelete);
  bookInShop.splice(index,1);
  User.update({_id: res.locals._id}, {BookInShop: bookInShop},function(err,doc){
    if (err)
      console.log(err);
    else
      console.log(doc);
  })
  res.redirect('/shop');   
}
