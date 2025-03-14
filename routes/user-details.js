const express = require("express");
const UserDetails = require("../models/UserDetails");

const router = express.Router();

router.post("/userDetails", async (req, res) => {
    try {
        const userDetails = req.body;
        if (!req.body) {
            return res.status(400).json({message: "Missing data"});
        }
        const newUserDetails = new UserDetails({ 
            name: userDetails.name,
            email: userDetails.email,
            phoneNumber: userDetails.phoneNumber,
            birthday: userDetails.birthday,
            userId: userDetails.userId,
         });
        await newUserDetails.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

router.post("/user", async (req, res) => {
    try {
        // Validate request body
        if (!req.body || !req.body.userId) {
            return res.status(400).json({ message: "Missing user ID" });
        }

        const userIdData = req.body.userId;

        const userDetails = await UserDetails.findOne({ userId: userIdData });

        if (!userDetails) {
            return res.status(404).json({ message: "User not found" });
        }

        // Convert user details to a plain object
        const sanitizedUser = { ...userDetails._doc, _id: userDetails._id.toString() };

        // Send response
        res.status(200).json({ message: "Fetched User details", userDetails: sanitizedUser });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});


module.exports = router;