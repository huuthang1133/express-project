var db = require('../db');
var shortid = require('shortid');

var User = require('../models/user.model');

var Book = require('../models/book.model');

module.exports.postCreate = function(req, res, next) {
  var name = req.body.name;
  var errors = [];  
  if(name.length <= 30) {
    var newUser = new User(req.body);
    newUser.save(function(err){
      if(err){
        console.log(err);
      }
      else
        console.log(newUser);
    });
  }
  else {
    errors.push("Name must be less than 30 characters"),
    res.render('users/create',{
      errors: errors
    })
  }
  next();
}

module.exports.postUpdateId = async function(req,res,next){
  var id = req.params.id;
  var errors = [];
  var books = await Book.find();
  var user = await User.find({_id: id});
  var data = req.body;
  if (!data.name) {
    errors.push("Name must be required");
    res.render('users/view' ,{
      errors: errors,
      user: user[0],
      books: books
    })
    return;
  }
  else if (data.name.length <= 30){
    User.update({_id: id}, {name: data.name}, function(err,doc){});
  }
  else {
    errors.push("Name must be less than 30 characters");
    res.render('users/view' ,{
      errors: errors,
      user: user[0],
      books: books      
    })  
  }
  next();
}