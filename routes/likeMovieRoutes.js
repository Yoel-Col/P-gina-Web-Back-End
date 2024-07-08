
const express = require('express');
const router = express.Router();
const likeMovieController = require('../controllers/likeMovieController');

//establecer las rutas propias de movies, el metodo y especificar el del modulo controller que funcion empleamos 
router.post('/like', likeMovieController.addLike);
 router.get('/like/:id', likeMovieController.getMoviesByUserId);

// Otras rutas para POST, PUT, DELETE si queremos implementar

module.exports = router;
