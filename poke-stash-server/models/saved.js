const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Saved = new Schema({
	postedBy: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	userId: String
});

module.exports = mongoose.model('saved', Saved);
