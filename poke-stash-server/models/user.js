const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

module.exports = mongoose.model('User', UserSchema);
