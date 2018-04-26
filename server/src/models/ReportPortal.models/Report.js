module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    ReportID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ReportName: {
      type: DataTypes.STRING(256),
      unique: true,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })

  Report.associate = (models) => {
    Report.hasMany(models.ReportAccessConfiguration, {
      as: 'Report',
      foreignKey: 'ReportID'
    })
  }

  return Report
}