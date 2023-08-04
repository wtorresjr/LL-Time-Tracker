"use strict";
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const seedUsers = [
  {
    email: "will@gmail.com",
    password: bcrypt.hashSync("password1"),
    firstName: "Will",
    lastName: "Torres",
  },
  {
    email: "bella@gmail.com",
    password: bcrypt.hashSync("password2"),
    firstName: "Isabella",
    lastName: "Howerton",
  },
  {
    email: "elisabeth@gmail.com",
    password: bcrypt.hashSync("password3"),
    firstName: "Elisabeth",
    lastName: "Hayes",
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "employees";
    return await queryInterface.bulkInsert(options, seedUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "employees";
    return await queryInterface.bulkDelete(
      options,
      {
        email: {
          [Op.in]: ["will@gmail.com", "bella@gmail.com", "elisabeth@gmail.com"],
        },
      },
      {}
    );
  },
};
