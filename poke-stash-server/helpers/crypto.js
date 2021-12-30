var CryptoJS = require('crypto-js');
const { consoleLog } = require('./commonFunctions');
const enCrypt = (data) => {
	// Encrypt
	consoleLog('encrypt data', data);
	consoleLog('encrypt key', process.env.CRYPTO_PRIVATE_KEY);
	var ciphertext = CryptoJS.AES.encrypt(data, process.env.CRYPTO_PRIVATE_KEY).toString();
	consoleLog('ciphertext', ciphertext);
	// console.log(ciphertext);
	return ciphertext;
};

const denCrypt = (data) => {
	// Decrypt
	var bytes = CryptoJS.AES.decrypt(data, process.env.CRYPTO_PRIVATE_KEY);
	var deCryptedValue = bytes.toString(CryptoJS.enc.Utf8);
	console.log(deCryptedValue);
	return deCryptedValue;
};
module.exports = {
	enCrypt: enCrypt,
	denCrypt: denCrypt
};
