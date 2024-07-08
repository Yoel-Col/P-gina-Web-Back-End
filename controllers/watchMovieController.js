const e = require('express');
const connection = require('../db/connection');

//especificamos las funciones que seran exportadas, aqui es donde entra la lógica

exports.getMoviesByUserId = (req, res) => {
    const id = req.params.id;
    console.log("id",id)

    connection.query('SELECT * FROM peliculas WHERE id in (select distinct pelicula_id from mirapelicula where usuario_id = ?)', [id], (error, results) => {
        if (error) {throw error
            }
        res.json(results);
    });
};

exports.addVista = (req, res) => {
    const { usuario_id,pelicula_id,fecha } = req.body;
    connection.query('INSERT INTO mirapelicula (usuario_id,pelicula_id,fecha) VALUES (?, ?, ?)', [usuario_id,pelicula_id,fecha], (error, results) => {
        if (error||results.length<=0) {
            console.log(error)
             error.ok = false;
            }
        res.json(results[0]);
    });
};
