'use strict';

const appConstants = require('../constants/common');

const sendResponse = (res, code, message = null, data = null) => {
	res.status(getHTTPStatusCode(code)).json({ status: getStatusTrueFalse(code), message, data });
};

const getHTTPStatusCode = (code) => {
	if (
		code == appConstants.CODE.SUCCESS ||
		code == appConstants.CODE.NOT_FOUND ||
		code == appConstants.CODE.UNAUTHORIZED ||
		code == appConstants.CODE.BAD_REQUEST
	) {
		return code;
	} else {
		return appConstants.CODE.SERVER_ERROR;
	}
};

const getStatusTrueFalse = (code) => {
	return code == appConstants.CODE.SUCCESS;
};

const consoleLog = (message, data) => {
	console.log(message, ' ==> ', data);
};

module.exports = {
	sendResponse: sendResponse,
	consoleLog: consoleLog
};
