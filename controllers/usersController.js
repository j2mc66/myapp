var User = require('../models/user');

exports.user_list = function(req, res) {
    var users ;
	User.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err);
		});
};

exports.save = function(req, res) {
    const data = req.body;
    User.create(data)
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err);
		});
};

exports.update = function(req, res) {

    User.findByIdAndUpdate({ _id: req.params.id },req.body, { new: true })
		.then(user => {
			if (!user) {
				return res.sendStatus(404);
			}

			res.json(user);
		})
		.catch(err => {
			//logger.error(err);
			res.status(422).send(err.errors);
		});
}

exports.findById = function(req, res) {
    
    const id = req.params.id;

	User.findById(id)
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			//logger.error(err);
			res.status(422).send(err.errors);
		});
};

exports.delete = function(req, res) {
    
    User.findByIdAndRemove({ _id: req.params.id })
		.then(user => {
			const response = {
                message: "Successfully deleted",
                id: user._id
            };
            return res.status(200).send(response);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err.errors);
		});
}

exports.findByNameAndAge = function(req, res) {
    //User.where("name").equals(req.params.name).and("age").gte(req.params.age)
    User.find({ name: req.params.name, age: {$gte: req.params.age}})
		.then(users => {
			res.json(users);
            return res.status(200).send(response);
		})
		.catch(err => {
			//logger.error(err);
			res.status(500).send(err.errors);
		});
}