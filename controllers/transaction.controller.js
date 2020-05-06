// var trans = db.get('transactions').value();

var Trans = require('../models/trans.model');

var Book = require('../models/book.model');

var User = require('../models/user.model');

module.exports.index = async function (req,res) {
  if(!res.locals.isAdmin){
    var tranid = await Trans.find({userId: res.locals._id});
    // tranid.push(db.get('transactions').find({userId: res.locals.id}).value());
    res.render('transaction/index.pug',{
      trans: tranid
    });    
  }
  else {
    res.render('transaction/index.pug',{
      trans: await Trans.find()
    })
  }
}

module.exports.create = async function (req,res) {
  var books = await Book.find();
  if(!res.locals.isAdmin){
    var users = await User.find({ _id: res.locals._id }); 
    res.render('transaction/view.pug',{
      books: books,
      users: users
    });    
  }
  var users = await User.find();
  res.render('transaction/view.pug',{
    books: books,
    users: users
  });     
}

module.exports.postCreate = async function (req,res) {
	var book = req.body.book;
	var user = req.body.user;
	var userId = await User.find({name: user});
	var bookId = await Book.find({title: book});
  var newTran = new Trans ({userId: userId[0]._id, bookId: bookId[0]._id});
  newTran.save(function(err){
    if(err){
      console.log("error")
    }
    else {
      console.log("success");
    }
  });
  var trans = await Trans.find();
	res.render('transaction/index.pug',{
		trans: trans    
	});
}

module.exports.isComplete = async function (req,res){
  var id = req.params.id;
  var errors= [];
  var tran = await Trans.find({_id: id});
  var a = tran[0];
  console.log(a, a.isComplete);
  if (!tran){
    errors.push("Transaction doesn't exist");
    res.render('transaction/isComplete.pug',{
      errors: errors
    });
    return;
  }
  res.render('transaction/isComplete.pug',{
    tran: a.isComplete
  })
}