module.exports = (sequelize, DataTypes) => {
    const ReportAccessConfiguration = sequelize.define('ReportAccessConfiguration', {
      ReportAccessConfigurationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
      freezeTableName: true
    })
      
    ReportAccessConfiguration.associate = function (models) {
      ReportAccessConfiguration.belongsTo(models.ReportPortalUser, {foreignKey: 'ReportPortalUserID'}),
      ReportAccessConfiguration.belongsTo(models.Report, {foreignKey: 'ReportID'})
    }
  
    return ReportAccessConfiguration
  }