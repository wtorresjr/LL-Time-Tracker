const router = require("express").Router();
const sessionRouter = require("./session");
const usersRouter = require("./users");
const clientRouter = require("./client-hours");
const { restoreUser } = require("../../utils/auth");

router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

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
