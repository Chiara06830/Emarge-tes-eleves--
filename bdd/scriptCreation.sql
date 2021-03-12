SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema emarget
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emarget` DEFAULT CHARACTER SET utf8 ;
USE `emarget` ;

-- -----------------------------------------------------
-- Table `emarget`.`ENSEIGNANT`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `emarget`.`ENSEIGNANT` ;

CREATE TABLE IF NOT EXISTS `emarget`.`ENSEIGNANT` (
  `idEnseignant` INT NOT NULL AUTO_INCREMENT,
  `nomEnseignant` VARCHAR(45) NOT NULL,
  `prenomEnseignant` VARCHAR(45) NOT NULL,
  `adresseMail` VARCHAR(45) NOT NULL,
  `motDePasse` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEnseignant`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emarget`.`UE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emarget`.`UE` ;

CREATE TABLE IF NOT EXISTS `emarget`.`UE` (
  `idUE` INT NOT NULL AUTO_INCREMENT,
  `nomUE` VARCHAR(45) NOT NULL,
  UNIQUE (nomUE),
  PRIMARY KEY (`idUE`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emarget`.`RELATION_UE_ENSEIGNANT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emarget`.`RELATION_UE_ENSEIGNANT` ;

CREATE TABLE IF NOT EXISTS `emarget`.`RELATION_UE_ENSEIGNANT` (
  `idRelationUEEnseignant` INT NOT NULL AUTO_INCREMENT,
  `unEnseignant` INT NULL,
  `uneUE` INT NULL,
  PRIMARY KEY (`idRelationUEEnseignant`),
  INDEX `fk_RELATION_UE_ENSEIGNANT_ENSEIGNANT_idx` (`unEnseignant` ASC),
  INDEX `fk_RELATION_UE_ENSEIGNANT_UE_idx` (`uneUE` ASC),
  CONSTRAINT `fk_RELATION_UE_ENSEIGNANT_ENSEIGNANT`
    FOREIGN KEY (`unEnseignant`)
    REFERENCES `emarget`.`ENSEIGNANT` (`idEnseignant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RELATION_UE_ENSEIGNANT_UE`
    FOREIGN KEY (`uneUE`)
    REFERENCES `emarget`.`UE` (`idUE`)
    ON UPDATE CASCADE ON DELETE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emarget`.`FILIERE`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `emarget`.`FILIERE` ;

CREATE TABLE IF NOT EXISTS `emarget`.`FILIERE` (
  `idFiliere` INT NOT NULL AUTO_INCREMENT,
  `nomFiliere` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idFiliere`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emarget`.`RELATION_UE_FILIERE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emarget`.`RELATION_UE_FILIERE` ;

CREATE TABLE IF NOT EXISTS `emarget`.`RELATION_UE_FILIERE` (
  `idRelationUEFiliere` INT NOT NULL AUTO_INCREMENT,
  `uneUE` INT NULL,
  `uneFiliere` INT NULL,
  PRIMARY KEY (`idRelationUEFiliere`),
  INDEX `fk_RELATION_UE_FILIERE_UE_idx` (`uneUE` ASC),
  INDEX `fk_RELATION_UE_FILIERE_FILIERE_idx` (`uneFiliere` ASC),
  CONSTRAINT `fk_RELATION_UE_FILIERE_UE`
    FOREIGN KEY (`uneUE`)
    REFERENCES `emarget`.`UE` (`idUE`)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `fk_RELATION_UE_FILIERE_FILIERE`
    FOREIGN KEY (`uneFiliere`)
    REFERENCES `emarget`.`FILIERE` (`idFiliere`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emarget`.`GROUPE`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `emarget`.`GROUPE` ;

CREATE TABLE IF NOT EXISTS `emarget`.`GROUPE` (
  `idGroupe` INT NOT NULL AUTO_INCREMENT,
  `numGroupe` INT NOT NULL,
  `uneFiliere` INT NULL,
  PRIMARY KEY (`idGroupe`),
  INDEX `fk_GROUPE_FILiERE_idx` (`uneFiliere` ASC),
  CONSTRAINT `fk_GROUPE_FILiERE`
    FOREIGN KEY (`uneFiliere`)
    REFERENCES `emarget`.`FILIERE` (`idFiliere`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emarget`.`ETUDIANT`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `emarget`.`ETUDIANT` ;

CREATE TABLE IF NOT EXISTS `emarget`.`ETUDIANT` (
  `idEtudiant` INT NOT NULL AUTO_INCREMENT,
  `nomEtudiant` VARCHAR(45) NOT NULL,
  `prenomEtudiant` VARCHAR(45) NOT NULL,
  `photo` VARCHAR(45) NULL,
  `dateNaissance` DATE NULL,
  `unGroupe` INT NULL,
  PRIMARY KEY (`idEtudiant`),
  INDEX `fk_ETUDIANT_GROUPE_idx` (`unGroupe` ASC),
  CONSTRAINT `fk_ETUDIANT_GROUPE`
    FOREIGN KEY (`unGroupe`)
    REFERENCES `emarget`.`GROUPE` (`idGroupe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emarget`.`SEANCE`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `emarget`.`SEANCE` ;

CREATE TABLE IF NOT EXISTS `emarget`.`SEANCE` (
  `idSeance` INT NOT NULL AUTO_INCREMENT,
  `dateSeance` DATE NOT NULL,
  `creneau` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `unEnseignant` INT NULL,
  `uneUE` INT NULL,
  `unGroupe` INT NULL,
  PRIMARY KEY (`idSeance`),
  INDEX `fk_SEANCE_ENSEIGNANT_idx` (`unEnseignant` ASC),
  INDEX `fk_SEANCE_UE_idx` (`uneUE` ASC),
  INDEX `fk_SEANCE_GROUPE_idx` (`unGroupe` ASC),
  CONSTRAINT `fk_SEANCE_ENSEIGNANT`
    FOREIGN KEY (`unEnseignant`)
    REFERENCES `emarget`.`ENSEIGNANT` (`idEnseignant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SEANCE_UE`
    FOREIGN KEY (`uneUE`)
    REFERENCES `emarget`.`UE` (`idUE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SEANCE_GROUPE`
    FOREIGN KEY (`unGroupe`)
    REFERENCES `emarget`.`GROUPE` (`idGroupe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emarget`.`TYPEPARTICIPATION`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `emarget`.`TYPEPARTICIPATION` ;

CREATE TABLE IF NOT EXISTS `emarget`.`TYPEPARTICIPATION` (
  `idType` INT NOT NULL AUTO_INCREMENT,
  `nomType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idType`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emarget`.`PARTICIPATION`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `emarget`.`PARTICIPATION` ;

CREATE TABLE IF NOT EXISTS `emarget`.`PARTICIPATION` (
  `idParticipation` INT NOT NULL AUTO_INCREMENT,
  `commentaire` VARCHAR(45) NULL,
  `unTypeParticipation` INT NULL,
  `unEtudiant` INT NULL,
  `uneSeance` INT NULL,
  PRIMARY KEY (`idParticipation`),
  INDEX `fk_PARTICIPATION_TYPEPARTICIPATION_idx` (`unTypeParticipation` ASC),
  INDEX `fk_PARTICIPATION_ETUDIANT_idx` (`unEtudiant` ASC),
  INDEX `fk_PARTICIPATION_SEANCE_idx` (`uneSeance` ASC),
  CONSTRAINT `fk_PARTICIPATION_TYPEPARTICIPATION`
    FOREIGN KEY (`unTypeParticipation`)
    REFERENCES `emarget`.`TYPEPARTICIPATION` (`idType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PARTICIPATION_ETUDIANT`
    FOREIGN KEY (`unEtudiant`)
    REFERENCES `emarget`.`ETUDIANT` (`idEtudiant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PARTICIPATION_SEANCE`
    FOREIGN KEY (`uneSeance`)
    REFERENCES `emarget`.`SEANCE` (`idSeance`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;