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
    guardianName: "John",
    guardianPhone: "111-111-1111",
  },
  {
    client_initials: "CGM",
    hourly_rate: 85.75,
    employeeId: 2,
    guardianName: "Jane",
    guardianPhone: "222-222-2222",
  },
  {
    client_initials: "RB",
    hourly_rate: 92.13,
    employeeId: 3,
    guardianName: "Michael",
    guardianPhone: "333-333-3333",
  },
  {
    client_initials: "JH",
    hourly_rate: 75.25,
    employeeId: 1,
    guardianName: "Sarah",
    guardianPhone: "444-444-4444",
  },
  {
    client_initials: "LK",
    hourly_rate: 102.8,
    employeeId: 2,
    guardianName: "David",
    guardianPhone: "555-555-5555",
  },
  {
    client_initials: "PR",
    hourly_rate: 55.4,
    employeeId: 3,
    guardianName: "Emily",
    guardianPhone: "666-666-6666",
  },
  {
    client_initials: "AWQ",
    hourly_rate: 35.9,
    employeeId: 1,
    guardianName: "William",
    guardianPhone: "777-777-7777",
  },
  {
    client_initials: "OP",
    hourly_rate: 67.1,
    employeeId: 2,
    guardianName: "Jessica",
    guardianPhone: "888-888-8888",
  },
  {
    client_initials: "BV",
    hourly_rate: 43.2,
    employeeId: 3,
    guardianName: "Robert",
    guardianPhone: "999-999-9999",
  },
  {
    client_initials: "ZM",
    hourly_rate: 28.6,
    employeeId: 1,
    guardianName: "Melissa",
    guardianPhone: "000-000-0000",
  },
  {
    client_initials: "DK",
    hourly_rate: 89.75,
    employeeId: 2,
    guardianName: "Christopher",
    guardianPhone: "123-456-7890",
  },
  {
    client_initials: "YXZ",
    hourly_rate: 72.4,
    employeeId: 3,
    guardianName: "Amanda",
    guardianPhone: "987-654-3210",
  },
  {
    client_initials: "QWE",
    hourly_rate: 68.9,
    employeeId: 1,
    guardianName: "Daniel",
    guardianPhone: "555-123-4567",
  },
  {
    client_initials: "FGH",
    hourly_rate: 48.3,
    employeeId: 2,
    guardianName: "Michelle",
    guardianPhone: "987-654-3210",
  },
  {
    client_initials: "TY",
    hourly_rate: 34.5,
    employeeId: 3,
    guardianName: "Kevin",
    guardianPhone: "777-888-9999",
  },
  {
    client_initials: "UI",
    hourly_rate: 37.2,
    employeeId: 1,
    guardianName: "Ashley",
    guardianPhone: "111-222-3333",
  },
  {
    client_initials: "SX",
    hourly_rate: 56.75,
    employeeId: 2,
    guardianName: "Ryan",
    guardianPhone: "444-555-6666",
  },
  {
    client_initials: "ZC",
    hourly_rate: 72.9,
    employeeId: 3,
    guardianName: "Rachel",
    guardianPhone: "888-777-6666",
  },
  {
    client_initials: "MN",
    hourly_rate: 65.1,
    employeeId: 1,
    guardianName: "Matthew",
    guardianPhone: "555-111-4444",
  },
  {
    client_initials: "VB",
    hourly_rate: 99.2,
    employeeId: 2,
    guardianName: "Stephanie",
    guardianPhone: "777-222-9999",
  },
  {
    client_initials: "PL",
    hourly_rate: 47.8,
    employeeId: 3,
    guardianName: "Andrew",
    guardianPhone: "123-555-9876",
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
