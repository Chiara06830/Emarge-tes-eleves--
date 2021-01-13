var express = require('express');
var mysql = require('mysql');
const cors = require('cors');
var router = express();

const port = 5700;

// BDD  : définition
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'motdepasse',
    database: 'sauvegardeteseleves'
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
router.get('/sceance/info', function(req, res, next) {
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
        return res.json(info);
    }); 

    deleteConnexion();
});

router.get('/sceance/etudiant', function(req, res, next) {
    const {id, info} = req.query;

    getConnexion();

    let query = `SELECT DISTINCT ETUDIANT.idEtudiant, ETUDIANT.nomEtudiant, ETUDIANT.prenomEtudiant,TYPEPARTICIPATION.nomType, ETUDIANT.photo
        FROM ETUDIANT, PARTICIPATION, TYPEPARTICIPATION, SEANCE
        WHERE SEANCE.unGroupe = ETUDIANT.unGroupe AND PARTICIPATION.unEtudiant = ETUDIANT.idEtudiant
        AND PARTICIPATION.uneSeance = SEANCE.idSeance AND TYPEPARTICIPATION.idType = PARTICIPATION.unTypeParticipation
        AND SEANCE.idSeance = ${id}`;

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.json(results);
    });

    deleteConnexion();
});

//mise a jour du commentaire en cas d'absence
router.get('/commentaire', function(req, res, next) {
    const {idSenace, idEtudiant, commentaire} = req.query;

    getConnexion();

    let query = `UPDATE PARTICIPATION
        SET PARTICIPATION.commentaire = "${commentaire}"
        WHERE PARTICIPATION.unEtudiant = ${idEtudiant} AND PARTICIPATION.uneSeance = ${idSenace}`;

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
    });
    
    deleteConnexion();
});

//afficher le commentaire sauvegarder précédement
router.get('/getCommentaire', function(req, res, next) {
    const {idSenace, idEtudiant} = req.query;

    getConnexion();

    let query = `SELECT PARTICIPATION.commentaire
        FROM PARTICIPATION
        WHERE PARTICIPATION.unEtudiant = ${idEtudiant} AND PARTICIPATION.uneSeance = ${idSenace}`;

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.json(results);
    });
    
    deleteConnexion();
});

//mise a jour de la présence 
router.get('/presence', function (req, res, next) {
    const {idSeance, idEtudiant, valeur} = req.query;

    getConnexion();

    let query = `UPDATE PARTICIPATION
    SET PARTICIPATION.unTypeParticipation = ${valeur}
    WHERE PARTICIPATION.unEtudiant = ${idEtudiant} AND PARTICIPATION.uneSeance = ${idSeance}`;

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
    });

    deleteConnexion();
});

//récupération de la présence 
router.get('/getPresence', function (req, res, next) {
    const {idSeance, idEtudiant} = req.query;

    getConnexion();

    let query = `SELECT PARTICIPATION.unTypeParticipation
    FROM PARTICIPATION
    WHERE PARTICIPATION.unEtudiant = ${idEtudiant} AND PARTICIPATION.uneSeance = ${idSeance}`;

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.json(results);
    });

    deleteConnexion();
});

//Supression d'un éléve du groupe
router.get('/suppression', function(req, res, next){
    const {idEtudiant, idSeance} = req.query;

    getConnexion();

    let query =`DELETE FROM PARTICIPATION 
        WHERE PARTICIPATION.unEtudiant = ${idEtudiant} 
        AND PARTICIPATION.uneSeance = ${idSeance} `

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.json(results);
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

    getConnexion();

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

//Selection des UE : 
router.get('/selectionUE', (req,res)=>{
    const {id} = req.query;

    getConnexion();

    let query = `SELECT idUE,nomUE 
        FROM UE, RELATION_UE_ENSEIGNANT
        WHERE uneUE = idUE
        AND unEnseignant = ${id}`;

    connection.query(query, function(error, results) {
        var data = results;
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

//Selection des Groupe : 
router.get('/selectionGroupe', (req,res)=> {
    const {id} = req.query;

    getConnexion();

    let query = `SELECT GROUPE.idGroupe,GROUPE.numGroupe,FILIERE.nomFiliere
    FROM GROUPE, FILIERE, RELATION_UE_ENSEIGNANT, RELATION_UE_FILIERE
    WHERE GROUPE.uneFiliere = FILIERE.idFiliere
    AND RELATION_UE_ENSEIGNANT.unEnseignant = ${id}
    AND RELATION_UE_ENSEIGNANT.uneUE = RELATION_UE_FILIERE.uneUE
    AND RELATION_UE_FILIERE.uneFiliere = FILIERE.idFiliere`;

    connection.query(query, function(error, results) {
        var data = results;
        if(error) {
            data = false;
            throw error;
        }
        return res.json({
            data : data
        });
    });
    deleteConnexion();
});

//Création d'une séance : 
router.get('/creationSeance', (req,res)=> {
    const {nomUE, typeDeCours, groupe, date, creneau, id} = req.query; 

    getConnexion();

    let query = `INSERT INTO SEANCE 
    (dateSeance, creneau, type, unEnseignant, uneUE, unGroupe) 
    VALUES ('${date}', '${creneau}', '${typeDeCours}', '${id}', '${nomUE}', '${groupe}')`;

    connection.query(query, function(error, results) {
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

//Vérification de non existance de la séance : 
router.get('/verificationExistanceSeance', (req,res)=> {
    const {nomUE, typeDeCours, groupe, date, creneau, id} = req.query; 

    getConnexion();

    let query = `SELECT COUNT(*) AS nb
    FROM SEANCE 
    WHERE dateSeance = '${date}' AND creneau = '${creneau}' AND type = '${typeDeCours}' AND unEnseignant = ${id} AND uneUE = ${nomUE} AND unGroupe = ${groupe}`;
    
    connection.query(query, function(error, results) {
        var data = results[0].nb;
        if(error){
            data = -1;
            throw error;
        }
        return res.json({
            data : data
        });
    });
    deleteConnexion();
});

//Retrouver ma séance : 
router.get('/retrouverMaSeance', (req,res)=> {
    const {nomUE, typeDeCours, groupe, date, creneau, id} = req.query; 

    getConnexion();

    let query = `SELECT idSeance
    FROM SEANCE 
    WHERE dateSeance = '${date}' AND creneau = '${creneau}' AND type = '${typeDeCours}' AND unEnseignant = ${id} AND uneUE = ${nomUE} AND unGroupe = ${groupe}`;
    
    connection.query(query, function(error, results) {
        var data = results[0].idSeance;
        if(error){
            data = -1;
            throw error;
        }
        return res.json({
            data : data
        });
    });
    deleteConnexion();
});

//Création des participations : 
router.get('/creationParticipation', (req,res)=> {
    const {groupe, uneSeance} = req.query; 

    getConnexion();

    let query = `SELECT idEtudiant
    FROM ETUDIANT 
    WHERE unGroupe = ${groupe}`;
    
    connection.query(query, function(error, results) {
        var data = results;
        if(error){
            data = undefined;
            throw error;
        } else {
            let query2 = `INSERT INTO PARTICIPATION 
            (commentaire, unTypeParticipation, unEtudiant, uneSeance) VALUES `;
            let taille = results.length;
            for (let i = 0; i < taille; i++) {
                query2 = query2 + `(NULL, '2', '${results[i].idEtudiant}', '${uneSeance}'),`;
            }
            connection.query(query2.substring(0, (query2.length-1)), function(error, results) {
                var data2 = true;
                if(error){
                    data2 = false;
                    throw error;
                }
                return res.json({
                    data : data2
                });
            });
        }
    });
    deleteConnexion();
});

//Création d'une UE : 
router.get('/creationUE', (req,res)=> {
    const {nomUE} = req.query; 
    console.log(nomUE);

    getConnexion();

    /*let query = `INSERT INTO UE 
    (nomUE) 
    VALUES ('${nomUE}')`;*/
    let query = `REPLACE INTO UE
    SET nomUE = '${nomUE}'`;
    
    console.log(query);
    connection.query(query, function(error, results) {
        var data = results;
        console.log(results);
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
