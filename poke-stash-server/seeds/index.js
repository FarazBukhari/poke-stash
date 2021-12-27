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
			.get('https://pokeapi.co/api/v2/pokemon?limit=1')
			.then((res) => {
				return res.data.results;
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)));
			});

		const result = response.map((result) => result.data);
		new Pokemon({ abilities: `${result.abilities}`, base_experience: `${result.base_experience}` });
		console.log(response.map((result) => result.data.types.map((types) => types.type.name)));
	} catch (e) {
		throw e;
	}

	// try {
	// 	const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
	// 	const results = response?.data?.results || []
	// 	console.log(results);
	// 	for (let i = 0; i < results.length; i++){
	// 		const single = await axios.get(results[i].url);
	// 		console.log('single', single)
	// 	}
	// } catch (e) {
	// 	throw e;
	// }
};

seedDB();
