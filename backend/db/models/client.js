"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      client.belongsTo(models.employee, {
        foreignKey: "employeeId",
      });
      client.hasMany(models.hoursworked, {
        foreignKey: "clientId",
      });
    }
  }
  client.init(
    {
      client_initials: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 4],
          isUppercase: true,
        },
      },
      guardianName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guardianPhone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [12, 12],
          async checkIfUnique(val) {
            const foundDuplicate = await client.findOne({
              where: {
                [Op.and]: {
                  guardianPhone: val,
                  client_initials: this.client_initials,
                },
              },
            });
            if (foundDuplicate) {
              throw new Error("Cannot create duplicate client");
            }
          },
        },
      },
      hourly_rate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isFloat: true,
        },
      },
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "client",
      defaultScope: {
        attributes: ["client_initials"],
      },
    }
  );
  return client;
};
