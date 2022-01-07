const appConstants = require('../constants/common');
const commonFunctions = require('../helpers/commonFunctions');
const Pokemon = require('../models/pokemon');
const Type = require('../models/type');

const getSearch = async function(req, res) {
	const reqData = req.query;
	try {
		let typeRecords = await Type.findOne({ name: reqData.searchTerm });

		if (typeRecords) {
			let allRecords = await Pokemon.aggregate([
				{
					$match: { types: typeRecords._id }
				}
			]).sort({ _id: 1 });
			return commonFunctions.sendResponse(
				res,
				appConstants.CODE.SUCCESS,
				appConstants.RESPONSE_MESSAGES.SUCCESS.POKEMON_LIST,
				allRecords
			);
		}
		if (!typeRecords) {
			let allRecords = await Pokemon.aggregate([
				{
					$match: { name: reqData.searchTerm }
				}
			]).sort({ _id: 1 });
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
