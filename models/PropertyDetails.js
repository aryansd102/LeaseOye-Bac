const mongoose = require('mongoose');
const { propertyDetailsDB } = require("../db/db");

const propertyDetailsSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    propertyId: {type: String, required: true},
    propertyType: { type: String, required: true },
    address: {type: String, required: true},
    city: {type: String, required: true},
    rate: {type: String, required: true},
    duration: {type: String, required: true},
    adTitle: {type: String, required: true},
    adDescription: {type: String, required: true},
    propertySubType: {type: String, required: true},
    imagePath: [{type: String}],
    negotiable: {type: Boolean},
    area: {type: String},
    furnishType: {type: String}
  }, { timestamps: true });

module.exports = propertyDetailsDB.model("PropertyDetails", propertyDetailsSchema);
