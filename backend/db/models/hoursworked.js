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
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: {
            args: true,
            msg: "day_worked Must be validate format YYYY-MM-DD",
          },
        },
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
          isFloat: {
            args: true,
            msg: `total_hours Must be a decimal`,
          },
        },
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      modelName: "Hoursworked",
      defaultScope: {
        attributes: ["day_worked", "start_time", "end_time", "total_hours"],
      },
    }
  );
  return hoursworked;
};
