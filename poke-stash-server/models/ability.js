const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AbilitySchema = new Schema({
	// _id: Number,
	name: String
	// pokemon: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		ref: 'pokemon'
	// 	}
	// ],
	// effect_entries: {
	// 	effect: String,
	// 	short_effect: String
	// }
});

module.exports = mongoose.model('type', AbilitySchema);
