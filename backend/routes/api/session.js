const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { employee } = require("../../db/models");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

// Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await employee.unscoped().findOne({
    where: {
      email: credential,
    },
  });

  if (!user || !bcrypt.compareSync(password, user.password.toString())) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = { credential: "The provided credentials were invalid." };
    return next(err);
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  // console.log("Safe USER Before", safeUser);

  setTokenCookie(res, safeUser);

  // console.log("Safe USER After token", safeUser);
  return res.json({
    user: safeUser,
  });
});

router.get("/", (req, res) => {
  console.log(req);
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
