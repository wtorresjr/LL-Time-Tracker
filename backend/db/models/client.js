"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      client.hasMany(models.employee, {
        foreignKey: "id",
      });
    }
  }
  client.init(
    {
      client_initials: {
        type: DataTypes.STRING,
        validate: {
          checkLength(val) {
            if (val.length() > 4 || val.length() < 2) {
              throw new Error(
                "Client initials must be between 2 and 4 characters"
              );
            }
          },
        },
      },
      hourly_rate: {
        type: DataTypes.DECIMAL,
      },
      employeeId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "client",
    }
  );
  return client;
};
