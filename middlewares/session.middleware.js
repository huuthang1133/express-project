var db = require('../db');
var shortid = require('shortid');

var Session = require('../models/session.model')

module.exports = function (req, res, next){
  if(!req.signedCookies.sessionId){
    var sessionId;
    var newSession = new Session();
    res.cookie('sessionId', newSession._id, {
      signed: true
    })  
    newSession.save()   
    res.redirect('/books');     
  }
  next();
}