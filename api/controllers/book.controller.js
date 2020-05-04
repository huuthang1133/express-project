var Book = require('../../models/book.model');

module.exports.index = async function (req,res){
  var books = await Book.find(); 
  res.json(books);
}

module.exports.create = async function (req,res){
  var book = await Book.create(req.body);
  res.json(book);
}

module.exports.indexId = async function (req,res){
  var id = req.params.id;
  var book = await Book.find({_id: id});
  res.json(book);
}

module.exports.deleteId = async function (req,res){
  var id = req.params.id;
  Book.deleteOne({_id: id},function(err,doc){
    res.json(doc);
  }); 
}

module.exports.put = async function (req,res){
  var id = req.params.id;
  var book = await Book.find({_id:id});
  if(book.length){
    Book.update({_id: id}, req.body, function(err,doc){
      console.log(err);
    });        
  }
  else{
    var newBook = new Book(req.body);
    newBook.save();
  }

  var books = await Book.find();
  res.json(books);
}

module.exports.patch = async function(req,res){
  var id = req.params.id;  
  Book.update({_id: id}, req.body, function(err,doc){
    console.log(err);
  });
  var books = await Book.find();
  res.json(books);
}