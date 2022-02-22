var express = require("express");
var router = express.Router();
const passport = require("passport");
const passportService = require("../services/passport");

const requireAuth = passport.authenticate("jwt", { session: false }); // Middleware

/* GET users listing. */
router.get("/", requireAuth, function (req, res) {
  res.send({ hi: "Get posts" });
});

router.post("/add", requireAuth, function (req, res) {
  res.send({ hi: "Add post" });
});

module.exports = router;
