const express = require('express')
const mysql = require('../config/db')
const router = express.Router()

// All characters
router.get('/', (req, res) => {
  const sql = `
	SELECT ch.*, h.houseName
	FROM characters as ch
		Left join houses as h
			ON ch.houses_id = h.id;`
  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database')
    } else {
      console.table(result)
      res.status(200).json(result)
    }
  })
})
// ONE character and spell
router.get('/:id', (req, res) => {
  console.log('characters/:id', req.params)
  const idCharacter = req.params.id
  const sql = `
	SELECT ch.*, h.houseName
	FROM characters as ch
		Left join houses as h
			ON ch.houses_id = h.id
	WHERE ch.id = ? ;` //recup all info character
  mysql.query(sql, [idCharacter], (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database')
    } else {
      const sql2 = `
				SELECT s.* , st.typeName 
				FROM characters_has_spell as chs
					join spell as s
						on chs.spell_id = s.id
					join spellType as st
						on s.spellType_id = st.id 
				where chs.characters_id = ? 
			` // recup all spell of one character
      mysql.query(sql2, [idCharacter], (err, result2) => {
        if (err) {
          res.status(500).send('Error retrieving data from database')
        } else {
          console.table(result)
          res.status(200).json({ result, result2 })
        }
      })
    }
  })
})
// POST ONE CHARACTER
router.post('/', (req, res) => {
  const bodyData = [
    req.body.firstname,
    req.body.actorName,
    req.body.image,
    req.body.houses_id
  ]
  console.log(req.body)
  const sql = `
  INSERT INTO characters
  (name, actorName, image, houses_id)
  VALUES (?, ?, ?, ?);`
  mysql.query(sql, bodyData, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      const idCharacter = result.insertId
      const spellData = req.body.spell.map(idSpell => [idCharacter, idSpell])
      console.log(spellData)
      const sql2 =
        'INSERT INTO characters_has_spell (`characters_id`, `spell_id`) VALUES ?'
      mysql.query(sql2, [spellData], (err, result2) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).json({ result, result2 })
        }
      })
    }
  })
})

module.exports = router
