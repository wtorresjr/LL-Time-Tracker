const express = require("express");
const router = express.Router();
const { employee, hoursworked, client } = require("../../db/models");

router.get("/", async (req, res) => {
  if (req.user) {
    console.log("Req user body", req.user);
    let { id } = req.user;

    let clientHours = await employee.findByPk(id, {
      include: {
        model: hoursworked,
        attributes: ["day_worked", "start_time", "end_time", "total_hours"],
      },
    });
    // let clientHours = await hoursworked.findAll({
    //   where: {
    //     employeeId: id,
    //   },
    // });
    res.json(clientHours);
  } else {
    res.status(401).json({ error: "Unauthorized - Login to continue" });
  }
});

module.exports = router;
