const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const {sequelize1, sequelize2} = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')

require('./routes')(app)

sequelize1.sync()
  .then(() => {
    sequelize2.sync()
      .then(() => {
        app.listen(process.env.PORT || config.port)
        console.log(`Server started on port ${config.port}`)
      })
  })
