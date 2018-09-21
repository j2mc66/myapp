var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/usersController');

var auth = require('../middlewares/authenticated');

router.get('/', auth.ensureAuth, user_controller.list);

router.post('/save', user_controller.save);

router.put('/update/:id', user_controller.update);

router.get('/:id', user_controller.findById);

router.delete('/:id', user_controller.delete);

router.get('/name/:name/age/:age', user_controller.findByNameAndAge);

router.post('/login', user_controller.login);

router.post('/upload', user_controller.uploads);

router.get('/test/callback',  user_controller.mycalback);

module.exports = router;
