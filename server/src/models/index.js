const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize1 = new Sequelize(
  config.db.database1,
  config.db.user,
  config.db.password,
  config.db.options
)
const sequelize2 = new Sequelize(
  config.db.database2,
  config.db.user,
  config.db.password,
  config.db.options
)

fs
  .readdirSync(path.join(__dirname, './ReportPortal.models'))
  .forEach((file) => {
    const model = sequelize1.import(path.join(__dirname, './ReportPortal.models', file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize1 = sequelize1
db.sequelize2 = sequelize2
db.Sequelize = Sequelize

module.exports = db
