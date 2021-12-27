const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	title: String,
	email: {
		type: String,
		required: true,
		inque: true
	},
	image: String
});

module.exports = mongoose.model('user', UserSchema);
