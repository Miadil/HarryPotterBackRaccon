const express = require('express')
const mysql = require('../config/db')
const router = express.Router()

//find all spellType
router.get('/', (req, res) => {
  console.log('yolo')
  const sql = `SELECT * FROM spellType;`
  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database')
    } else {
      console.table(result)
      res.status(200).json(result)
    }
  })
})
//find one spellType
router.get('/:id', (req, res) => {
  const idSpellType = req.params.id
  const sql = `SELECT * FROM spellType WHERE id = ?`
  mysql.query(sql, idSpellType, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database')
    } else {
      console.table(result)
      res.status(200).json(result)
    }
  })
})
// add spellType
router.post('/', (req, res) => {
  const bodyData = [req.body.spellType]
  console.log(bodyData)
  const sql = `
		INSERT INTO spellType
		(typeName)
		VALUES (?)`
  mysql.query(sql, bodyData, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = router
