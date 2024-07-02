const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

//establecer las rutas propias de movies, el metodo y especificar el del modulo controller que funcion empleamos 
router.get('/peliculas', moviesController.getAllMovies);
router.get('/peliculas/:id', moviesController.getMovieById);
router.post('/peliculas', moviesController.addMovie);

// Otras rutas para POST, PUT, DELETE si queremos implementar

module.exports = router;
