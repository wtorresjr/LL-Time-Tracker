const express = require("express");
const router = express.Router();
const { employee, hoursworked, client } = require("../../db/models");
const { Op, Sequelize } = require("sequelize");

router.get("/admin-view", async (req, res) => {
  try {
    if (req.user && req.user.is_admin === true) {
      let employeeHours = await employee.findAll({
        include: {
          model: client,
          attributes: ["client_initials", "hourly_rate"],
          include: {
            model: hoursworked,
            attributes: ["day_worked", "total_hours"],
          },
        },
        attributes: ["id"],
      });

      let allEmployeePay = 0;
      let hoursBilled = 0;

      for (let i = 0; i < employeeHours.length; i++) {
        let employee = employeeHours[i];
        let totalEmployeePay = 0;

        for (let j = 0; j < employee.clients.length; j++) {
          let hourlyRate = employee.clients[j].hourly_rate;
          let clientHrs = 0;

          for (let k = 0; k < employee.clients[j].hoursworkeds.length; k++) {
            let hoursWkd = employee.clients[j].hoursworkeds[k];
            clientHrs += hoursWkd.total_hours;
            hoursBilled += hoursWkd.total_hours;
          }
          employee.clients[j].setDataValue("Hours_For_Client", clientHrs);
          let clientOwes = clientHrs * hourlyRate;
          totalEmployeePay += clientOwes;
          allEmployeePay += clientOwes;
          employee.clients[j].setDataValue(
            "Client_Owes",
            parseFloat(clientOwes.toFixed(2))
          );
        }
        employee.setDataValue("Total_Employee_Pay", totalEmployeePay);
      }

      const empHoursObj = {
        employeeHours,
        Avg_Tech_Cost: parseFloat((allEmployeePay / hoursBilled).toFixed(2)),
        Hours_To_Bill: parseFloat(hoursBilled.toFixed(2)),
        Owed_To_Employees: parseFloat(allEmployeePay.toFixed(2)),
      };

      res.status(200).json(empHoursObj);
    } else {
      res.status(403).json("User does NOT have admin rights!!!");
    }
  } catch (err) {
    let errors = [];

    if (err.errors) {
      errors = err.errors.map((er) => er.message);
    } else {
      errors.push(err.message);
    }

    res.json(errors);
  }
});

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
            // order: ["day_worked", "ASC"],
          },
        },
        attributes: ["firstName", "lastName"],
      });

      let allPay = 0;

      for (let i = 0; i < clientHours.clients.length; i++) {
        let client = clientHours.clients[i];
        let hoursTab = 0;
        let hourlyRate = clientHours.clients[i].hourly_rate;

        const sortedHours = client.hoursworkeds.sort(
          (a, b) => new Date(b.day_worked) - new Date(a.day_worked)
        );

        for (let j = 0; j < sortedHours.length; j++) {
          let hours = sortedHours[j].total_hours;
          // for (let j = 0; j < client.hoursworkeds.length; j++) {
          //   let hours = client.hoursworkeds[j].total_hours;
          hoursTab += parseFloat(hours);
        }
        client.setDataValue("TotalClientHours", hoursTab);
        let payout = parseFloat(hoursTab * hourlyRate).toFixed(2);
        allPay += parseFloat(payout);
        client.setDataValue("Total_Pay", parseFloat(payout));
      }

      clientHours.setDataValue("All_Client_Pay", parseFloat(allPay).toFixed(2));

      res.status(200).json(clientHours);
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

router.delete("/delete-hours/:hoursId", async (req, res) => {
  const { hoursId } = req.params;
  try {
    if (req.user) {
      const hoursToDelete = await hoursworked.findByPk(+hoursId, {
        attributes: ["id", "employeeId"],
      });
      if (hoursToDelete && hoursToDelete.employeeId === req.user.id) {
        await hoursToDelete.destroy();
        return res.status(200).json({ message: "Successfully deleted" });
      } else {
        return res.status(404).json({ message: "Record Not Found." });
      }
    }
  } catch (err) {
    console.log("Error from catch block", err);
    throw err;
  }
});

module.exports = router;
