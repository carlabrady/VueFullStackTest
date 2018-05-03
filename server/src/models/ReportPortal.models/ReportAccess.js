module.exports = (sequelize, DataTypes) => {
  const ReportAccess = sequelize.define('ReportAccess', {
    ReportAccessID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ReportAccessConfigurationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AccessInstance: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })
  ReportAccess.associate = (models) => {
    ReportAccess.belongsTo(models.ReportAccessConfiguration, {
      as: 'ReportAccess',
      foreignKey: 'ReportAccessConfigurationID'
    })
  }

  return ReportAccess
}