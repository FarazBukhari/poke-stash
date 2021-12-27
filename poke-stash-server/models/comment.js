const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	comment: String,
	postedBy: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

module.exports = mongoose.model('user', CommentSchema);
