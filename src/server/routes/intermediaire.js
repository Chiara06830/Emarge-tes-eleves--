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

router.listen(port, () =>{
    console.log(`Server demarrer sur le port ${port}`);
});