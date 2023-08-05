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
      employee.hasMany(models.hoursworked, {
        foreignKey: "employeeId",
      });
    }
  }
  employee.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          async checkIfUnique(emailAddy) {
            const existingUsers = await employee.findOne({
              where: { email: emailAddy },
            });
            if (existingUsers) {
              throw new Error(
                "Email already exists, please login with your account or contact admin for help."
              );
            }
          },
        },
      },
      hashedPassword: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
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
