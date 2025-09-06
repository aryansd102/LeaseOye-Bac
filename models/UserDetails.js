const mongoose = require("mongoose");
const { userDetailsDB } = require("../db/db");

const UserDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: {type: Number, required: true},
  birthday: {type: Date},
  userId: {type: String, required: true, unique: true},
  userType: {type: String}
}, { timestamps: true });

module.exports = userDetailsDB.model("UserDetails", UserDetailsSchema);