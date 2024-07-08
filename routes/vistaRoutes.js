
const express = require('express');
const router = express.Router();
const watchMovieController = require('../controllers/watchMovieController');

//establecer las rutas propias de movies, el metodo y especificar el del modulo controller que funcion empleamos 
router.post('/vista', watchMovieController.addVista);
 router.get('/vista/:id', watchMovieController.getMoviesByUserId);

// Otras rutas para POST, PUT, DELETE si queremos implementar

module.exports = router;
