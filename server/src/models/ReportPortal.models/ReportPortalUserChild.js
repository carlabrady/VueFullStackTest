module.exports = (sequelize, DataTypes) => {
  const ReportPortalUserChild = sequelize.define('ReportPortalUserChild', {
    ReportPortalUserChildID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ReportPortalUserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ChildID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })

  ReportPortalUserChild.associate = function (models) {
    ReportPortalUserChild.belongsTo(models.ReportPortalUser, {
      foreignKey: 'ReportPortalUserID',
    })
    ReportPortalUserChild.belongsTo(models.ReportPortalUser, {
      foreignKey: 'ChildID',
    })
  }

  return ReportPortalUserChild
}