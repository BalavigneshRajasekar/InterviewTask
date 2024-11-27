const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user", // default role for new users is 'user'
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = mongoose.model("User", User);

module.exports = UserSchema;
