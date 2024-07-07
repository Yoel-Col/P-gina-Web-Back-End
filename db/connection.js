const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'mysql-peliculas.alwaysdata.net',
    user: 'peliculas',
    password: 'XWRc9gGikkc.EAK',
    database: 'peliculas_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos.');
});

module.exports = connection;
