const mongoose = require("mongoose");
const { userDetailsDB } = require("./db");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = userDetailsDB.model("User", UserSchema);