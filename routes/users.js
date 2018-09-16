var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/usersController');

router.get('/', user_controller.user_list);

router.post('/save', user_controller.save);

router.put('/update/:id', user_controller.update);

router.get('/:id', user_controller.findById);

router.delete('/:id', user_controller.delete);

router.get('/name/:name/age/:age', user_controller.findByNameAndAge);

module.exports = router;
