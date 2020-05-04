var express = require('express');

var User = require('../models/user.model');

var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name:  'thang',
  api_key: '275769149845578',
  api_secret: 'ol9zYE5X8Gj2kDISLb9TFkuA6TA'
});

module.exports.index = async function(req, res){
  var userProfile = await User.find({_id: res.locals._id});
  console.log(userProfile.avatarUrl);
  if(!userProfile[0].avatarUrl){
    userProfile[0].avatarUrl = "https://cdn.glitch.com/dcaf0428-1ba2-47fd-b349-c4edb2744c5c%2F91757853_2407488136208379_1790326107673722880_o.jpg?v=1587954212978";
    res.render('profile/index.pug',{
      user: userProfile[0]
    })
  }
  res.render('profile/index.pug',{
    user: userProfile[0]
  })  
}

module.exports.postProfile = function (req, res){
  if(req.file){
    cloudinary.uploader.upload(req.file.path, function(error, result) {
      console.log(result.url);
      User.updateOne({_id: res.locals._id}, {avatarUrl: result.url}, function (err,doc){
        if(err){
          console.log(err);
        }
        else {
          console.log(doc);
        }
      })         
    });
  }
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  if(req.body.name){
    User.updateOne({_id: res.locals._id}, {name: req.body.name}, function (err,doc){});
  }
  if(email){
    User.updateOne({_id: res.locals._id}, {email: email}, function (err,doc){});
  }
  if(password){
    User.updateOne({_id: res.locals._id}, {password: password}, function (err,doc){});
  }  
  res.redirect('/profile');
}

