var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    age: {type: Number, required: true, min: 0}
  }
);

module.exports = mongoose.model('user', UserSchema, 'user');