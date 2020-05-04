var express = require('express');
var router = express.Router();

var controllers = require('../controllers/transaction.controller');

var controllersCart = require('../controllers/cart.controller');

var middleware = require('../middlewares/cookie.middleware');

router.get('/', controllers.index);

router.get('/create',controllers.create);

router.post('/create', controllers.postCreate);

router.post('/', controllersCart.post);

router.get('/:id/complete',controllers.isComplete);

module.exports = router;