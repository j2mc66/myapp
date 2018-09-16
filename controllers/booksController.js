var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');

exports.list = function(req, res) {

	Book.find()
		.then(books => {
			res.json(books);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err);
		});
};

exports.save = function(req, res) {
    Book.create(req.body)
		.then(book => {
			res.json(book);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err);
		});
};

exports.findByTitle = function(req, res) {
	
	Book.find({title: req.params.title})
		.populate('author')
		.populate('genre')
		.then(book => {
			res.json(book);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err);
		});
};