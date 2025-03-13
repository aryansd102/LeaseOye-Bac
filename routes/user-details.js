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

router.post("/user", async(req, res) => {
    try {
        const userId = req.body;
        if (!req.body) {
            return res.status(400).json({message: "Missing data"});
        }
        const userDetails = UserDetails.findOne({userId});
        if (!userDetails) {
            return res.status(400).json("Missing user details");
        }
        res.status(201).json({message: "Fetched User details", userDetails})
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = router;