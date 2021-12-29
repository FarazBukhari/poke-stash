const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
	_id: Number,
	name: String,
	pokemon: [
		{
			type: Number,
			ref: 'Pokemon'
		}
	]
	// moves: [
	// 	String
	// ]
});

module.exports = mongoose.model('Type', TypeSchema);
