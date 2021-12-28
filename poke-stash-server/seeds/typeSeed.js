const express = require('express');
const mongoose = require('mongoose');
const Type = require('../models/type');
const axios = require('axios');
const { response } = require('express');
const fetch = require('node-fetch');

mongoose.connect('mongodb://localhost:27017/poke-stash', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const fetchTypeData = (type) => {
	let url = type.url;
	fetch(url).then((response) => response.json()).then((typeData) => {
		typeSeed(typeData);
	});
};

const fetchKantoTypes = async () => {
	await Type.deleteMany({});
	fetch('https://pokeapi.co/api/v2/type').then((response) => response.json()).then((allType) => {
		allType.results.forEach((type) => {
			fetchTypeData(type);
		});
	});
};

const typeSeed = async (typeData) => {
	try {
		const type = new Type({
			_id: `${typeData.id}`,
			name: `${typeData.name}`
		});
		await type.save();
	} catch (e) {
		throw e;
	}
};

fetchKantoTypes();
