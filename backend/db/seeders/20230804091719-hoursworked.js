"use strict";
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const seedHours = [
  {
    day_worked: "2023-08-01",
    start_time: "09:00:00",
    end_time: "17:00:00",
    total_hours: 8.0,
    is_paid: false,
    clientId: 1,
    employeeId: 1,
  },
  {
    day_worked: "2023-08-01",
    start_time: "10:30:00",
    end_time: "15:45:00",
    total_hours: 5.25,
    is_paid: false,
    clientId: 2,
    employeeId: 2,
  },
  {
    day_worked: "2023-08-01",
    start_time: "08:45:00",
    end_time: "14:00:00",
    total_hours: 5.25,
    is_paid: false,
    clientId: 3,
    employeeId: 3,
  },
  {
    day_worked: "2023-08-02",
    start_time: "12:00:00",
    end_time: "18:30:00",
    total_hours: 6.5,
    is_paid: false,
    clientId: 4,
    employeeId: 1,
  },
  {
    day_worked: "2023-08-02",
    start_time: "10:00:00",
    end_time: "14:30:00",
    total_hours: 4.5,
    is_paid: false,
    clientId: 5,
    employeeId: 2,
  },
  {
    day_worked: "2023-08-02",
    start_time: "09:30:00",
    end_time: "16:00:00",
    total_hours: 6.5,
    is_paid: false,
    clientId: 6,
    employeeId: 3,
  },
  {
    day_worked: "2023-08-03",
    start_time: "08:00:00",
    end_time: "16:00:00",
    total_hours: 8.0,
    is_paid: false,
    clientId: 7,
    employeeId: 1,
  },
  {
    day_worked: "2023-08-03",
    start_time: "09:45:00",
    end_time: "14:15:00",
    total_hours: 4.5,
    is_paid: false,
    clientId: 4,
    employeeId: 1,
  },
  {
    day_worked: "2023-08-03",
    start_time: "10:15:00",
    end_time: "17:30:00",
    total_hours: 7.25,
    is_paid: false,
    clientId: 9,
    employeeId: 3,
  },
  {
    day_worked: "2023-08-04",
    start_time: "11:30:00",
    end_time: "17:45:00",
    total_hours: 6.25,
    is_paid: false,
    clientId: 10,
    employeeId: 1,
  },
  {
    day_worked: "2023-08-04",
    start_time: "09:00:00",
    end_time: "14:30:00",
    total_hours: 5.5,
    is_paid: false,
    clientId: 11,
    employeeId: 2,
  },
  {
    day_worked: "2023-08-04",
    start_time: "08:45:00",
    end_time: "15:00:00",
    total_hours: 6.25,
    is_paid: false,
    clientId: 12,
    employeeId: 3,
  },
  {
    day_worked: "2023-08-05",
    start_time: "07:45:00",
    end_time: "15:45:00",
    total_hours: 8.0,
    is_paid: false,
    clientId: 13,
    employeeId: 1,
  },
  {
    day_worked: "2023-08-05",
    start_time: "10:30:00",
    end_time: "14:00:00",
    total_hours: 3.5,
    is_paid: false,
    clientId: 14,
    employeeId: 2,
  },
  {
    day_worked: "2023-08-05",
    start_time: "09:15:00",
    end_time: "17:45:00",
    total_hours: 8.5,
    is_paid: false,
    clientId: 15,
    employeeId: 3,
  },
  {
    day_worked: "2023-08-06",
    start_time: "09:30:00",
    end_time: "16:45:00",
    total_hours: 7.25,
    is_paid: false,
    clientId: 16,
    employeeId: 1,
  },
  {
    day_worked: "2023-08-06",
    start_time: "09:00:00",
    end_time: "15:00:00",
    total_hours: 6.0,
    is_paid: false,
    clientId: 17,
    employeeId: 2,
  },
  {
    day_worked: "2023-08-06",
    start_time: "08:15:00",
    end_time: "14:30:00",
    total_hours: 6.25,
    is_paid: false,
    clientId: 18,
    employeeId: 3,
  },
  {
    day_worked: "2023-08-07",
    start_time: "08:45:00",
    end_time: "16:00:00",
    total_hours: 7.25,
    is_paid: false,
    clientId: 19,
    employeeId: 1,
  },
  {
    day_worked: "2023-08-07",
    start_time: "10:15:00",
    end_time: "14:45:00",
    total_hours: 4.5,
    is_paid: false,
    clientId: 20,
    employeeId: 2,
  },
  {
    day_worked: "2023-08-07",
    start_time: "09:30:00",
    end_time: "18:00:00",
    total_hours: 8.5,
    is_paid: false,
    clientId: 21,
    employeeId: 3,
  },
  {
    day_worked: "2023-08-08",
    start_time: "09:30:00",
    end_time: "16:45:00",
    total_hours: 7.25,
    is_paid: false,
    clientId: 1,
    employeeId: 1,
  },
  {
    day_worked: "2023-08-08",
    start_time: "09:00:00",
    end_time: "15:00:00",
    total_hours: 6.0,
    is_paid: false,
    clientId: 2,
    employeeId: 2,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "hoursworkeds";
    return await queryInterface.bulkInsert(options, seedHours, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "hoursworkeds";
    return await queryInterface.bulkDelete(
      options,
      {
        employeeId: {
          [Op.in]: [4, 5, 6],
        },
      },
      {}
    );
  },
};
