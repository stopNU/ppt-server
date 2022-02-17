const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and username" });
  }

  // See if a user with given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use." });
    }

    // If a user with email does not exist, create and save
    const user = new User({ email, password });

    user.save(function (err) {
      if (err) {
        // If fail to save
        return next(err);
      }
    });

    // Respond to request indicating the user was created
    res.json({ token: tokenForUser(user) });
  });
};
