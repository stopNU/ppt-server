const Auth = require("./controllers/auth");
const passport = require("passport");
const passportService = require("./services/passport");

const requireAuth = passport.authenticate("jwt", { session: false }); // Middleware
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  app.get("/", requireAuth, function (req, res) {
    res.send({ hi: "there" });
  });
  app.post("/signin", requireSignin, Auth.signin);
  app.post("/signup", Auth.signup);
};
