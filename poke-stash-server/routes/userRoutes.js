const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const multer = require('../middlewares/multer');
// const authFunctions = require('../middlewares/authToken');

router.post('/add', userController.addUser);
router.get('/getByUsername', userController.getUserByUsername);
router.put('/update', userController.updateUser);
router.delete('/delete', userController.deleteUser);
router.get('/getAll', userController.getAllUsers);
// router.post('/signIn', userController.signIn);
// router.post('/forgotPassword', userController.forgotPassword);
// router.post('/resetPassword', userController.resetPassword);

module.exports = router;
