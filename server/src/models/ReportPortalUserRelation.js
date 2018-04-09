module.exports = (sequelize, DataTypes) => {
    const ReportPortalUserRelation = sequelize.define('ReportPortalUserRelation', {
      ReportPortalUserRelationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    }, {
      timestamps: false,
      freezeTableName: true
    })
      
    ReportPortalUserRelation.associate = function (models) {
    }
  
    return ReportPortalUserRelation
  }