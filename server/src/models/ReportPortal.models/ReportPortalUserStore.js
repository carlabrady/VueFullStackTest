module.exports = (sequelize, DataTypes) => {
  const ReportPortalUserStore = sequelize.define('ReportPortalUserStore', {
    ReportPortalUserStoreID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ReportPortalUserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    StoreID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })
  ReportPortalUserStore.associate = (models) => {
    ReportPortalUserStore.belongsTo(models.ReportPortalUser, {
      foreignKey: 'ReportPortalUserID'
    })
    ReportPortalUserStore.hasMany(models.ReportAccessConfiguration, {
      as: 'ReportAccessConfiguration',
      foreignKey: 'ReportPortalUserStoreID'
    })
  }

  return ReportPortalUserStore
}