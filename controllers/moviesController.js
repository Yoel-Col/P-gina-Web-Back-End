const connection = require('../db/connection');

//especificamos las funciones que seran exportadas, aqui es donde entra la lógica
exports.getAllMovies = (req, res) => {
    connection.query('SELECT * FROM peliculas', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
};

exports.getMovieById = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM peliculas WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
};

exports.addMovie = (req, res) => {
    const { titulo, descripcion, anio, valoracion, imagen_url, categoria_id } = req.body;
    const query = 'INSERT INTO peliculas (titulo, descripcion, anio, valoracion, imagen_url, categoria_id) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [titulo, descripcion, anio, valoracion, imagen_url, categoria_id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al insertar película');
        } else {
            res.status(201).json({ id: results.insertId, ...req.body });
        }
    });
};


// Otros controladores para POST, PUT, DELETE si queremos implementar
