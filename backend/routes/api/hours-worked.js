const express = require("express");
const router = express.Router();
const { employee, hoursworked, client, Sequelize } = require("../../db/models");
const { Op } = require("sequelize");

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
        model: hoursworked,
        attributes: ["day_worked", "start_time", "end_time", "total_hours"],
        include: { model: client, attributes: ["client_initials"] },
        where,
      },
      attributes: ["firstName", "lastName"],
    });
    res.json(clientHours);
  } else {
    res.status(401).json({ error: "Unauthorized - Login to continue" });
  }
});

module.exports = router;


