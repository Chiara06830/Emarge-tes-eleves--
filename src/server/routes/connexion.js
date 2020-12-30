var express = require('express');
var mysql = require('mysql');
const cors = require('cors');
var router = express();

const port = 5600;


// BDD  : définition
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'EfDWAnB98rnxyLO5',
    database: 'sauvegardeTesEleves'
});

//BDD : connexion
function getConnexion() {
    connection.connect(err => {
        if(err) {
            return "erreur à la connexion" + err;
        }
    });
}

//BDD : fermeture de la connexion
function deleteConnexion() { connection.end; }

router.use(cors());

// Connexion utilisateur
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


//Récupération de l'historique
router.get('/historique', function(req, res, next) {
    const {id} = req.query;

    getConnexion();

    let query = `SELECT SEANCE.idSeance AS id, UE.nomUE, SEANCE.type, FILIERE.nomFiliere, GROUPE.numGroupe AS numGroup, SEANCE.dateSeance, SEANCE.creneau 
        FROM SEANCE, UE, GROUPE, FILIERE 
        WHERE SEANCE.unGroupe = GROUPE.idGroupe AND SEANCE.uneUE = UE.idUE AND GROUPE.uneFiliere = FILIERE.idFiliere
        AND SEANCE.unEnseignant = ${id}`;

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.json(results);
    });
    
    deleteConnexion();
});


// Récupération de la scéance
router.get('/sceance', function(req, res, next) {
    const {id} = req.query;
    let info = {
        id: 0,
        nomUE : '',
        type :'',
        nomFiliere : '',
        numGroup : 0,
        dateSeance : '',
        creneau : '',
        nomEnseignant : "",
        prenomEnseignant : "",
        etudiant : ''
    }

    getConnexion();

    let query = `SELECT SEANCE.idSeance, UE.nomUE, SEANCE.type, FILIERE.nomFiliere, GROUPE.numGroupe, SEANCE.dateSeance, SEANCE.creneau, ENSEIGNANT.prenomEnseignant, ENSEIGNANT.nomEnseignant
    FROM SEANCE, UE, FILIERE, GROUPE, ENSEIGNANT
    WHERE UE.idUE = SEANCE.uneUE 
    AND FILIERE.idFiliere = GROUPE.uneFiliere AND GROUPE.idGroupe = SEANCE.unGroupe
    AND ENSEIGNANT.idEnseignant = SEANCE.unEnseignant
    AND SEANCE.idSeance = ${id}`;

    let query2 = `SELECT DISTINCT ETUDIANT.idEtudiant, ETUDIANT.nomEtudiant, ETUDIANT.prenomEtudiant,TYPEPARTICIPATION.nomType, ETUDIANT.photo
        FROM ETUDIANT, PARTICIPATION, TYPEPARTICIPATION, SEANCE
        WHERE SEANCE.unGroupe = ETUDIANT.unGroupe AND PARTICIPATION.unEtudiant = ETUDIANT.idEtudiant
        AND PARTICIPATION.uneSeance = SEANCE.idSeance AND TYPEPARTICIPATION.idType = PARTICIPATION.unTypeParticipation
        AND SEANCE.idSeance = ${id}`;

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        info['id'] = results[0].idSeance;
        info['nomUE'] = results[0].nomUE;
        info['type'] = results[0].type;
        info['nomFiliere'] = results[0].nomFiliere;
        info['numGroup'] = results[0].numGroupe;
        info['dateSeance'] = results[0].dateSeance;
        info['creneau'] = results[0].creneau;
        info['nomEnseignant'] = results[0].nomEnseignant;
        info['prenomEnseignant'] = results[0].prenomEnseignant;
        connection.query(query2, function (error, results, fields) {
            if (error) throw error;
            info['etudiant'] = results;
            return res.json(info);
        });
    });
    
    deleteConnexion();
});

//Récupération de l'adressse email 

router.get('/recovery',(req,res) =>{
    const {email} = req.query;

    getConnexion();

    let query =`SELECT ENSEIGNANT.idEnseignant
                FROM ENSEIGNANT
                WHERE adresseMail = "${email}"`;


    connection.query(query, function (error, results) {
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

//Changement du mot de passe : 
router.get('/updatePassword', (req,res)=>{
    const {identifiant, password} = req.query;

    let query = `UPDATE ENSEIGNANT
                 SET motDePasse = "${password}"
                 WHERE idEnseignant = "${identifiant}"`;


    connection.query(query, function(error, results){
        var data = true;
        if(error){
            data = false;
            throw error;
        }
        return res.json({
            data : data
        });
    });
    deleteConnexion();
});



router.listen(port, () =>{
    console.log(`Server demarrer sur le port ${port}`);
});
