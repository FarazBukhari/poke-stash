const express = require('express');
const mongoose = require('mongoose');
const Pokemon = require('../models/pokemon');
const Type = require('../models/type');
const Ability = require('../models/ability');
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

const fetchPokemonData = (pokemon) => {
	let url = pokemon.url;
	fetch(url).then((response) => response.json()).then((pokeData) => {
		seedDB(pokeData);
	});
};

const fetchKantoPokemon = async () => {
	await Pokemon.deleteMany({});
	fetch('https://pokeapi.co/api/v2/pokemon?limit=1').then((response) => response.json()).then((allPokemon) => {
		allPokemon.results.forEach((pokemon) => {
			fetchPokemonData(pokemon);
		});
	});
};

const getTypeId = async (pokeData) => {
	const type = await Type.find({ name: pokeData.types.map((types) => types.type.name) }, function(doc) {
		return doc;
	}).clone();
	const ability = await Ability.find({ name: pokeData.abilities.map((abilities) => abilities.ability.name) });
	// console.log('types', type);

	await Pokemon.findOneAndUpdate(
		{ _id: pokeData.id },
		{ $push: { types: type, abilities: ability } },
		{ returnOriginal: false }
	);
	// console.log('pokeLocal', pokeLocal);
};

const seedDB = async (pokeData) => {
	try {
		const pokemon = new Pokemon({
			_id: pokeData.id,
			name: pokeData.name,
			weight: pokeData.weight,
			height: pokeData.height,
			abilities: pokeData.abilities.map((abilities) => abilities.ability.name),
			base_experience: pokeData.base_experience
		});

		await pokemon.save();
		await getTypeId(pokeData);
	} catch (e) {
		throw e;
	}
};

// seedDB();
fetchKantoPokemon();
// getTypeId('grass');
