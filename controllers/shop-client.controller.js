var db = require('../db');
var mongoose = require('mongoose');
// var shortid = require('shortid');
var Book = require('../models/book.model');

var User = require('../models/user.model');

var Session = require('../models/session.model');


module.exports.shopIndex = async function (req,res,next) {
  var id = req.params.id;
  res.locals = id;
  next();  
}

module.exports.clientIndex = async function (req, res){
  
  var id = req.params.id;

  var page = parseInt(req.query.page) || 1;

  var perPage = 4;

  var begin = (page-1)*perPage;

  var end = page*perPage;

  var books = await User.find({_id: id});
  res.render('shop/client/index.pug', {
    books: books[0].BookInShop.slice(begin,end),
    page: page,
    id: id
  });
  // res.locals = id; 
  // next();
}


module.exports.addToCart = async function (req, res){
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId){
    res.redirect;
    return;        
  }
  var countArr = await Session.find({_id: sessionId});
  console.log(countArr);
  var count = countArr[0].cart || 0;
  // console.log(count);
  var sessionCart = await Session.find({_id: sessionId});
  if(sessionCart[0].cart){
    var cartObj = sessionCart[0].cart;
    count = 1 + count[bookId] || 1;
    cartObj[bookId] = count;
  }
  else {
    var cartObj = { [bookId]: 1};
  }
  
  Session.update({_id: sessionId}, {cart: cartObj}, function(err,doc){});
  
  res.redirect('back'); 
}

module.exports.get = async function(req, res) {

  var id = req.params.id;

  // var userId = req.signedCookies.userId;
  var sessionId = req.signedCookies.sessionId;
  var session = await Session.find({_id: sessionId});
  var books = await User.find({_id: id});
  var BookInShop = books[0].BookInShop;
  var cart = session[0].cart;
  if(!cart){
    res.redirect('back');
  }
  var booksInCart = [];
  console.log(cart);
  var sum = 0;
  for (var book in cart){
    sum += cart[book];
    var bookInCart = BookInShop.find(function(x){
      return x._id == book;
    });
    booksInCart.push(bookInCart);
  }
  console.log(booksInCart);
  res.render('shop/client/cart.pug', {
    sum: sum,
    books: booksInCart,
    id: res.locals
  })
}

module.exports.post = async function (req,res){
  var sessionId = req.signedCookies.sessionId;
  var id = req.params.id;
  var userId = req.signedCookies.userId;
  var session = await Session.find({_id: sessionId});
  var cart = session[0].cart;
  var bookHire = [];
  if(!userId){
    res.redirect("auth/login");
  }
  for (var book in cart){
    bookHire.push({buyerId: userId, bookId: book});
    // var newTran = new Trans({buyerId: userId, bookId: book});
    // newTran.save(function(err){
    //   if(err){
    //     console.log("error")
    //   }
    //   else {
    //     console.log("success");
    //   }
    // });
  }
  User.update({_id: id}, {transactions: bookHire},function(err,doc){
    if(err){
      console.log(err)
    }
  });
  var trans = await Trans.find();
  // var transeller = 
  // if(!res.locals.isAdmin){
  //   var tranid = await Trans.find({userId: userId}).limit(trans.length);
  //   res.render('transaction/index.pug',{
  //     trans: tranid
  //   });    
  // }
  // else {    
  //   res.render('transaction/index.pug',{
  //     trans: trans
  //   })
  // }
}