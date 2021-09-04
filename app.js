const connection = require('./config/db')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const routes = require('./routes/index')
const PORT = process.env.PORT || 4242

const app = express()
//connection Mysql
connection.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack)
  } else {
    console.log('connected to database with threadId :  ' + connection.threadId)
  }
})

// pre-route middlewares
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/characters', routes.characters)
app.use('/houses', routes.houses)

app.get('/', (req, res) => {
  res.status(200).send('je suis dans le /')
})

app.listen(PORT, console.log(`http://localhost:${PORT}`))
