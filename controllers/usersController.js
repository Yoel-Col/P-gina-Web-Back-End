const e = require('express');
const connection = require('../db/connection');

//especificamos las funciones que seran exportadas, aqui es donde entra la lógica
exports.getAllUsers = (req, res) => {
    connection.query('SELECT * FROM usuarios', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
};

exports.getUserById = (req, res) => {
    const id = req.params.id;
    console.log("id",id)

    connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
        if (error||results.length<=0) {
            console.log(error)
             error.ok = false;
            }
        res.json(results[0]);
    });
};

exports.getUserByemail = (req, res) => {
    const email = req.params.email.split(":")[1];
    console.log("email",email)
    connection.query('SELECT * FROM usuarios WHERE email = ?', [email], (error, results) => {
        try{
            console.log(error, results)
            if (!error && results.length<=0){
                console.log("if 404")
                res.status(404).send({ error: 'Not found' });
            
            }else {

                res.status(200).send(results[0]);
                console.log(results[0])
            }
            

        }
        catch(error){
            console.log(error)
        }
    });
};


exports.addUser = (req, res) => {
    const { nombre,email,password } = req.body;
    const query = 'INSERT INTO usuarios (nombre,email,password) VALUES (?, ?, ?)';
    connection.query(query, [ nombre,email,password], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.status(201).json({ id: results.insertId, ...req.body });
        }
    });
};


// Otros controladores para POST, PUT, DELETE si queremos implementar

exports.deleteUserById = (req, res) => {
    const id = req.params.id;
    console.log("id",id)

    connection.query('delete FROM usuarios WHERE id = ?', [id], (error, results) => {
        console.log(error,"res",results,results.affectedRows)
            if(error){
                throw error

            }
            else{

                res.status(200).json({ serverStatus: results.serverStatus, ...req.body })
            }
    });
};
exports.editUserById = (req, res) => {
    const id = req.params.id;
    console.log("id",id)
    const {nombre,password} = req.body;
    const query = 'update usuarios set nombre = ?, password = ?  WHERE id = ?';
    connection.query(query,[nombre,password,id], (error, results) => {
        console.log(error,"res",results,results.affectedRows)
        if ( error) { throw error}
        res.json({ message: "updated" })
    });
};