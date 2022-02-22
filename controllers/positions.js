const Position = require("../models/positions");

exports.getAllPositions = function (req, res, next) {
  Position.find({}, function (err, data) {
      console.log("err, data", err, data);
    if (err) {
      return next(err);
    }

    res.json(data);
  });
};

exports.addPosition = function (req, res, next) {
  const userId = req.user._id;
  const name = req.body.name;
  const category = req.body.category;
  const price = req.body.price;

  if (!userId || !name || !category || !price) {
    return res.status(422).send({ error: "Fill out data!" });
  }

  // See if a user with given email exists
  Position.findOne({ name: name }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Name is in use." });
    }

    // If a user with email does not exist, create and save
    const position = new Position({ userId, name, category, price });

    position.save(function (err) {
      if (err) {
        // If fail to save
        return next(err);
      }
    });

    // Respond to request indicating the user was created
    res.json({ created: position });
  });
};
