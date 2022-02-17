const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// On save hook
userSchema.pre("save", function (next) {
  const user = this;

  // Generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // Hash our password using the salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      // Overwrite plain text password with hashed pwd
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePasswords = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

// Create model class
const modelClass = mongoose.model("user", userSchema);

// Export model
module.exports = modelClass;
