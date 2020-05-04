var db = require('../db')

module.exports.countCookie = function (req,res,next){
  var arrCookie = db.get('arrCookie').value();
  console.log(arrCookie.length);
  next();
}