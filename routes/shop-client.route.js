var express = require('express');
var router = express.Router();

var controllers = require('../controllers/shop-client.controller');

var middleware = require('../middlewares/client.middleware.js');

var authMiddleware = require('../middlewares/auth.middleware.js');

// router.get('/:id/books', controllers.shopIndex);

router.get('/:id/books', controllers.clientIndex);

router.get('/cart/add/:bookId', controllers.addToCart);

router.get('/cart/:id', controllers.get);

// router.post('/cart', controllers.post);

module.exports = router;