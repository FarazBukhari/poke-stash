const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');

router.get('/getByName', typeController.getPokemonByType);
router.get('/getAll', typeController.getAllTypes);

module.exports = router;
