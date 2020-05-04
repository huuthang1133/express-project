var Trans = require('../../models/trans.model');

module.exports.index = async function (req,res){
  var trans = await Trans.find(); 
  res.json(trans);
}

module.exports.create = async function(req, res){
  var tran = await Trans.create(req.body);
  res.json(tran);
}