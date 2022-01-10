const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');

router.get('/getById', typeController.getTypeById);
router.get('/getAll', typeController.getAllTypes);

module.exports = router;
