const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoogleUserSchema = new Schema({
	_id: Number,
	userName: {
		type: String,
		required: true
	},
	image: String,
	name: String,
	firstName: String,
	lastName: String
});
module.exports = mongoose.model('GoogleUser', GoogleUserSchema);
