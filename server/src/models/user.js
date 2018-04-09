const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 10

  if (!user.changed('Password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.Password, salt, null))
    .then(hash => {
      user.setDataValue('Password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const ReportPortalUser = sequelize.define('ReportPortalUser', {
    ReportPortalUserID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(128),
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
    timestamps: false,
    freezeTableName: true,
    hooks: {
      beforeSave: hashPassword
    }
  })

  ReportPortalUser.prototype.comparePassword = function (Password) {
    return bcrypt.compareAsync(Password, this.Password)
  }
    
  ReportPortalUser.associate = function (models) {
    ReportPortalUser.hasOne(models.ReportPortalUserRelation, {as: 'ParentID', foreignKey: 'ParentReportPortalUserID'});
    ReportPortalUser.hasOne(models.ReportPortalUserRelation, {as: 'ChildID', foreignKey: 'ChildReportPortalUserID'})
  }

  return ReportPortalUser
}

