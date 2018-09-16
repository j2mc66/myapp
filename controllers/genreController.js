var Genre = require('../models/genre');

exports.list = function(req, res) {

	Genre.find()
		.then(genres => {
			res.json(genres);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err);
		});
};

exports.save = function(req, res) {

    Genre.create(req.body)
		.then(genre => {
			res.json(genre);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err);
		});
};