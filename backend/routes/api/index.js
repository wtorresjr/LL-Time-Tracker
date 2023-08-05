const router = require("express").Router();
const loginRoute = require("./login");
const signUpRoute = require("./signup");
const hoursWorkedRouter = require("./hours-worked");
const addClientRouter = require("./client-data");
const { restoreUser } = require("../../utils/auth");

router.use(restoreUser);

router.use("/login", loginRoute);

router.use("/signup", signUpRoute);

router.use("/hours", hoursWorkedRouter);

router.use("/clients", addClientRouter);

router.get("/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
