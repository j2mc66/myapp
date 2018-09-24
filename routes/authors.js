var express = require('express');
var router = express.Router();

var author_controller = require('../controllers/authorController');

router.get('/', author_controller.list);

router.post('/save', author_controller.save);

module.exports = router;