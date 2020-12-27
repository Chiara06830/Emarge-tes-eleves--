var express = require('express');
var mysql = require('mysql');
const cors = require('cors');
var router = express();

const port = 5600;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'nom_utilisateur_choisi',
    password: 'mot_de_passe_solide',
    database: 'zil3-zrelevach'
});

function getConnexion() {
    connection.connect(err => {
        if(err) {
            return "erreur à la connexion" + err;
        }
    });
}

function deleteConnexion() { connection.end; }

router.use(cors());

router.get('/login', function(req, res, next) {
    const {identifiant, password} = req.query;

    getConnexion();

    let query = `SELECT ENSEIGNANT.idEnseignant
        FROM ENSEIGNANT
        WHERE ENSEIGNANT.adresseMail = "${identifiant}" AND ENSEIGNANT.motDePasse = "${password}"`;

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        let id = -1;
        if(results.length != 0){
            id = results[0].idEnseignant
            console.log("ID user : " + id);
        }
        return res.json({
            data : id
        });
    }); 

    deleteConnexion();
});

router.listen(port, () =>{
    console.log(`Server demarrer sur le port ${port}`);
});
