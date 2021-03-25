USE `sauvegardeteseleves` ;

DELETE FROM RELATION_UE_ENSEIGNANT;
DELETE FROM RELATION_UE_FILIERE;
DELETE FROM PARTICIPATION;
DELETE FROM SEANCE;
DELETE FROM ENSEIGNANT;
DELETE FROM UE;
DELETE FROM ETUDIANT;
DELETE FROM GROUPE;
DELETE FROM FILIERE;
DELETE FROM TYPEPARTICIPATION;


-- -----------------------------------------------------
-- Table `emarget`.`ENSEIGNANT`
-- -----------------------------------------------------
INSERT INTO ENSEIGNANT (`idEnseignant`, `nomEnseignant`, `prenomEnseignant`, `adresseMail`, `motDePasse`)
    VALUES (1, "Joplin", "Janis", "Janis.Joplin@univ-brest.fr", "summerTime68");
INSERT INTO ENSEIGNANT (`idEnseignant`, `nomEnseignant`, `prenomEnseignant`, `adresseMail`, `motDePasse`)
    VALUES (2, "Dylan", "Bob", "Bob.Dylan@univ-brest.fr", "Hurrincan76");
INSERT INTO ENSEIGNANT (`idEnseignant`, `nomEnseignant`, `prenomEnseignant`, `adresseMail`, `motDePasse`)
    VALUES (3, "Hendrix", "Jimmy", "Jimmy.Hendrix@univ-brest.fr", "HeyJoe!");

-- -----------------------------------------------------
-- Table `emarget`.`UE`
-- -----------------------------------------------------
INSERT INTO UE (`idUE`, `nomUE`)
    VALUES (1, "Anglais");
INSERT INTO UE (`idUE`, `nomUE`)
    VALUES (2, "Philo");

-- -----------------------------------------------------
-- Table `emarget`.`RELATION_UE_ENSEIGNANT`
-- -----------------------------------------------------
INSERT INTO RELATION_UE_ENSEIGNANT (`idRelationUEEnseignant`, `unEnseignant`, `uneUE`)
    VALUES (1, 2, 1);
INSERT INTO RELATION_UE_ENSEIGNANT (`idRelationUEEnseignant`, `unEnseignant`, `uneUE`)
    VALUES (2, 1, 2);
INSERT INTO RELATION_UE_ENSEIGNANT (`idRelationUEEnseignant`, `unEnseignant`, `uneUE`)
    VALUES (3, 3, 2);

-- -----------------------------------------------------
-- Table `emarget`.`FILIERE`
-- -----------------------------------------------------
INSERT INTO FILIERE (`idFiliere`, `nomFiliere`)
    VALUES(1, "L3 Littérature Orientale");
INSERT INTO FILIERE (`idFiliere`, `nomFiliere`)
    VALUES(2, "M1 Art du spectacle");

-- -----------------------------------------------------
-- Table `emarget`.`RELATION_UE_FILIERE`
-- -----------------------------------------------------
INSERT INTO RELATION_UE_FILIERE (`idRelationUEFiliere`, `uneUE`, `uneFiliere`)
    VALUES (1, 1, 1);
INSERT INTO RELATION_UE_FILIERE (`idRelationUEFiliere`, `uneUE`, `uneFiliere`)
    VALUES (2, 2, 1);
INSERT INTO RELATION_UE_FILIERE (`idRelationUEFiliere`, `uneUE`, `uneFiliere`)
    VALUES (3, 1, 2);

-- -----------------------------------------------------
-- Table `emarget`.`GROUPE`
-- -----------------------------------------------------
INSERT INTO GROUPE (`idGroupe`, `numGroupe`, `uneFiliere`)
    VALUES(1, 1, 1);
INSERT INTO GROUPE (`idGroupe`, `numGroupe`, `uneFiliere`)
    VALUES(2, 1, 2);
INSERT INTO GROUPE (`idGroupe`, `numGroupe`, `uneFiliere`)
    VALUES(3, 2, 2);

-- -----------------------------------------------------
-- Table `emarget`.`ETUDIANT`
-- -----------------------------------------------------
INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES(1, "McCartney", "Paul", DATE("1942-06-18"), 2);
INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`, `photo`)
    VALUES(2, "Starr", "Ringo", DATE("1940-07-7"), 2, "ringo-starr-306872-1-402.jpeg");
INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES(3, "Lennon", "John", DATE("1940-10-9"), 2);
INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES(4, "Harrison", "George", DATE("1943-02-25"), 2);

INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES(5, "Jagger", "Mick", DATE("1942-06-26"), 3);
INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES(6, "Keith", "Richards", DATE("1943-12-8"), 3);
INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES(7, "Watts", "Charlie", DATE("1941-06-2"), 3);
INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES(8, "Wood", "Ron", DATE("1947-06-1"), 3);

INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES(9, "Barret", "Syd", DATE("1946-01-6"), 1);
INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`, `photo`)
    VALUES(10, "Gilmour", "David", DATE("1946-03-06"), 1, "gilmour.jpeg");
INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES(11, "Mason", "Nick", DATE("1944-01-27"), 1);
INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES(12, "Waters", "Roger", DATE("1943-09-6"), 1);
INSERT INTO ETUDIANT (`idEtudiant`, `nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES(13, "Wright", "Richard", DATE("1943-07-28"), 1);

-- -----------------------------------------------------
-- Table `emarget`.`SEANCE`
-- -----------------------------------------------------
INSERT INTO SEANCE (`idSeance`, `dateSeance`, `creneau`, `type`, `unEnseignant`, `uneUE`, `unGroupe`)
    VALUES (1, DATE("1969-01-30"), "20:00", "CM", 2, 1, 2);
INSERT INTO SEANCE (`idSeance`, `dateSeance`, `creneau`, `type`, `unEnseignant`, `uneUE`, `unGroupe`)
    VALUES (2, DATE("1980-12-8"), "20:00", "CM", 1, 2, 2);
INSERT INTO SEANCE (`idSeance`, `dateSeance`, `creneau`, `type`, `unEnseignant`, `uneUE`, `unGroupe`)
    VALUES (3, DATE("1994-08-11"), "20:00", "TP", 3, 2, 1);
INSERT INTO SEANCE (`idSeance`, `dateSeance`, `creneau`, `type`, `unEnseignant`, `uneUE`, `unGroupe`)
    VALUES (4, DATE("1969-08-12"), "20:00", "TP", 1, 2, 3);

-- -----------------------------------------------------
-- Table `emarget`.`TYPEPARTICIPATION`
-- -----------------------------------------------------
INSERT INTO TYPEPARTICIPATION (`idType`, `nomType`)
    VALUES (1, "Présent");
INSERT INTO TYPEPARTICIPATION (`idType`, `nomType`)
    VALUES (2, "Abscent");
INSERT INTO TYPEPARTICIPATION (`idType`, `nomType`)
    VALUES (3, "Abscent justifié");
INSERT INTO TYPEPARTICIPATION (`idType`, `nomType`)
    VALUES (4, "Covid");

-- -----------------------------------------------------
-- Table `emarget`.`PARTICIPATION`
-- -----------------------------------------------------
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (1, NULL, 1, 1, 1);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (2, NULL, 2, 2, 1);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (3, NULL, 1, 3, 1);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (4, NULL, 1, 4, 1);

INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (5, NULL, 1, 1, 2);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (6, NULL, 1, 2, 2);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (7, NULL, 1, 3, 2);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (8, NULL, 1, 4, 2);

INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (9, NULL, 1, 9, 3);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (10, "Certif", 2, 10, 3);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (11, NULL, 1, 11, 3);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (12, NULL, 1, 12, 3);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (13, NULL, 1, 13, 3);

INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (14, NULL, 1, 5, 4);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (15, NULL, 1, 6, 4);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (16, "covid contact", 3, 7, 4);
INSERT INTO PARTICIPATION (`idParticipation`, `commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (17, NULL, 1, 8, 4);