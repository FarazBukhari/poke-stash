const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	url: String,
	filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
	return this.url.replace('/upload', '/upload/w_200');
});

const PokemonSchema = new Schema({
	_id: Number,
	name: String,
	weight: Number,
	height: Number,
	base_experience: Number,
	types: [
		{
			type: Number,
			ref: 'Type'
		}
	],
	abilities: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Ability'
		}
	],
	image: String,

	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
	// about: String,
	// destination: String,
	// category: String,
	// postedBy: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'user'
	// },
	// saved: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		ref: 'saved'
	// 	}
	// ],
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
