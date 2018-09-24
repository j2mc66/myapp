var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
  {
    name: {type: String, required: true, min: 3, max: 100}    
  }
);

GenreSchema.virtual('books', {
  ref: 'Book', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'genre', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  //options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
});

module.exports = mongoose.model('Genre', GenreSchema, 'Genre');