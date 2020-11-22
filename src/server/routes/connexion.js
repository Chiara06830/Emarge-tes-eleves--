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

/* GET home page. */
router.get('/connexion', function(req, res, next) {
    getConnexion();

    connection.query('SELECT 5 AS valeur', function (error, results, fields) {
        if (error) throw error;
        console.log('le resultat de la requête est : ', results[0].valeur);
    }); 

    deleteConnexion();
});

module.exports = router;
