// const {User} = require('../models')

module.exports = (sequelize, DataTypes) => {
  const ReportPortalUser = sequelize.define('ReportPortalUser', {
    ReportPortalUserID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    IsUserAdministrator: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    IsStoreAdministrator: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    freezeTableName: true,
  })

  return ReportPortalUser
}

