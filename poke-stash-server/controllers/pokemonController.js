const Pokemon = require('../models/pokemon');
const Type = require('../models/type');
const Ability = require('../models/ability');
const appConstants = require('../constants/common');
const commonFunctions = require('../helpers/commonFunctions');

const getPokemonById = async (req, res) => {
	const reqData = req.query;

	try {
		let record = await Pokemon.findOne({ _id: reqData.id })
			.populate({
				path: 'types',
				select: [
					'name'
				]
			})
			.populate({
				path: 'abilities',
				select: [
					'name'
				]
			})
			.lean();

		// console.log('Displaying', record);
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

const getPokemonByType = async function(req, res) {
	const reqData = req.query;
	try {
		// console.log('reqData Types', reqData);
		let typeRecord = await Type.findOne({ name: reqData.name });
		let record = await Pokemon.find({ types: typeRecord._id });
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

const getAllPokemon = async function(req, res) {
	try {
		let allRecords = await Pokemon.find();

		// console.log('All Pokemon displayed');
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
	getPokemonById: getPokemonById,
	getAllPokemon: getAllPokemon,
	getPokemonByType: getPokemonByType
};
