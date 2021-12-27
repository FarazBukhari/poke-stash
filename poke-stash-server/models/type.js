const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
	name: String,
	pokemon: [
		{
			type: Schema.Types.ObjectId,
			ref: 'pokemon'
		}
	],
	moves: [
		String
	]
});

module.exports = mongoose.model('type', TypeSchema);
