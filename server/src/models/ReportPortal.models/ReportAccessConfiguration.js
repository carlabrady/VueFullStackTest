module.exports = (sequelize, DataTypes) => {
  const ReportAccessConfiguration = sequelize.define('ReportAccessConfiguration', {
    ReportAccessConfigurationID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ReportID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ReportPortalUserStoreID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CanReceiveEmail: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    HasViewAccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })

  ReportAccessConfiguration.associate = (models) => {
    ReportAccessConfiguration.belongsTo(models.Report, {
      foreignKey: 'ReportID'
    })
    ReportAccessConfiguration.belongsTo(models.ReportPortalUserStore, {
      foreignKey: 'ReportPortalUserStoreID'
    })
    ReportAccessConfiguration.hasMany(models.ReportAccess, {
      foreignKey: 'ReportAccessConfigurationID'
    })
  }

  return ReportAccessConfiguration
}
