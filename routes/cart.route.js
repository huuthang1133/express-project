var express = require('express');
var router = express.Router();

var controllers = require('../controllers/cart.controller');

router.get('/add/:bookId', controllers.addToCart);

router.get('/', controllers.get);

router.post('/', controllers.post);

module.exports = router;