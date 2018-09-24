var express = require('express');
var router = express.Router();

var genre_controller = require('../controllers/genreController');

router.get('/', genre_controller.list);

router.post('/save', genre_controller.save);

router.get('/:genre', genre_controller.findByGenere);

module.exports = router;