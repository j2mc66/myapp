var Genre = require('../models/genre');
var book = require('../models/book');

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

exports.findByGenere = function(req, res) {
	Genre.aggregate([ { $lookup: { from: 'Book', localField: '_id', foreignField: 'genre', as: 'books' } }])
		.then(genre => {
			res.json(genre);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err);
		});
}
//{$match:{name: req.param.genre}},}
exports.findByGenere2 = function(req, res) {	
	Genre.find(/*{name: req.params.genre}*/).populate({path: 'books', select: 'name'})
		.then(genre => {
			console.log(genre);
			res.json(genre);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err);
		});
}