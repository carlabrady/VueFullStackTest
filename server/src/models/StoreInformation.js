module.exports = (sequelize, DataTypes) => {
    const StoreInformation = sequelize.define('StoreInformation', {
      StoreInformationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      StoreID: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
      Brand: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      CustomerID: {
        type: DataTypes.INTEGER
      },
      SoftwareVersion: {
        type: DataTypes.STRING(32),
      },
      SquareFootage: {
        type: DataTypes.INTEGER
      },
      PointOfSaleQuantity: {
        type: DataTypes.INTEGER
      }
    }, {
      freezeTableName: true
    })
      
    StoreInformation.associate = function (models) {
    }
  
    return StoreInformation
  }