const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


const moviesRoutes = require('./routes/moviesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const usersController = require('./controllers/usersController');

//middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', moviesRoutes);
app.use(express.static(path.join(__dirname, 'public')));

//files estaticos (hay que cambiarlo pero cumple funcionalidad)
app.get('/', (req, res) => {res.sendFile(path.join(__dirname,'index.html'));});
app.get('/login', (req, res) => {res.sendFile(path.join(__dirname,'public','pages','login.html'));});
app.get('/registrar', (req, res) => {res.sendFile(path.join(__dirname,'public','pages','registrarse.html'));});
app.get('/addMovie', (req, res) => {res.sendFile(path.join(__dirname,'public','pages','user.html'));});

const PORT = process.env.PORT || 3950;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
