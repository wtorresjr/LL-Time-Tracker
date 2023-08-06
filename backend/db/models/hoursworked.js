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
      hoursworked.belongsTo(models.client, {
        foreignKey: "clientId",
      });
      hoursworked.belongsTo(models.employee, {
        foreignKey: "employeeId",
      });
    }
  }
  hoursworked.init(
    {
      day_worked: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_hours: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isFloat: true,
        },
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "hoursworked",
      defaultScope: {
        attributes: ["day_worked", "start_time", "end_time", "total_hours"],
      },
    }
  );
  return hoursworked;
};
