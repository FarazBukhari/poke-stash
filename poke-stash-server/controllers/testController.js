const appConstants = require('../constants/common');
const commonFunctions = require('../helpers/commonFunctions');
const Pokemon = require('../models/pokemon');
const Type = require('../models/type');

const getTest = async function(req, res) {
	try {
		// console.log('Test');

		let typeRecords = await Type.findOne({ _id: 4 });
		console.log(typeRecords);

		let allRecords = await Pokemon.aggregate([
			{
				$match: { types: typeRecords._id }
			},
			{
				$sort: {
					_id: 1
				}
			},
			{
				$project: {
					_id: 1,
					name: 1
				}
			}
		]);
		// let pokeRecords = await Pokemon.findOne({ _id: 1 });
		// console.log('--------POKE_RECORD--------', pokeRecords);
		// let allRecords = await Type.aggregate([
		// 	{
		// 		$lookup: {
		// 			from: 'pokemons',
		// 			localField: 'pokemon',
		// 			foreignField: '_id',
		// 			as: 'pokemons '
		// 		}
		// 	},
		// 	{
		// 		$project: {
		// 			__v: 0,
		// 			pokemon: 0
		// 		}
		// 	}
		// 	// {
		// 	// 	$unwind: '$type'
		// 	// }
		// ]).then((res) => {
		// 	return res;
		// });

		return commonFunctions.sendResponse(
			res,
			appConstants.CODE.SUCCESS,
			appConstants.RESPONSE_MESSAGES.SUCCESS.POKEMON_LIST,
			allRecords
		);
	} catch (e) {
		return commonFunctions.sendResponse(res, e.code, e.message);
	}
};

module.exports = {
	getTest: getTest
};
