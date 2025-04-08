const mongoose = require('mongoose');
const { aboutUsDb } = require("../db/db");

const aboutUsSchema = new mongoose.Schema({
    aboutUs: {type: String, required: true}
});

module.exports = aboutUsDb.model("AboutUs", aboutUsSchema);