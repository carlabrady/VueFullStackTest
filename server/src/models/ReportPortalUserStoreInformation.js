module.exports = (sequelize, DataTypes) => {
    const ReportPortalUserStoreInformation = sequelize.define('ReportPortalUserStoreInformation', {
      ReportPortalUserStoreInformationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    }, {
      timestamps: false,
      freezeTableName: true
    })
      
    ReportPortalUserStoreInformation.associate = function (models) {
      ReportPortalUserStoreInformation.belongsTo(models.ReportPortalUser, {foreignKey: 'ReportPortalUserID'}),
      ReportPortalUserStoreInformation.belongsTo(models.StoreInformation, {foreignKey: 'StoreInformationID'})
    }
  
    return ReportPortalUserStoreInformation
  }