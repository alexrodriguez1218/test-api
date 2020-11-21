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

## Doc del api 😎

_El API cuenta con 5 endpoint_

```
  localhost:3000      |           |   URL donde esta corriendo el servicio
    /persons/         |   GET     |   Devuelve todos las persons registradas
    /persons/:id      |   GET     |   Devuelve los datos del usuario con id
    /Persons/add      |   POST    |   Registra a las persons
    /Persons/edit     |   PUT     |   Actualiza los datos de las persons
    /Persons/delete   |   DELETE  |   Elimina el registro de persons
```

_Formato de datos que recibe el api_

```
  /add
  {
    "person": {
        "fullname": "Alexander Rodriguez",
        "birth": "1989-12-18",
        "identification": "3254125",
        "type_identification": "CC"
    },
    "father": {
        "fullname": "Jhon Rodriguez",
        "birth": "1969-07-11",
        "identification": "9652214",
        "type_identification": "CC"
    },
    "mother": {
        "fullname": "Elizabeth Calixto",
        "birth": "1965-12-12",
        "identification": "6541258",
        "type_identification": "CC"
    }
  }

```

_**Nota** el api cuenta con una validacion, se envia padre o madre sin embargo no son obligatorios, el sistema valida que si la person no existe se debe registar, para este registro, es obligacion definir el fullname, identification, type_identification._
_La validacion principal del sistema se basa en la identification de 10 caracteres y el type_identification de 2 ya que pueden tener la probabilidad de un mismo documento con diferente tipo_

```
  /edit
  {
    "person": {
        "fullname": "Alexander Rodriguez --Update",
        "birth": "1980-01-20",
        "identification": "3254125",
        "type_identification": "CC"
    }
  }

```

```
  /delete
  {
    "person": {
        "identification": "3254125",
        "type_identification": "CC"
    }
  }

```

Gracias por la oportunidad
