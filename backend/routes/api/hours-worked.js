const express = require("express");
const router = express.Router();
const { employee, hoursworked, client } = require("../../db/models");
const { Op, Sequelize } = require("sequelize");

router.get("/", async (req, res) => {
  try {
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
          // required: false,
          attributes: ["id", "client_initials", "hourly_rate"],

          include: {
            model: hoursworked,
            // required: false,
            attributes: ["day_worked", "total_hours", "id"],
            where,
          },
        },
        attributes: ["firstName", "lastName"],
      });

      let allPay = 0;

      for (let i = 0; i < clientHours.clients.length; i++) {
        let client = clientHours.clients[i];
        let hoursTab = 0;
        let hourlyRate = clientHours.clients[i].hourly_rate;

        for (let j = 0; j < client.hoursworkeds.length; j++) {
          let hours = client.hoursworkeds[j].total_hours;
          hoursTab += hours;
        }
        client.setDataValue("TotalClientHours", hoursTab);
        let payout = (hoursTab * hourlyRate).toFixed(2);
        allPay += (Number(payout));
        client.setDataValue("Total_Pay", (Number(payout)));
      }
      
      clientHours.setDataValue("All_Client_Pay", (Number(allPay)));
      
      res.status(200).json(clientHours);
      console.log("Client Hours Output", clientHours);
    } else {
      res.status(401).json({ error: "Unauthorized - Login to continue" });
    }
  } catch (err) {
    const errors = {};
    err.errors.map((err) => {
      errors[err.path] = err.message;
    });
    return res.status(400).json({ message: "Bad Request", errors });
  }
});

router.post("/add-hours/:clientId", async (req, res) => {
  const { clientId } = req.params;

  const { day_worked, start_time, end_time, total_hours } = req.body;
  try {
    if (req.user) {
      const addedHours = await hoursworked.create({
        day_worked: day_worked,
        start_time: start_time,
        end_time: end_time,
        total_hours: parseFloat(total_hours),
        clientId: parseInt(clientId),
        employeeId: req.user.id,
      });

      res.json({ newHoursAdded: addedHours });
    } else {
      res.status(401).json({ error: "Must be logged in to add hours" });
    }
  } catch (err) {
    const errors = [];
    err.errors.forEach((er) => {
      errors.push(er.message);
    });
    res.json(errors);
  }
});

module.exports = router;
