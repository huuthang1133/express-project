var express = require('express');
var router = express.Router();

var controllers = require('../controllers/transaction.controller');

router.get('/', controllers.index);

module.exports = router;