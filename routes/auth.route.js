var express = require('express');
var router = express.Router();

var db = require('../db');
var controllers = require('../controllers/auth.controller');

router.get("/login", controllers.login);
router.post("/login", controllers.postLogin);

module.exports = router;