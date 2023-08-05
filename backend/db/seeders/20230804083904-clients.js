"use strict";
// const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const seedClients = [
  {
    client_initials: "EE",
    hourly_rate: 25.5,
    employeeId: 1,
  },
  {
    client_initials: "CGM",
    hourly_rate: 85.75,
    employeeId: 2,
  },
  {
    client_initials: "RB",
    hourly_rate: 92.13,
    employeeId: 3,
  },
  {
    client_initials: "JH",
    hourly_rate: 75.25,
    employeeId: 1,
  },
  {
    client_initials: "LK",
    hourly_rate: 102.8,
    employeeId: 2,
  },
  {
    client_initials: "PR",
    hourly_rate: 55.4,
    employeeId: 3,
  },
  {
    client_initials: "AWQ",
    hourly_rate: 35.9,
    employeeId: 1,
  },
  {
    client_initials: "OP",
    hourly_rate: 67.1,
    employeeId: 2,
  },
  {
    client_initials: "BV",
    hourly_rate: 43.2,
    employeeId: 3,
  },
  {
    client_initials: "ZM",
    hourly_rate: 28.6,
    employeeId: 1,
  },
  {
    client_initials: "DK",
    hourly_rate: 89.75,
    employeeId: 2,
  },
  {
    client_initials: "YXZ",
    hourly_rate: 72.4,
    employeeId: 3,
  },
  {
    client_initials: "QWE",
    hourly_rate: 68.9,
    employeeId: 1,
  },
  {
    client_initials: "FGH",
    hourly_rate: 48.3,
    employeeId: 2,
  },
  {
    client_initials: "TY",
    hourly_rate: 34.5,
    employeeId: 3,
  },
  {
    client_initials: "UI",
    hourly_rate: 37.2,
    employeeId: 1,
  },
  {
    client_initials: "SX",
    hourly_rate: 56.75,
    employeeId: 2,
  },
  {
    client_initials: "ZC",
    hourly_rate: 72.9,
    employeeId: 3,
  },
  {
    client_initials: "MN",
    hourly_rate: 65.1,
    employeeId: 1,
  },
  {
    client_initials: "VB",
    hourly_rate: 99.2,
    employeeId: 2,
  },
  {
    client_initials: "PL",
    hourly_rate: 47.8,
    employeeId: 3,
  },
  {
    client_initials: "JK",
    hourly_rate: 25.0,
    employeeId: 1,
  },
  {
    client_initials: "RE",
    hourly_rate: 109.5,
    employeeId: 2,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "clients";
    return await queryInterface.bulkInsert(options, seedClients, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "clients";
    return await queryInterface.bulkDelete(
      options,
      {
        employeeId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};
