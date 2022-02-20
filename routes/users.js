var express = require("express");
var router = express.Router();
const Auth = require("../controllers/auth");
const passport = require("passport");
const passportService = require("../services/passport");

const requireAuth = passport.authenticate("jwt", { session: false }); // Middleware
const requireSignin = passport.authenticate("local", { session: false });

/* GET users listing. */
router.get("/", requireAuth, function (req, res) {
  res.send({ hi: "there" });
});

router.post("/signin", requireSignin, Auth.signin);
router.post("/signup", Auth.signup);

module.exports = router;
