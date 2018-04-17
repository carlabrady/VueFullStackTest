module.exports = (sequelize, DataTypes) => {
    const ReportPortalUserStoreInformation = sequelize.define('ReportPortalUserStoreInformation', {
      ReportPortalUserStoreInformationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      StoreID: {
        type: DataTypes.INTEGER,
        allowNull: false

      }
    }, {
      timestamps: false,
      freezeTableName: true
    })
      
    ReportPortalUserStoreInformation.associate = (models) => {
      ReportPortalUserStoreInformation.belongsTo(models.ReportPortalUser, {
        foreignKey: 'ReportPortalUserID',
        allowNull: false
      })
      // ReportPortalUserStoreInformation.belongsTo(models.StoreInformation, {
      //   foreignKey: 'StoreID'
      // })
    }
  
    return ReportPortalUserStoreInformation
  }