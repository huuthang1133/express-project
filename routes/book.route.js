var express = require('express');
var router = express.Router();

var db = require('../db');

var controllers = require('../controllers/book.controller');

var middleware = require('../middlewares/cookie.middleware');

var books = db.get('books').value();

router.get('/' ,controllers.index);

router.get('/search', controllers.search);

router.get('/create', controllers.create);

router.get('/update', controllers.update);

router.get('/update/:id', controllers.updateId);

router.post('/update/:id', controllers.postUpdateId);

router.get('/delete/:id', controllers.delete);


router.post('/create', controllers.postCreate);

module.exports = router;
