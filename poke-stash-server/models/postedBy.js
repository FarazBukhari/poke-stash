const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostedBy = new Schema({
	postedBy: [
		{
			type: Schema.Types.ObjectId,
			ref: 'user'
		}
	]
});

module.exports = mongoose.model('postedBy', PostedBy);
