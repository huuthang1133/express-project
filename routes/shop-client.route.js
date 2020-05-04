var express = require('express');
var router = express.Router();

var controllers = require('../controllers/shop-client.controller');

router.get('/:id/books', controllers.clientIndex);

module.exports = router;