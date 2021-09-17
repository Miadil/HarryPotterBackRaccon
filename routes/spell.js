const express = require('express')
const mysql = require('../config/db')
const router = express.Router()

router.get('/', (req, res) => {
  //  find all spell and type
  const sql = `
		SELECT sp.*, spt.typeName
		FROM spell as sp
			Left join spellType as spt
				ON sp.spellType_id = spt.id`
  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database')
    } else {
      console.table(result)
      res.status(200).json(result)
    }
  })
})

router.get('/:id', (req, res) => {
  // find one spell and type
  console.log('spell/:id', req.params)
  const idSpell = req.params.id
  const sql = `
		SELECT sp.*, spt.typeName
		FROM spell as sp
			Left join spellType as spt
				ON sp.spellType_id = spt.id
		WHERE sp.id = ?`
  mysql.query(sql, [idSpell], (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database')
    } else {
      console.table(result)
      res.status(200).json(result)
    }
  })
})

module.exports = router
