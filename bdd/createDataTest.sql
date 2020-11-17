-- -----------------------------------------------------
-- Table `sauvegardeTesEleves`.`ENSEIGNANT`
-- -----------------------------------------------------
INSERT INTO ENSEIGNANT (`nomEnseignant`, `prenomEnseignant`, `adresseMail`, `motDePasse`)
    VALUES ("Joplin", "Janis", "Janis.Joplin@univ-brest.fr", "summerTime68");
INSERT INTO ENSEIGNANT (`nomEnseignant`, `prenomEnseignant`, `adresseMail`, `motDePasse`)
    VALUES ("Dylan", "Bob", "Bob.Dylan@univ-brest.fr", "Hurrincan76");
INSERT INTO ENSEIGNANT (`nomEnseignant`, `prenomEnseignant`, `adresseMail`, `motDePasse`)
    VALUES ("Hendrix", "Jimmy", "Jimmy.Hendrix@univ-brest.fr", "HeyJoe!");

-- -----------------------------------------------------
-- Table `sauvegardeTesEleves`.`UE`
-- -----------------------------------------------------
INSERT INTO UE (`nomUE`)
    VALUES ("Anglais");
INSERT INTO UE (`nomUE`)
    VALUES ("Philo");

-- -----------------------------------------------------
-- Table `sauvegardeTesEleves`.`RELATION_UE_ENSEIGNANT`
-- -----------------------------------------------------
INSERT INTO RELATION_UE_ENSEIGNANT (`unEnseignant`, `uneUE`)
    VALUES (2, 1);
INSERT INTO RELATION_UE_ENSEIGNANT (`unEnseignant`, `uneUE`)
    VALUES (1, 2);
INSERT INTO RELATION_UE_ENSEIGNANT (`unEnseignant`, `uneUE`)
    VALUES (3, 2);

-- -----------------------------------------------------
-- Table `sauvegardeTesEleves`.`FILIERE`
-- -----------------------------------------------------
INSERT INTO FILIERE (`nomFiliere`)
    VALUES("L3 Littérature Orientale");
INSERT INTO FILIERE (`nomFiliere`)
    VALUES("M1 Art du spectacle");

-- -----------------------------------------------------
-- Table `sauvegardeTesEleves`.`RELATION_UE_FILIERE`
-- -----------------------------------------------------
INSERT INTO RELATION_UE_FILIERE (`uneUE`, `uneFiliere`)
    VALUES (1, 1);
INSERT INTO RELATION_UE_FILIERE (`uneUE`, `uneFiliere`)
    VALUES (2, 1);
INSERT INTO RELATION_UE_FILIERE (`uneUE`, `uneFiliere`)
    VALUES (1, 2);

-- -----------------------------------------------------
-- Table `sauvegardeTesEleves`.`GROUPE`
-- -----------------------------------------------------
INSERT INTO GROUPE (`numGroupe`, `uneFiliere`)
    VALUES(1, 1);
INSERT INTO GROUPE (`numGroupe`, `uneFiliere`)
    VALUES(1, 2);
INSERT INTO GROUPE (`numGroupe`, `uneFiliere`)
    VALUES(2, 2);

-- -----------------------------------------------------
-- Table `sauvegardeTesEleves`.`ETUDIANT`
-- -----------------------------------------------------
INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("McCartney", "Paul", DATE("1942-06-18"), 2);
INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("Starr", "Ringo", DATE("1940-07-7"), 2);
INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("Starr", "Ringo", DATE("1940-10-9"), 2);
INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("Harrison", "George", DATE("1943-02-25"), 2);

INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("Jagger", "Mick", DATE("1942-06-26"), 3);
INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("Keith", "Richards", DATE("1943-12-8"), 3);
INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("Watts", "Charlie", DATE("1941-06-2"), 3);
INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("Wood", "Ron", DATE("1947-06-1"), 3);

INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("Barret", "Syd", DATE("1946-01-6"), 1);
INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("Gilmour", "David", DATE("1946-03-06"), 1);
INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("Mason", "Nick", DATE("1944-01-27"), 1);
INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("Waters", "Roger", DATE("1943-09-6"), 1);
INSERT INTO ETUDIANT (`nomEtudiant`, `prenomEtudiant`, `dateNaissance`, `unGroupe`)
    VALUES("Wright", "Richard", DATE("1943-07-28"), 1);

-- -----------------------------------------------------
-- Table `sauvegardeTesEleves`.`SEANCE`
-- -----------------------------------------------------
INSERT INTO SEANCE (`dateSeance`, `creneau`, `type`, `unEnseignant`, `uneUE`, `unGroupe`)
    VALUES (DATE("1969-01-30"), "20:00", "CM", 2, 1, 2);
INSERT INTO SEANCE (`dateSeance`, `creneau`, `type`, `unEnseignant`, `uneUE`, `unGroupe`)
    VALUES (DATE("1980-12-8"), "20:00", "CM", 1, 2, 2);
INSERT INTO SEANCE (`dateSeance`, `creneau`, `type`, `unEnseignant`, `uneUE`, `unGroupe`)
    VALUES (DATE("1994-08-11"), "20:00", "TP", 3, 2, 1);
INSERT INTO SEANCE (`dateSeance`, `creneau`, `type`, `unEnseignant`, `uneUE`, `unGroupe`)
    VALUES (DATE("1969-08-12"), "20:00", "TP", 1, 2, 3);

-- -----------------------------------------------------
-- Table `sauvegardeTesEleves`.`TYPEPARTICIPATION`
-- -----------------------------------------------------
INSERT INTO TYPEPARTICIPATION (`nomType`)
    VALUES ("Présent");
INSERT INTO TYPEPARTICIPATION (`nomType`)
    VALUES ("Abscent");
INSERT INTO TYPEPARTICIPATION (`nomType`)
    VALUES ("Abscent justifié");
INSERT INTO TYPEPARTICIPATION (`nomType`)
    VALUES ("Covid");

-- -----------------------------------------------------
-- Table `sauvegardeTesEleves`.`PARTICIPATION`
-- -----------------------------------------------------
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 1, 1);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 2, 2, 1);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 3, 1);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 4, 1);

INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 1, 2);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 2, 2);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 3, 2);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 4, 2);

INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 9, 3);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES ("Certif", 2, 10, 3);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 11, 3);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 12, 3);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 13, 3);

INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 5, 4);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 6, 4);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES ("covid contact", 3, 7, 4);
INSERT INTO PARTICIPATION (`commentaire`, `unTypeParticipation`, `unEtudiant`, `uneSeance`)
    VALUES (NULL, 1, 8, 4);