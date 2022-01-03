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
	fetch('https://pokeapi.co/api/v2/pokemon?limit=150').then((response) => response.json()).then((allPokemon) => {
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

	const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeData.id
		.toString()
		.padStart(3, '0')}.png`;

	await Pokemon.findOneAndUpdate(
		{ _id: pokeData.id },
		{ $push: { types: type, abilities: ability }, $set: { image: image } },
		{ returnOriginal: false }
	);
};

const seedDB = async (pokeData) => {
	try {
		const pokemon = new Pokemon({
			_id: pokeData.id,
			name: pokeData.name,
			weight: pokeData.weight,
			height: pokeData.height,
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
