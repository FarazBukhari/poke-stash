const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AbilitySchema = new Schema({
	_id: Number,
	name: String,
	pokemon: [
		{
			type: Number,
			ref: 'Pokemon'
		}
	],
	effect_entries: {
		effect: String,
		short_effect: String
	}
});

module.exports = mongoose.model('Ability', AbilitySchema);
