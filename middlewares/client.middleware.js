var db = require('../db');

module.exports = function (req,res, next){
	if(!id){
		var id = req.params.id;				
	}
	res.locals = id;
	next()
}