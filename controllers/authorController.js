var Author = require('../models/author');

exports.list = function(req, res) {

	Author.find()
		.then(authors => {
			res.json(authors);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err);
		});
};

exports.save = function(req, res) {

    Author.create(req.body)
		.then(author => {
			res.json(author);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err);
		});
};

