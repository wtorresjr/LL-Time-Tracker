const express = require("express");
const router = express.Router();
const { employee, client } = require("../../db/models");

router.get("/", async (req, res) => {
  if (req.user) {
    const userId = req.user.id;
    const usersClients = await employee.findByPk(userId, {
      include: {
        model: client,
        attributes: [
          "id",
          "guardianName",
          "guardianPhone",
          "client_initials",
          "hourly_rate",
        ],
      },
      // attributes: ["firstName", "lastName"],
    });
    res.json(usersClients);
  } else {
    res.status(401).json({ error: "You must login to view clients" });
  }
});

router.post("/add", async (req, res) => {
  const { initials, hourlyRate, guardianName, guardianPhone } = req.body;
  const userId = req.user.id;
  if (req.user) {
    let newClient = await client.create({
      client_initials: initials,
      guardianName: guardianName,
      guardianPhone: guardianPhone,
      hourly_rate: hourlyRate,
      employeeId: userId,
    });
    res.json({
      message: "Successfully created new client:",
      initials: newClient.client_initials,
      guardianName: newClient.guardianName,
      guardianContact: newClient.guardianPhone,
      hourly_rate: newClient.hourly_rate,
    });
  } else {
    res.status(401).json({ error: "You must login to add a new client" });
  }
});

module.exports = router;
