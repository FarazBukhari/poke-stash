const express = require('express');
const mongoose = require('mongoose');
const Pokemon = require('../models/pokemon');
const axios = require('axios');

mongoose.connect('mongodb://localhost:27017/poke-stash', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const seedDB = async () => {
	// await Pokemon.deleteMany();

	try {
		const response = await axios
			.get('https://pokeapi.co/api/v2/pokemon?limit=100')
			.then((res) => {
				return res.data.results;
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)));
			});

		console.log(response.map((result) => result.data.name));
	} catch (e) {
		throw e;
	}
};

seedDB();
