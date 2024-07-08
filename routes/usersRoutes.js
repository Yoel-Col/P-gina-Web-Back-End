
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

//establecer las rutas propias de movies, el metodo y especificar el del modulo controller que funcion empleamos 
router.get('/usuarios', userController.getAllUsers);
router.get('/usuarios/:id', userController.getUserById);
router.delete('/usuarios/:id', userController.deleteUserById);
router.put('/usuarios/:id', userController.editUserById);
router.get('/usuarios:email', userController.getUserByemail);
router.post('/usuarios', userController.addUser);

// Otras rutas para POST, PUT, DELETE si queremos implementar

module.exports = router;
