const express = require("express");
const router = express.Router();
const { employee, hoursworked, client } = require("../../db/models");
const { Op, Sequelize } = require("sequelize");

router.get("/", async (req, res) => {
  if (req.user) {
    let { id } = req.user;
    const { dayStart, dayEnd } = req.query;
    const where = {};

    if (dayStart || dayEnd !== undefined) {
      if (dayStart && dayEnd) {
        where.day_worked = { [Op.between]: [dayStart, dayEnd] };
      } else {
        res
          .status(401)
          .json({ error: "You must choose both a start and end date" });
      }
    }

    let clientHours = await employee.findByPk(id, {
      include: {
        model: client,
        attributes: ["client_initials"],

        include: {
          model: hoursworked,
          attributes: ["day_worked", "total_hours"],
          where,
        },
      },

      attributes: ["firstName", "lastName"],
    });

    res.json(clientHours);
  } else {
    res.status(401).json({ error: "Unauthorized - Login to continue" });
  }
});

//Need to add logic to grab clientId from frontend when user makes a selection from clients drop down menu
router.post("/add-hours", async (req, res) => {
  const { day_worked, start_time, end_time, total_hours } = req.body;
  if (req.user) {
    const addedHours = await hoursworked.create({
      day_worked: day_worked,
      start_time: start_time,
      end_time: end_time,
      total_hours: total_hours,
      is_paid: false,
      clientId: 1,
      employeeId: req.user.id,
    });
    const clientAdded = await client.findByPk(1);
    res.json({
      message: `Successfully added hours for ${clientAdded.client_initials}`,
      Day: addedHours.day_worked,
      Total_Hours: addedHours.total_hours,
    });
  } else {
    res.status(401).json({ error: "Must be logged in to add hours" });
  }
});

module.exports = router;
// clientHours.clients.forEach((client) => {
//   client.hoursworkeds.forEach((ele) => {
//     console.log(ele.total_hours);
//   });
// });

// let array = [];

// clientHours.clients.forEach((client) => {
//   client.hoursworkeds.forEach((ele) => {

//     array.push(ele.total_hours);
//   });
// });
