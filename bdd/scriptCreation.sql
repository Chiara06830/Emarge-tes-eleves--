SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sauvegardeteseleves
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sauvegardeteseleves` DEFAULT CHARACTER SET utf8 ;
USE `sauvegardeteseleves` ;

-- -----------------------------------------------------
-- Table `sauvegardeteseleves`.`ENSEIGNANT`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `sauvegardeteseleves`.`ENSEIGNANT` ;

CREATE TABLE IF NOT EXISTS `sauvegardeteseleves`.`ENSEIGNANT` (
  `idEnseignant` INT NOT NULL AUTO_INCREMENT,
  `nomEnseignant` VARCHAR(45) NOT NULL,
  `prenomEnseignant` VARCHAR(45) NOT NULL,
  `adresseMail` VARCHAR(45) NOT NULL,
  `motDePasse` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEnseignant`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sauvegardeteseleves`.`UE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sauvegardeteseleves`.`UE` ;

CREATE TABLE IF NOT EXISTS `sauvegardeteseleves`.`UE` (
  `idUE` INT NOT NULL AUTO_INCREMENT,
  `nomUE` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUE`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sauvegardeteseleves`.`RELATION_UE_ENSEIGNANT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sauvegardeteseleves`.`RELATION_UE_ENSEIGNANT` ;

CREATE TABLE IF NOT EXISTS `sauvegardeteseleves`.`RELATION_UE_ENSEIGNANT` (
  `idRelationUEEnseignant` INT NOT NULL AUTO_INCREMENT,
  `unEnseignant` INT NULL,
  `uneUE` INT NULL,
  PRIMARY KEY (`idRelationUEEnseignant`),
  INDEX `fk_RELATION_UE_ENSEIGNANT_ENSEIGNANT_idx` (`unEnseignant` ASC),
  INDEX `fk_RELATION_UE_ENSEIGNANT_UE_idx` (`uneUE` ASC),
  CONSTRAINT `fk_RELATION_UE_ENSEIGNANT_ENSEIGNANT`
    FOREIGN KEY (`unEnseignant`)
    REFERENCES `sauvegardeteseleves`.`ENSEIGNANT` (`idEnseignant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RELATION_UE_ENSEIGNANT_UE`
    FOREIGN KEY (`uneUE`)
    REFERENCES `sauvegardeteseleves`.`UE` (`idUE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sauvegardeteseleves`.`FILIERE`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `sauvegardeteseleves`.`FILIERE` ;

CREATE TABLE IF NOT EXISTS `sauvegardeteseleves`.`FILIERE` (
  `idFiliere` INT NOT NULL AUTO_INCREMENT,
  `nomFiliere` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idFiliere`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sauvegardeteseleves`.`RELATION_UE_FILIERE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sauvegardeteseleves`.`RELATION_UE_FILIERE` ;

CREATE TABLE IF NOT EXISTS `sauvegardeteseleves`.`RELATION_UE_FILIERE` (
  `idRelationUEFiliere` INT NOT NULL AUTO_INCREMENT,
  `uneUE` INT NULL,
  `uneFiliere` INT NULL,
  PRIMARY KEY (`idRelationUEFiliere`),
  INDEX `fk_RELATION_UE_FILIERE_UE_idx` (`uneUE` ASC),
  INDEX `fk_RELATION_UE_FILIERE_FILIERE_idx` (`uneFiliere` ASC),
  CONSTRAINT `fk_RELATION_UE_FILIERE_UE`
    FOREIGN KEY (`uneUE`)
    REFERENCES `sauvegardeteseleves`.`UE` (`idUE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RELATION_UE_FILIERE_FILIERE`
    FOREIGN KEY (`uneFiliere`)
    REFERENCES `sauvegardeteseleves`.`FILIERE` (`idFiliere`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sauvegardeteseleves`.`GROUPE`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `sauvegardeteseleves`.`GROUPE` ;

CREATE TABLE IF NOT EXISTS `sauvegardeteseleves`.`GROUPE` (
  `idGroupe` INT NOT NULL AUTO_INCREMENT,
  `numGroupe` INT NOT NULL,
  `uneFiliere` INT NULL,
  PRIMARY KEY (`idGroupe`),
  INDEX `fk_GROUPE_FILiERE_idx` (`uneFiliere` ASC),
  CONSTRAINT `fk_GROUPE_FILiERE`
    FOREIGN KEY (`uneFiliere`)
    REFERENCES `sauvegardeteseleves`.`FILIERE` (`idFiliere`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sauvegardeteseleves`.`ETUDIANT`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `sauvegardeteseleves`.`ETUDIANT` ;

CREATE TABLE IF NOT EXISTS `sauvegardeteseleves`.`ETUDIANT` (
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
    REFERENCES `sauvegardeteseleves`.`GROUPE` (`idGroupe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sauvegardeteseleves`.`SEANCE`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `sauvegardeteseleves`.`SEANCE` ;

CREATE TABLE IF NOT EXISTS `sauvegardeteseleves`.`SEANCE` (
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
    REFERENCES `sauvegardeteseleves`.`ENSEIGNANT` (`idEnseignant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SEANCE_UE`
    FOREIGN KEY (`uneUE`)
    REFERENCES `sauvegardeteseleves`.`UE` (`idUE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SEANCE_GROUPE`
    FOREIGN KEY (`unGroupe`)
    REFERENCES `sauvegardeteseleves`.`GROUPE` (`idGroupe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sauvegardeteseleves`.`TYPEPARTICIPATION`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `sauvegardeteseleves`.`TYPEPARTICIPATION` ;

CREATE TABLE IF NOT EXISTS `sauvegardeteseleves`.`TYPEPARTICIPATION` (
  `idType` INT NOT NULL AUTO_INCREMENT,
  `nomType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idType`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `sauvegardeteseleves`.`PARTICIPATION`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `sauvegardeteseleves`.`PARTICIPATION` ;

CREATE TABLE IF NOT EXISTS `sauvegardeteseleves`.`PARTICIPATION` (
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
    REFERENCES `sauvegardeteseleves`.`TYPEPARTICIPATION` (`idType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PARTICIPATION_ETUDIANT`
    FOREIGN KEY (`unEtudiant`)
    REFERENCES `sauvegardeteseleves`.`ETUDIANT` (`idEtudiant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PARTICIPATION_SEANCE`
    FOREIGN KEY (`uneSeance`)
    REFERENCES `sauvegardeteseleves`.`SEANCE` (`idSeance`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;