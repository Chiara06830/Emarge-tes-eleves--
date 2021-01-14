# Emarge tes élèves !!!
**Emarge tes élèves** est une application pour faire l'appel lors des cours données a l'UBO.
## Installation
Prérequis : 
- disposé d'une version de Node égal ou supérieure à la `v14.13.0`.
- disposé d'une version de MariaDB égal ou supérieure à la `v10.5.8`.
### Base de données
Dans le dossier `/bdd` il y a les deux scripts de création de la base de données :

- `scriptCreation.sql` à exécuter pour  créer les tables,
- `createDataTest.sql` à exécuter pour créer les données de testes.

### Application
Il faut installer les nodes modules du côté serveur et du côté client :
```bash
cd src/client
npm install
cd ../server
npm install
```
## Lancement
Pour lancer le serveur :
```bash
cd src/server
npm run server
```
Pour lancer le client :
```bash
cd src/client
npm run web
```
Cette commande va lancer la version web ainsi qu'une console. A partir de cette console il sera possible de lancer le client Android en cliquant sur le bouton `Run on Android device/Emulator`.

## Utilisations
Un enseignant peut :

- Se connecter;
- Changer son mot de passe;
- Créer une séance (UE, type de cours, groupe),
	- Ajouter une UE;
- Faire l'appel,
	- Consulter la photo d'un élève,
	- Choisir un type d'absence,
	- Laisser un commentaire sur la participation;
- Consulter l'historique des séances.

## Fonctionnalités à ajouter
- Exporter les données au format csv;
- Voir le nombre d'absence de l'étudiant,
	- Changer la couleur de l'étudiant, dans la liste d'appel, en fonction de son nombre d'absence;
- Enregistrer le nombre d'abscence non justifié,
	- pour chaque UE,
	- Globalement;
- Détecter les absences répéter.
