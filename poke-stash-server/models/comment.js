const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	comment: String,
	postedBy: {
		type: Number,
		ref: 'user'
	}
});

module.exports = mongoose.model('Comment', CommentSchema);
