const { json } = require('express')
const express = require('express')
const router = express.Router()
const app = express()

const pool = require('../database')


router.get('/', (req, res) => {
  pool.query(`SELECT p.*,
      (SELECT sp.fullname FROM person sp WHERE sp.identification = p.father) AS fullnameFather,
      (SELECT sp.type_identification FROM person sp WHERE sp.identification = p.father) AS typeIdentificationFather,
      (SELECT sm.fullname FROM person sm WHERE sm.identification = p.mother) AS fullnameMother,
      (SELECT sm.type_identification FROM person sm WHERE sm.identification = p.mother) AS typeIdentificationMother
    FROM person p`, (err, rows, fields) => {
    if (!err) {
      res.json(rows)
    } else {
      console.error(err)
    }
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  pool.query(`SELECT p.*,
      (SELECT sp.fullname FROM person sp WHERE sp.identification = p.father) AS fullnameFather,
      (SELECT sp.type_identification FROM person sp WHERE sp.identification = p.father) AS typeIdentificationFather,
      (SELECT sm.fullname FROM person sm WHERE sm.identification = p.mother) AS fullnameMother,
      (SELECT sm.type_identification FROM person sm WHERE sm.identification = p.mother) AS typeIdentificationMother
      FROM person p
    WHERE identification = ?`, [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0])
    } else {
      console.error(err)
    }
  })
})


router.post('/add', (req, res) => {
  console.log(req.body)
  
  const { person, father, mother } = req.body
console.log(validData(father))

  if (validData(person, true) && validData(father) && validData(mother)) {
    father && insertPerson(father)
    mother && insertPerson(mother)
    insertPerson(person, father, mother)
    res.status(200).json({msj: 'La persona fue creada de forma correcta'})
  } else {
    res.send('la información suministrada no es correcta, verifique los datos y vuelva a intentar')
  }
})

router.put('/edit', (req, res) => {
  const { person  } = req.body

  if (validData(person, true)) {
    updatePerson(person)
    res.send('recived')
  } else {
    res.send('la información suministrada no es correcta, verifique los datos y vuelva a intentar')
  }
})

router.delete('/delete', (req, res) => {
  const { person } = req.body

  if (validData(person, true)) {
    deletePerson(person)
    res.send('recived')
  } else {
    res.status(500).json({msj: 'la información suministrada no es correcta, verifique los datos y vuelva a intentar'})
  }
})


const insertPerson = (person, father = {}, mother = {}) => {
  pool.query(`SELECT *
    FROM person
    WHERE identification = ? AND type_identification = ?`, [person.identification, person.type_identification], (err, rows, fields) => {
      if (!err) {
        if (rows.length == 0) {
          let fieldsQuery = 'fullname, birth, identification, type_identification, father, mother'
          let valuesQuery = [person.fullname, person.birth, person.identification, person.type_identification, father.identification, mother.identification]
            pool.query(`INSERT INTO person (${fieldsQuery}) VALUES (?, ?, ?, ?, ?, ?)`, valuesQuery, (err, rows, fields) => {

              if (!err) {
                console.log('Person created!')

              } else {
                console.log(err)
              }
            })
        }
      } else {
        console.error(err)
      }
  })
}

const updatePerson = (person) => {
  pool.query(`UPDATE person set fullname = ?, birth = ?
  WHERE identification = ? AND type_identification = ?`, [person.fullname, person.birth, person.identification, person.type_identification], (err, rows, fields) => {
      if (!err) {
        console.log('Person update!')
      } else {
        console.error(err)
      }
  })
}

const deletePerson = (person, id) => {
  pool.query(`DELETE person WHERE identification = ? AND type_identification = ?`, [person.identification, person.type_identification], (err, rows, fields) => {
      if (!err) {
        console.log('Person deleted!')
      } else {
        console.error(err)
      }
  })
}

const validData = (data, required = false) => {
  let control = true

  if (data) {

    control = (control && data.identification < 9999999999 && data.identification > 0)
    control = (control && data.fullname !== '' && data.fullname)
  } else {
    control = required ? false : true
  }
  
  return control
}

module.exports = router