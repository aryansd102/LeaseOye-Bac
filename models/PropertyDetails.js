const mongoose = require('mongoose');
const { propertyDetailsDB } = require("../db/db");

const propertyDetailsSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    propertyId: {type: String, required: true},
    propertyType: { type: String, required: true },
    line1: { type: String, required: true, unique: true },
    line2: { type: String, required: true },
    landmark: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    length: {type: String},
    breadth: {type: String},
    description: {type: String},
    imagePath: [{type: String}]
  }, { timestamps: true });
  
module.exports = propertyDetailsDB.model("PropertyDetails", propertyDetailsSchema);
