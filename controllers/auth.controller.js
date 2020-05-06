var db = require('../db');
var shortid = require('shortid');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var User = require('../models/user.model');
var Wrong = require('../models/wrong.model');
var books = db.get('books').value();

var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var msg = {
  to: 'vohuuthang9595@gmail.com',
  from: 'kidhv1412@anotherman.xyz',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'You are attempting to log in to the system',
  html: '<strong>You are attempting to log in to the system</strong>',
};

module.exports.login = function (req,res){
    res.render('auth/login')
}

module.exports.postLogin = async function (req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  // var wrongLoginCount = db.get('wrongLoginCount').value();;
  var wrongLoginCount = await Wrong.find() || [];
  var saltRounds = 10;
  var myPlaintextPassword = password;
  var someOtherPlaintextPassword = 'not_bacon';
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(myPlaintextPassword, salt); 
  // var user = db.get("users").find({email: email}).value();
  var user = await User.find({email: email});
  console.log(user[0].password);
  if (wrongLoginCount.length === 3) {
    var msg = {
      to: email,
      from: 'kidhv1412@anotherman.xyz',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'You are attempting to log in to the system',
      html: '<strong>You are attempting to log in to the system',
      };
    sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body)
        }
      });    
    res.render("auth/login",{
      errors: [
        "We sent you a email"
      ],
      values: req.body
    })
    var newWrong = new Wrong({hash: hash});
    newWrong.save()
    // db.get('wrongLoginCount').push({ hash: hash}).write();
    return;
  }
  else if (wrongLoginCount.length > 4) {
    res.render("auth/login",{
      errors: [
        "You cannot try anymore"
      ],
      values: req.body
    })
    return;
  }  
  else if (!user){
    res.render("auth/login",{
      errors: [
        "Users does not exist."
      ],
      values: req.body
    })   
    return;
  }  

  else if (!user){
    res.render("auth/login",{
      errors: [
        "Users does not exist."
      ],
      values: req.body
    })   
    return;
  }
  else if (!bcrypt.compareSync(user[0].password, hash)){
    res.render("auth/login",{
      errors: [
        "Password isn't correct"
      ],
      values: req.body
    });
    var newWrong = new Wrong({hash: hash});
    newWrong.save();
    return;
  }
  else {
    Wrong.deleteMany({},function(err,doc){
      if (err){
        console.log(err);
      }
      else {
        console.log(doc);
      }
    });
    console.log("Login success!!!", user[0]._id);
    res.cookie('userId', user[0]._id, {
      signed: true
    });
    res.redirect('..'); 
  }
}