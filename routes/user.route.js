var express = require('express');
var router = express.Router();

var controllers = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var middleware = require('../middlewares/cookie.middleware');

var arrCookie = [];

router.get('/' ,controllers.index);

router.get('/create' ,controllers.create);

router.post('/create', validate.postCreate, controllers.postCreate);

router.get('/update' , controllers.update);

router.get('/update/:id', controllers.updateId);

router.post('/update/:id', validate.postUpdateId, controllers.postUpdateId);

router.get('/delete/:id', controllers.delete);

module.exports = router;