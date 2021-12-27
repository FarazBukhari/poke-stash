const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Pokemon = require('./models/pokemon');

const app = express();

mongoose.connect('mongodb://localhost:27017/poke-stash', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

app.get('/', (req, res) => {
	res.send('POKESTASH SERVER');
});

app.get('/pokemon', async (req, res) => {
	const pokemon = new Pokemon({ title: 'Pikachu', about: 'Sparky boi', category: 'Electric' });
	await pokemon.save();
	res.send(pokemon);
});

app.listen(3001, () => {
	console.log('Serving on port 3001');
});
