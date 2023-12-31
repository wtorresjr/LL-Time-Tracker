const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { employee } = require("../../db/models");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

router.post("/", validateSignup, async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  try {
    const user = await employee.create({
      email,
      hashedPassword,
      firstName,
      lastName,
    });
    const safeUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    await setTokenCookie(res, safeUser);
    return res.json({
      user: safeUser,
    });
  } catch (err) {
    const errors = {};
    err.errors.map((err) => {
      errors[err.path] = err.message;
    });

    let custMessage = "";

    if (err.errors[0].validatorKey === "checkIfUnique") {
      custMessage = "User already exists";
      err.status = 500;
    } else {
      custMessage = "Bad Request";
      err.status = 400;
    }

    return res.status(err.status).json({ message: custMessage, errors });
  }
});

module.exports = router;
