const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dietSchema = new Schema({
  dietType: String,
  ingredients: [ Schema.Types.Mixed ]
});

const Diet = mongoose.model('Diet', dietSchema);

module.exports = Diet