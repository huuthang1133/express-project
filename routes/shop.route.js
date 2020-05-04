var express = require('express');
var router = express.Router();

var controllers = require('../controllers/shop.controller');


router.get('/' ,controllers.index);

router.get('/create' ,controllers.create);

router.get('/update', controllers.update);

router.post('/create' ,controllers.postCreate);

router.get('/update/:id', controllers.updateId);

router.get('/delete/:id', controllers.delete);

router.get('/:id/books', controllers.clientIndex);

router.post('/update/:id', controllers.postUpdateId);

module.exports = router;