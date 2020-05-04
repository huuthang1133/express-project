var db = require('../db');

var shortid = require('shortid');

var Session = require('../models/session.model');

var Book = require('../models/book.model');

var Trans = require('../models/trans.model');

var trans = db.get('transactions').value();

module.exports.addToCart = async function(req,res,next){
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId){
    res.redirect('/books');
    return;        
  }
  var countArr = await Session.find({_id: sessionId});
  // console.log(countArr);
  var count = countArr[0].cart || 0;
  console.log(count);
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
  
  res.redirect('/books');
}

module.exports.get = async function(req, res) {
	var sessionId = req.signedCookies.sessionId;
  var session = await Session.find({_id: sessionId})
	var cart = session[0].cart;
	var sum = 0;
  var books = [];
	for (var book in cart){
		sum += cart[book];
    var bookInCart = await Book.find({_id: book})
    books.push(bookInCart[0]);
	}
	res.render('cart/index.pug', {
		sum: sum,
    books: books
	})
}

module.exports.post = async function (req,res){
  var sessionId = req.signedCookies.sessionId;
  var userId = req.signedCookies.userId;
  var session = await Session.find({_id: sessionId});
  var cart = session[0].cart;
  var newTran = new Trans();
  if(!userId){
    res.redirect("auth/login");
  }
  for (var book in cart){
    var newTran = new Trans({userId: userId, bookId: book});
    newTran.save(function(err){
      if(err){
        console.log("error")
      }
      else {
        console.log("success");
      }
    });
  }    
  var trans = await Trans.find();
  if(!res.locals.isAdmin){
    var tranid = await Trans.find({userId: userId}).limit(trans.length);
    res.render('transaction/index.pug',{
      trans: tranid
    });    
  }
  else {    
    res.render('transaction/index.pug',{
      trans: trans
    })
  }
}