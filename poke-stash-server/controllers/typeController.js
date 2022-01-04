const Pokemon = require('../models/pokemon');
const Type = require('../models/type');
const appConstants = require('../constants/common');
const commonFunctions = require('../helpers/commonFunctions');

const getPokemonByType = async (req, res) => {
	const reqData = req.query;

	try {
		let record = await Type.findOne({ name: reqData.name })
			.populate({
				path: 'pokemon',
				select: [
					'name'
				]
			})
			.lean();

		console.log('Displaying type', record);
		if (record) {
			return commonFunctions.sendResponse(
				res,
				appConstants.CODE.SUCCESS,
				appConstants.RESPONSE_MESSAGES.SUCCESS.POKEMON,
				record
			);
		} else {
			return commonFunctions.sendResponse(
				res,
				appConstants.CODE.NOT_FOUND,
				appConstants.RESPONSE_MESSAGES.SUCCESS.NO_RECORD_FOUND,
				record
			);
		}
	} catch (e) {
		return commonFunctions.sendResponse(res, e.code, e.message);
	}
};

const getAllTypes = async function(req, res) {
	try {
		let allRecords = await Type.find();

		console.log('All Types displayed');
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
	getPokemonByType: getPokemonByType,
	getAllTypes: getAllTypes
};
