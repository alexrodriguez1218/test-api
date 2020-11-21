CREATE DATABASE testApi;

use testApi;

CREATE TABLE IF NOT EXISTS `testApi`.`person` (
  `fullname` TEXT NOT NULL,
  `birth` DATE NOT NULL,
  `identification` INT(11) NOT NULL,
  `type_identification` VARCHAR(5) NOT NULL,
  `father` INT(11) NULL,
  `mother` INT(11) NULL,
  PRIMARY KEY (`identification`),
  INDEX `fk_person_person_idx` (`father` ASC),
  INDEX `fk_person_person1_idx` (`mother` ASC),
  CONSTRAINT `fk_person_person`
    FOREIGN KEY (`father`)
    REFERENCES `testApi`.`person` (`identification`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_person_person1`
    FOREIGN KEY (`mother`)
    REFERENCES `testApi`.`person` (`identification`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
