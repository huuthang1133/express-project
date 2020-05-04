var express = require('express');
var router = express.Router();

var controllers = require('../controllers/profile.controller');

var multer  = require('multer');

var upload = multer({ dest: './uploads'});


router.get('/',controllers.index);

router.post('/', upload.single('avatar'), controllers.postProfile);

module.exports = router;