var express = require('express');
var router = express.Router();

var book_controller = require('../controllers/booksController');

router.get('/', book_controller.list);

router.post('/save', book_controller.save);

router.get('/title/:title', book_controller.findByTitle);

module.exports = router;