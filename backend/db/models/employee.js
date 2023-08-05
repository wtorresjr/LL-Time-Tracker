"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employee.hasMany(models.client, {
        foreignKey: "employeeId",
      });
    }
  }
  employee.init(
    {
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "employee",
      defaultScope: {
        attributes: {
          exclude: ["password", "email", "createdAt", "updatedAt"],
        },
      },
    }
  );
  return employee;
};
