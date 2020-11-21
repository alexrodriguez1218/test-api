# Restful API, --- testApi ---, Creación de imagen en Docker hub

\_Proyecto de Restfull api, en donde se crea un CRUD, este proyecto se sirve bajo NODEJS, MYSQL

## Comenzando 🚀

_Como es de su conocimiento, se requiere tener instalado la ultima versión de Docker y Docker componse se puede descargar desde la página oficial haciendo click en el siguiente enlace_

- [Docker](https://www.docker.com/get-started) - Escoge la distribución o sistema operativo

### Instalación 🔧

_Clonamos el repositorio y nos aseguramos que estemos en la raiz_

```
git clone https://github.com/alexrodriguez1218/testapi.git
```

_ejecutamos_

```
docker-compose build
```

_siendo la primera vez que ejecutamos el proyecto primero debemos realizar la creacion de la base de datos por lo que ejecutamos para iniciar el servicio_

```
docker start mysql-database
```

_Ejecutamos el comando para acceder al Monitor de sql ingresamos la contraseña "secret"_

```
docker exec -it mysql-database mysql -p
```

_Ejecutamos el sentenicias de sql_

```
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
```

_Si prefiere tambien se puede realizar conexion con cualquier gestor de base de datos como workbench por medio del puerto 3306_

## Levantar servicios en el entorno de desarrollo ⚙️

_Una vez creada la base de datos y despues de cerrar el monitor con el comando exit, el debe ejecutar_

```
docker-compose build
docker-compose up
```

_Este proceso levantara el entorno de desarrollo_
_Este proyecto esta en DEV pero para cambiarlo solo basta con ajustar el fichero Dockerfile y remplazar los script_

```
CMD ["npm", "run", "dev"] => CMD ["npm", "start"]
```

Gracias por la oportunidad
