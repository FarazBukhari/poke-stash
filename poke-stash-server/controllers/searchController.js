const appConstants = require('../constants/common');
const commonFunctions = require('../helpers/commonFunctions');
const Pokemon = require('../models/pokemon');
const Type = require('../models/type');

const getSearch = async function(req, res) {
	const reqData = req.query;
	try {
		console.log('Searched', reqData);

		let typeRecords = await Type.findOne({ name: reqData.searchTerm });
		console.log(typeRecords);

		if (typeRecords) {
			let allRecords = await Pokemon.aggregate([
				{
					$match: { types: typeRecords._id }
				}
			]);
			// console.log('allReacords', allRecords);
			return commonFunctions.sendResponse(
				res,
				appConstants.CODE.SUCCESS,
				appConstants.RESPONSE_MESSAGES.SUCCESS.POKEMON_LIST,
				allRecords
			);
		} else {
			let allRecords = await Pokemon.aggregate([
				{
					$match: { name: reqData.searchTerm }
				}
			]);
			// console.log('allReacords', allRecords);
			return commonFunctions.sendResponse(
				res,
				appConstants.CODE.SUCCESS,
				appConstants.RESPONSE_MESSAGES.SUCCESS.POKEMON_LIST,
				allRecords
			);
		}
		return commonFunctions.sendResponse(
			res,
			appConstants.CODE.SUCCESS,
			appConstants.RESPONSE_MESSAGES.SUCCESS.POKEMON_LIST,
			[]
		);
	} catch (e) {
		return commonFunctions.sendResponse(res, e.code, e.message);
	}
};

module.exports = {
	getSearch: getSearch
};
