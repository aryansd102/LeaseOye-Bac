const express = require("express");
const PropertyDetails = require("../models/PropertyDetails");

const router = express.Router();

router.post("/propertyDetails", async (req, res) => {
    try {
        const propertyDetails = req.body;
        if (!req.body) {
            return res.status(400).json({message: "Missing data"});
        }
        const propertTypeDetails = new PropertyDetails({
            userId: propertyDetails.userId,
            propertyId: propertyDetails.propertyId,
            propertyType: propertyDetails.propertyType,
            line1: propertyDetails.line1,
            line2: propertyDetails.line2,
            landmark: propertyDetails.landmark,
            area: propertyDetails.area,
            city: propertyDetails.city,
            country: propertyDetails.country,
         });
        await propertTypeDetails.save();
        res.status(201).json({ message: "Property details saved successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = router;