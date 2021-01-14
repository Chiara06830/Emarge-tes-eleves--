var express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
var router = express();

const port = 5600;

const portDest = 5700
const host = "http://localhost";

router.use(cors()); 

//----------CONNEXION----------//

// Connexion utilisateur
router.get('/login', function(req, res, next) {
    const {identifiant, password} = req.query;

    fetch(`${host}:${portDest}/login?identifiant=${identifiant}&password=${password}`)
        .then(res => res.json())    
        .then(result => {
            return res.json({
                data : result.data
            });
        })
        .catch(err =>{if(err) throw err;});
});

//----------HISTORIQUE----------//

//Récupération de l'historique
router.get('/historique', function(req, res, next) {
    const {id} = req.query;

    fetch(`${host}:${portDest}/historique?id=${id}`)
        .then(res => res.json())    
        .then(result => {
            return res.json(result);
        })
        .catch(err =>{if(err) throw err;});
});

router.get('/sceance', function(req, res, next) {
    const {id} = req.query;
    let info;

    fetch(`${host}:${portDest}/sceance/info?id=${id}`)
        .then(res => res.json())    
        .then(result => {
            info = result;
            fetch(`${host}:${portDest}/sceance/etudiant?id=${id}&info=${info}`)
                .then(res => res.json())
                .then(result => {
                    info['etudiant'] = result;
                    return res.json(info);
                })
                .catch(err =>{if(err) throw err;});
        })
        .catch(err =>{if(err) throw err;});
});

//----------APPEL----------//

//mise a jour du commentaire en cas d'absence
router.get('/commentaire', function(req, res, next) {
    const {idSenace, idEtudiant, commentaire} = req.query;

    fetch(`${host}:${portDest}/commentaire?idSenace=${idSenace}&idEtudiant=${idEtudiant}&commentaire=${commentaire}`)
        .catch(err =>{if(err) throw err;});
});

//mise a jour du commentaire en cas d'absence
router.get('/getCommentaire', function(req, res, next) {
    const {idSenace, idEtudiant, commentaire} = req.query;

    fetch(`${host}:${portDest}/getCommentaire?idSenace=${idSenace}&idEtudiant=${idEtudiant}&commentaire=${commentaire}`)
        .then(res => res.json())    
        .then(result => {
            return res.json(result);
        })
        .catch(err =>{if(err) throw err;});
});

//mise a jour de la présence 
router.get('/presence', function (req, res, next) {
    const {idSeance, idEtudiant, valeur} = req.query;

    fetch(`${host}:${portDest}/getCommentaire?idSeance=${idSeance}&idEtudiant=${idEtudiant}&valeur=${valeur}`)
        .catch(err =>{if(err) throw err;});
});

//Supression d'un éléve du groupe
router.get('/suppression', function(req, res, next){
    const {idEtudiant, idSeance} = req.query;

    fetch(`${host}:${portDest}/suppression?idSeance=${idSeance}&idEtudiant=${idEtudiant}`)
        .catch(err =>{if(err) throw err;});
});

//----------MOT DE PASSE OUBLIE----------//

//récupération de la présence 
router.get('/getPresence', function (req, res, next) {
    const {idSeance, idEtudiant} = req.query;

    fetch(`${host}:${portDest}/getCommentaire?idSeance=${idSeance}&idEtudiant=${idEtudiant}`)
        .then(res => res.json())    
        .then(result => {
            return res.json(result);
        })
        .catch(err =>{if(err) throw err;});
});

//Récupération de l'adressse email 
router.get('/recovery',(req,res) =>{
    const {email} = req.query;

    fetch(`${host}:${portDest}/recovery?email=${email}`)
        .then(res => res.json())    
        .then(result => {
            return res.json({
                data : result.data
            });
        })
        .catch(err =>{if(err) throw err;});
});

//Changement du mot de passe : 
router.get('/updatePassword', (req,res)=>{
    const {identifiant, password} = req.query;

    fetch(`${host}:${portDest}/recovery?identifiant=${identifiant}&password=${password}`)
        .then(res => res.json())    
        .then(result => {
            return res.json({
                data : result.data
            });
        })
        .catch(err =>{if(err) throw err;});
});

//Selection des UE : 
router.get('/selectionUE', (req,res)=>{
    const {id} = req.query;

    fetch(`${host}:${portDest}/selectionUE?id=${id}`)
        .then(res => res.json())    
        .then(result => {
            return res.json({
                data : result.data
            });
        })
        .catch(err =>{if(err) throw err;});
});

//Selection des Groupe : 
router.get('/selectionGroupe', (req,res)=> {
    const {id} = req.query;

    fetch(`${host}:${portDest}/selectionGroupe?id=${id}`)
        .then(res => res.json())    
        .then(result => {
            return res.json({
                data : result.data
            });
        })
        .catch(err =>{if(err) throw err;});
});

//Selection étudiants : 
router.get('/selection', (req,res)=>{
    fetch(`${host}:${portDest}/selection/etudiant`)
        .then(res => res.json())
        .then(result => {
            return res.json({
                data : result.data
            })
        })
        .catch(err =>{if(err) throw err;});

});


router.get('/ajoutEtudiant',(req,res) =>{
    const{idEtudiant,idSeance} = req.query;

    fetch(`${host}:${portDest}/ajout?idEtudiant=${idEtudiant}&idSeance=${idSeance}`)
    .then(res => res.json())    
        .then(result => {
            return res.json({
                data : result.data
            });
        })
        .catch(err =>{if(err) throw err;});

});

//Création d'une séance : 
router.get('/creationSeance', (req,res)=> {
    const {nomUE, typeDeCours, groupe, date, creneau, id} = req.query; 

    // Vérification de non existance
    fetch(`${host}:${portDest}/verificationExistanceSeance?nomUE=${nomUE}&typeDeCours=${typeDeCours}&groupe=${groupe}&date=${date}&creneau=${creneau}&id=${id}`)
        .then(result => result.json())    
        .then(result => {
            if (result.data == 0) {
                // Ajout de la nouvelle séance
                fetch(`${host}:${portDest}/creationSeance?nomUE=${nomUE}&typeDeCours=${typeDeCours}&groupe=${groupe}&date=${date}&creneau=${creneau}&id=${id}`)
                    .then(result2 => result2.json())    
                    .then(result2 => {
                        // Recuperation de l'id de la seance crée
                        fetch(`${host}:${portDest}/retrouverMaSeance?nomUE=${nomUE}&typeDeCours=${typeDeCours}&groupe=${groupe}&date=${date}&creneau=${creneau}&id=${id}`)
                            .then(result3 => result3.json())    
                            .then(result3 => {
                                if (result3.data != -1) {
                                    // Ajout des participations
                                    fetch(`${host}:${portDest}/creationParticipation?groupe=${groupe}&uneSeance=${result3.data}`)
                                        .then(result5 => result5.json())    
                                        .then(result5 => {
                                            return res.json({
                                                data : result5
                                            });
                                        })
                                        .catch(err =>{if(err) throw err;});
                                }
                            })
                            .catch(err =>{if(err) throw err;});
                    })
                    .catch(err =>{if(err) throw err;});
            }
        })
        .catch(err =>{if(err) throw err;});
});

//Creation d'une UE : 
router.get('/creationUE', (req,res)=> {
    const {nomUE} = req.query;
    console.log(nomUE);
    fetch(`${host}:${portDest}/creationUE?nomUE=${nomUE}`)
        .then(res => res.json())    
        .then(result => {
            console.log(result);
            return res.json({
                data : result.data
            });
        })
        .catch(err =>{if(err) throw err;});
});

router.listen(port, () =>{
    console.log(`Server demarrer sur le port ${port}`);
});