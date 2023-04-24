const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide email"],
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
  },
  role: {
    type: String,
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
