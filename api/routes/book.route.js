var express = require('express');
var router = express.Router();

var controllers = require('../controllers/book.controller');

router.get('/', controllers.index);
router.get('/:id', controllers.indexId);
router.post('/', controllers.create);
router.delete('/:id/delete', controllers.deleteId);
router.put('/:id/put', controllers.put);
router.patch('/:id/patch', controllers.patch)
module.exports = router;