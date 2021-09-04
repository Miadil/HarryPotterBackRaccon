const express = require('express')
const mysql = require('../config/db')
const router = express.Router()

router.get('/', (req, res) => {
  //   // All Houses
  mysql.query('SELECT * FROM houses', (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database')
    } else {
      console.table(result)
      res.status(200).json(result)
    }
  })
})
router.post('/', (req, res) => {
  const houseName = req.body.houseName
  console.log(houseName)
  mysql.query(
    'INSERT INTO `houses` (`houseName`) VALUES (?);',
    [houseName],
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
