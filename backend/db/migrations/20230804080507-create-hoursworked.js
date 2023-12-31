"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "hoursworkeds",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        day_worked: {
          type: Sequelize.STRING,
        },
        start_time: {
          type: Sequelize.STRING,
        },
        end_time: {
          type: Sequelize.STRING,
        },
        total_hours: {
          type: Sequelize.DECIMAL,
        },
        is_paid: {
          type: Sequelize.BOOLEAN,
        },
        clientId: {
          type: Sequelize.INTEGER,
        },
        employeeId: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "hoursworkeds";
    await queryInterface.dropTable("hoursworkeds", options);
  },
};
