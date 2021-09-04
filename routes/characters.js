const express = require('express')
const mysql = require('../config/db')
const router = express.Router()

router.get('/', (req, res) => {
  //   // All characters
  mysql.query(
    'SELECT ch.*, h.houseName  FROM characters as ch Left join houses as h on ch.houses_id = h.id;',
    (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving data from database')
      } else {
        console.table(result)
        res.status(200).json(result)
      }
    }
  )
})
router.post('/', (req, res) => {
  const bodyData = [
    req.body.firsname,
    req.body.actorName,
    req.body.image,
    req.body.house_id
  ]
  console.log(bodyData)
  mysql.query(
    'INSERT INTO `characters` (`name`, `actorName`, `image`, `houses_id`) VALUES (?, ?, ?, ?);',
    bodyData,
    (err, result) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).json(result)
      }
    }
  )
})

module.exports = router
