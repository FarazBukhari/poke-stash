const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/getById', pokemonController.getPokemonById);
router.get('/getAll', pokemonController.getAllPokemon);

module.exports = router;
