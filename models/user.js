var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    firstname: {type: String, required: true, max: 100},
    age: {type: Number, required: true, min: 0},
    username: {type: String, required: true, min: 4},
    password: {type: String, required: true, min: 4},
    status: {type: String}
  }
);

module.exports = mongoose.model('user', UserSchema, 'user');