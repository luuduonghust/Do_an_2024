const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var addressSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Address", addressSchema);
