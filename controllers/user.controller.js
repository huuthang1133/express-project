var db = require('../db');

var users = db.get('users').value();

var mongoose = require('mongoose');
// var shortid = require('shortid');
var User = require('../models/user.model');

var Book = require('../models/book.model');

module.exports.index = async function(req,res){
  var users = await User.find();
  res.render('users/index.pug', {
    users: users
  })
}

module.exports.create = async function(req,res){
  var books = await Book.find();
  res.render('users/create.pug', {
    books: books
  })
}

module.exports.postCreate = function(req,res){
  res.redirect('/users');
}

module.exports.update = async function(req,res){
  var users = await User.find();
  res.render('users/update.pug', {
    users: users
  });
}

module.exports.updateId = async function(req,res){
  var id = req.params.id;
  var books = await Book.find();
  var user = await User.find({_id: id});
  res.render('users/view.pug',{
    user: user,
    books: books
  });
}

module.exports.postUpdateId = function(req,res){
  res.redirect('/users');
}

module.exports.delete = async function(req,res){    
  var id = req.params.id;
  User.remove({_id: id},function(err,doc){});
  var users = await User.find();
  res.redirect('/users');
  res.render('index.pug',{
    users: users
  })
}