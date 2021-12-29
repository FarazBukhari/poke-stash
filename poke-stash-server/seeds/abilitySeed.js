const express = require('express');
const mongoose = require('mongoose');
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

const fetchAbilityData = (ability) => {
	let url = ability.url;
	fetch(url).then((response) => response.json()).then((abilityData) => {
		abilitySeed(abilityData);
	});
};

const fetchKantoAbilities = async () => {
	await Ability.deleteMany({});
	fetch('https://pokeapi.co/api/v2/ability').then((response) => response.json()).then((allAbility) => {
		allAbility.results.forEach((ability) => {
			fetchAbilityData(ability);
		});
	});
};

const abilitySeed = async (abilityData) => {
	try {
		const ability = new Ability({
			_id: `${abilityData.id}`,
			name: `${abilityData.name}`
		});
		await ability.save();
	} catch (e) {
		throw e;
	}
};

fetchKantoAbilities();
