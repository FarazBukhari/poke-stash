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
	types: [
		{
			type: Schema.Types.ObjectId,
			ref: 'type'
		}
	],
	weight: Number,
	height: Number,
	base_experience: Number,
	abilities: [
		{
			type: Schema.Types.ObjectId,
			ref: 'ability'
		}
	],

	about: String,
	destination: String,
	category: String,
	image: ImageSchema,
	postedBy: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	saved: [
		{
			type: Schema.Types.ObjectId,
			ref: 'saved'
		}
	],
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'comment'
		}
	]
});

module.exports = mongoose.model('pokemon', PokemonSchema);
