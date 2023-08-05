const router = require("express").Router();
const loginRoute = require("./login");
const signUpRoute = require("./signup");
const clientRouter = require("./client-hours");
const { restoreUser } = require("../../utils/auth");

router.use(restoreUser);

router.use("/login", loginRoute);

router.use("/signup", signUpRoute);

router.use("/client-hours", clientRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

router.get("/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
