const mongoose = require("mongoose");
const { usersDB } = require("../db/db");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userId: {type: String, required: true, unique: true},
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = usersDB.model("User", UserSchema);