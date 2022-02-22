const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define model
const positionSchema = new Schema({
  userId: String,
  name: String,
  category: String,
  price: String,
});

// Create model class
const modelClass = mongoose.model("position", positionSchema);

// Export model
module.exports = modelClass;
