const express = require("express");
const PropertyDetails = require("../models/PropertyDetails");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempPath = path.join(__dirname, "uploads", "temp");
    fs.mkdirSync(tempPath, { recursive: true });
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

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
            address: propertyDetails.address,
            city: propertyDetails.city,
            adDescription: propertyDetails.adDescription,
            imagePath: propertyDetails.imagePath,
            adTitle: propertyDetails.adTitle,
            propertySubType: propertyDetails.propertySubType,
            rate: propertyDetails.rate,
            duration: propertyDetails.duration,
            negotiable: propertyDetails.negotiable,
            furnishType: propertyDetails.furnishType,
            area: propertyDetails.area
         });
        await propertTypeDetails.save();
        res.status(201).json({ message: "Property details saved successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

router.get('/fetchPropertyDetails', async(req, res) => {
    try {
        const propertyDetails = await PropertyDetails.find();
        res.status(200).json(propertyDetails);
    } catch (err) {
        res.status(500).json({message: "Server error", error: err.message})
    }
});

router.get('/property/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const properties = await PropertyDetails.find({ userId });
        if (!properties.length) {
            return res.status(200).json([]);
        }
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.post("/uploadImage", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const propertyId = req.body.propertyId;
    const imageName = req.body.imageName;

    if (!imageName || !propertyId) {
      return res.status(400).json({ message: "Missing imageName or propertyId" });
    }

    const finalPath = path.join("/var/www/leaseoye.com/uploads", propertyId);
    fs.mkdirSync(finalPath, { recursive: true });

    const finalFilePath = path.join(finalPath, req.file.filename);
    const tempFilePath = req.file.path;
    fs.renameSync(tempFilePath, finalFilePath);

    const imagePath = `/uploads/${propertyId}/${req.file.filename}`;
    res.status(201).json({ message: "Image uploaded successfully", imagePath });

  } catch (err) {
    console.error("Upload Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/updatePropertyDetails/:propertyId", async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const updateData = req.body;

        if (!propertyId) {
            return res.status(400).json({ message: "Missing propertyId in the URL" });
        }

        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No data provided to update" });
        }

        const updatedProperty = await PropertyDetails.findOneAndUpdate(
            { propertyId: propertyId },
            { $set: updateData },
            { new: true } // returns the updated document
        );

        if (!updatedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json({
            message: "Property details updated successfully",
            data: updatedProperty
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = router;