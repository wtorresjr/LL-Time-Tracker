"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hoursworked extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hoursworked.hasOne(models.client, {
        foreignKey: "id",
      });
      hoursworked.hasOne(models.employee, {
        foreignKey: "id",
      });
    }
  }
  hoursworked.init(
    {
      day_worked: {
        type: DataTypes.STRING,
      },
      start_time: {
        type: DataTypes.STRING,
      },
      end_time: {
        type: DataTypes.STRING,
      },
      total_hours: {
        type: DataTypes.DECIMAL,
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
      },
      clientId: {
        type: DataTypes.INTEGER,
      },
      employeeId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "hoursworked",
    }
  );
  return hoursworked;
};
