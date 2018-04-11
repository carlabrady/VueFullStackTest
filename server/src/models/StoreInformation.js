module.exports = (sequelize, DataTypes) => {
    const StoreInformation = sequelize.define('StoreInformation', {
      StoreInformationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      StoreID: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
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
      timestamps: false,
      freezeTableName: true
    })
      
    StoreInformation.associate = function (models) {
    }
  
    return StoreInformation
  }