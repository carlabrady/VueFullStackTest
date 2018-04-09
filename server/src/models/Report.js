module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    ReportID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ReportName: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })
    
  Report.associate = function (models) {
  }

  return Report
}