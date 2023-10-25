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
    hashedPassword: bcrypt.hashSync("password1"),
    firstName: "Will",
    lastName: "Torres",
    is_admin: true,
  },
  {
    email: "bella@gmail.com",
    hashedPassword: bcrypt.hashSync("password2"),
    firstName: "Isabella",
    lastName: "Howerton",
    is_admin: false,
  },
  {
    email: "elisabeth@gmail.com",
    hashedPassword: bcrypt.hashSync("password3"),
    firstName: "Elisabeth",
    lastName: "Hayes",
    is_admin: true,
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
