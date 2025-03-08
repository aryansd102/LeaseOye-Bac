const mongoose = require("mongoose");
const { usersDB } = require("./db");


const UserDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: {type: Number, required: true},
  birthday: {type: Date, required: true}
}, { timestamps: true });

module.exports = usersDB.model("UserDetails", UserDetailsSchema);