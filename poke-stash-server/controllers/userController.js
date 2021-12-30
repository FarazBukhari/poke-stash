'use strict';
const User = require('../models/user');
// const authFunctions = require('../middlewares/authToken');
const crypto = require('../helpers/crypto');
// const randomize = require('randomatic');
// const emailFunctions = require('../helpers/emails');
const appConstants = require('../constants/common');
const commonFunctions = require('../helpers/commonFunctions');

const addUser = async (req, res) => {
	const reqData = req.body;

	if (!reqData.password) {
		return commonFunctions.sendResponse(
			res,
			appConstants.CODE.BAD_REQUEST,
			appConstants.RESPONSE_MESSAGES.FAIL.MISSING_PARAMS
		);
	}
	try {
		reqData.password = crypto.enCrypt(reqData.password);

		let createUser = await User.create(reqData);
		delete createUser._doc.password;
		commonFunctions.sendResponse(
			res,
			appConstants.CODE.SUCCESS,
			appConstants.RESPONSE_MESSAGES.SUCCESS.SIGN_UP,
			createUser._doc
		);
	} catch (e) {
		commonFunctions.sendResponse(res, e.code, e.message, e);
	}
};

const getUserByUsername = async function(req, res) {
	const reqData = req.query;
	try {
		let record = await User.findOne({ userName: reqData.userName }).lean();
		if (record) {
			return commonFunctions.sendResponse(
				res,
				appConstants.CODE.SUCCESS,
				appConstants.RESPONSE_MESSAGES.SUCCESS.USER,
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

const updateUser = async function(req, res) {
	const reqData = req.body;
	const userName = reqData.userName;
	delete reqData.id;
	try {
		let updatedRecord = await User.findOneAndUpdate({ userName: userName }, reqData, { returnOriginal: false });
		return commonFunctions.sendResponse(
			res,
			appConstants.CODE.SUCCESS,
			appConstants.RESPONSE_MESSAGES.SUCCESS.USER_UPDATED,
			updatedRecord
		);
	} catch (e) {
		return commonFunctions.sendResponse(res, e.code, e.message);
	}
};

const deleteUser = async function(req, res) {
	const reqData = req.body;
	try {
		let deletedRecord = await User.remove({ _id: reqData.id });
		return commonFunctions.sendResponse(
			res,
			appConstants.CODE.SUCCESS,
			appConstants.RESPONSE_MESSAGES.SUCCESS.USER_DELETED,
			deletedRecord
		);
	} catch (e) {
		return commonFunctions.sendResponse(res, e.code, e.message);
	}
};

const getAllUsers = async function(req, res) {
	try {
		let allRecords = await User.find();
		return commonFunctions.sendResponse(
			res,
			appConstants.CODE.SUCCESS,
			appConstants.RESPONSE_MESSAGES.SUCCESS.USERS_LIST,
			allRecords
		);
	} catch (e) {
		return commonFunctions.sendResponse(res, e.code, e.message);
	}
};

module.exports = {
	addUser: addUser,
	getUserByUsername: getUserByUsername,
	getAllUsers: getAllUsers,
	updateUser: updateUser,
	deleteUser: deleteUser
	// signIn: signIn,
	// forgotPassword: forgotPassword,
	// resetPassword: resetPassword,
};
