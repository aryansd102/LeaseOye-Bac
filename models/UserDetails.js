const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: {type: Number, required: true},
  birthday: {type: Date, required: true}
}, { timestamps: true });

module.exports = mongoose.model("UserDetails", UserDetailsSchema);