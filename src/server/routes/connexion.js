var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'motdepasse',
    database: 'sauvegardeteseleves'
});

function getConnexion() {
    connection.connect(err => {
        if(err) {
            return "erreur à la connexion" + err;
        }
    });
}

function deleteConnexion() { connection.end; }

router.get('/', function(req, res, next) {
    const {identifiant, password} = req.query;

    getConnexion();

    let query = `SELECT enseignant.idEnseignant
        FROM enseignant
        WHERE enseignant.adresseMail = "${identifiant}" AND enseignant.motDePasse = "${password}"`;

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if(results.length != 0){
            let id = results[0].idEnseignant
            console.log("ID user : " + id);
            return res.json({
                data : id
            });
        }
    }); 

    deleteConnexion();
});

module.exports = router;
