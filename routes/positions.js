var express = require("express");
var router = express.Router();
const passport = require("passport");
const { addPosition, getAllPositions } = require("../controllers/positions");
const passportService = require("../services/passport");

const requireAuth = passport.authenticate("jwt", { session: false }); // Middleware

/* GET users listing. */
router.get("/", requireAuth, getAllPositions);

router.post("/add", requireAuth, addPosition);

module.exports = router;
