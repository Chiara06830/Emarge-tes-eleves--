SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema zil3-zrelevach
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `zil3-zrelevach` DEFAULT CHARACTER SET utf8 ;
USE `zil3-zrelevach` ;

-- -----------------------------------------------------
-- Table `zil3-zrelevach`.`ENSEIGNANT`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `zil3-zrelevach`.`ENSEIGNANT` ;

CREATE TABLE IF NOT EXISTS `zil3-zrelevach`.`ENSEIGNANT` (
  `idEnseignant` INT NOT NULL AUTO_INCREMENT,
  `nomEnseignant` VARCHAR(45) NOT NULL,
  `prenomEnseignant` VARCHAR(45) NOT NULL,
  `adresseMail` VARCHAR(45) NOT NULL,
  `motDePasse` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEnseignant`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `zil3-zrelevach`.`UE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zil3-zrelevach`.`UE` ;

CREATE TABLE IF NOT EXISTS `zil3-zrelevach`.`UE` (
  `idUE` INT NOT NULL AUTO_INCREMENT,
  `nomUE` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUE`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `zil3-zrelevach`.`RELATION_UE_ENSEIGNANT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zil3-zrelevach`.`RELATION_UE_ENSEIGNANT` ;

CREATE TABLE IF NOT EXISTS `zil3-zrelevach`.`RELATION_UE_ENSEIGNANT` (
  `idRelationUEEnseignant` INT NOT NULL AUTO_INCREMENT,
  `unEnseignant` INT NULL,
  `uneUE` INT NULL,
  PRIMARY KEY (`idRelationUEEnseignant`),
  INDEX `fk_RELATION_UE_ENSEIGNANT_ENSEIGNANT_idx` (`unEnseignant` ASC),
  INDEX `fk_RELATION_UE_ENSEIGNANT_UE_idx` (`uneUE` ASC),
  CONSTRAINT `fk_RELATION_UE_ENSEIGNANT_ENSEIGNANT`
    FOREIGN KEY (`unEnseignant`)
    REFERENCES `zil3-zrelevach`.`ENSEIGNANT` (`idEnseignant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RELATION_UE_ENSEIGNANT_UE`
    FOREIGN KEY (`uneUE`)
    REFERENCES `zil3-zrelevach`.`UE` (`idUE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `zil3-zrelevach`.`FILIERE`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `zil3-zrelevach`.`FILIERE` ;

CREATE TABLE IF NOT EXISTS `zil3-zrelevach`.`FILIERE` (
  `idFiliere` INT NOT NULL AUTO_INCREMENT,
  `nomFiliere` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idFiliere`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `zil3-zrelevach`.`RELATION_UE_FILIERE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zil3-zrelevach`.`RELATION_UE_FILIERE` ;

CREATE TABLE IF NOT EXISTS `zil3-zrelevach`.`RELATION_UE_FILIERE` (
  `idRelationUEFiliere` INT NOT NULL AUTO_INCREMENT,
  `uneUE` INT NULL,
  `uneFiliere` INT NULL,
  PRIMARY KEY (`idRelationUEFiliere`),
  INDEX `fk_RELATION_UE_FILIERE_UE_idx` (`uneUE` ASC),
  INDEX `fk_RELATION_UE_FILIERE_FILIERE_idx` (`uneFiliere` ASC),
  CONSTRAINT `fk_RELATION_UE_FILIERE_UE`
    FOREIGN KEY (`uneUE`)
    REFERENCES `zil3-zrelevach`.`UE` (`idUE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RELATION_UE_FILIERE_FILIERE`
    FOREIGN KEY (`uneFiliere`)
    REFERENCES `zil3-zrelevach`.`FILIERE` (`idFiliere`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `zil3-zrelevach`.`GROUPE`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `zil3-zrelevach`.`GROUPE` ;

CREATE TABLE IF NOT EXISTS `zil3-zrelevach`.`GROUPE` (
  `idGroupe` INT NOT NULL AUTO_INCREMENT,
  `numGroupe` INT NOT NULL,
  `uneFiliere` INT NULL,
  PRIMARY KEY (`idGroupe`),
  INDEX `fk_GROUPE_FILiERE_idx` (`uneFiliere` ASC),
  CONSTRAINT `fk_GROUPE_FILiERE`
    FOREIGN KEY (`uneFiliere`)
    REFERENCES `zil3-zrelevach`.`FILIERE` (`idFiliere`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `zil3-zrelevach`.`ETUDIANT`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `zil3-zrelevach`.`ETUDIANT` ;

CREATE TABLE IF NOT EXISTS `zil3-zrelevach`.`ETUDIANT` (
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
    REFERENCES `zil3-zrelevach`.`GROUPE` (`idGroupe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `zil3-zrelevach`.`SEANCE`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `zil3-zrelevach`.`SEANCE` ;

CREATE TABLE IF NOT EXISTS `zil3-zrelevach`.`SEANCE` (
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
    REFERENCES `zil3-zrelevach`.`ENSEIGNANT` (`idEnseignant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SEANCE_UE`
    FOREIGN KEY (`uneUE`)
    REFERENCES `zil3-zrelevach`.`UE` (`idUE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SEANCE_GROUPE`
    FOREIGN KEY (`unGroupe`)
    REFERENCES `zil3-zrelevach`.`GROUPE` (`idGroupe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `zil3-zrelevach`.`TYPEPARTICIPATION`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `zil3-zrelevach`.`TYPEPARTICIPATION` ;

CREATE TABLE IF NOT EXISTS `zil3-zrelevach`.`TYPEPARTICIPATION` (
  `idType` INT NOT NULL AUTO_INCREMENT,
  `nomType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idType`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `zil3-zrelevach`.`PARTICIPATION`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `zil3-zrelevach`.`PARTICIPATION` ;

CREATE TABLE IF NOT EXISTS `zil3-zrelevach`.`PARTICIPATION` (
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
    REFERENCES `zil3-zrelevach`.`TYPEPARTICIPATION` (`idType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PARTICIPATION_ETUDIANT`
    FOREIGN KEY (`unEtudiant`)
    REFERENCES `zil3-zrelevach`.`ETUDIANT` (`idEtudiant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PARTICIPATION_SEANCE`
    FOREIGN KEY (`uneSeance`)
    REFERENCES `zil3-zrelevach`.`SEANCE` (`idSeance`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;