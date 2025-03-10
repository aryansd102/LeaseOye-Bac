const mongoose = require("mongoose");
const { userDetailsDB } = require("../db/db");

const UserDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: {type: Number, required: true},
  birthday: {type: Date, required: true},
  userId: {type: String, required: true}
}, { timestamps: true });

module.exports = userDetailsDB.model("UserDetails", UserDetailsSchema);