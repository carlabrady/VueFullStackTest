module.exports = (sequelize2, DataTypes) => {
  const Stores = sequelize2.define('Stores', {
    StoreID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    CustomerID: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    freezeTableName: true
  })

  return Stores
}
