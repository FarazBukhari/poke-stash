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
	name: String,
	url: String
	// about: String,
	// destination: String,
	// category: String,
	// image: ImageSchema,
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
	// comments: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		ref: 'comment'
	// 	}
	// ]
});

module.exports = mongoose.model('pokemon', PokemonSchema);
