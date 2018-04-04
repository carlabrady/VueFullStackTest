const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

app.get('/status', (req, res) => {
  res.sendStatus(200)
})

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// app.listen(process.env.PORT || config.port)

sequelize.sync()
  .then(() => {
    app.listen(process.env.port || config.port)
    console.log('Server started on port ' + config.port)
})
