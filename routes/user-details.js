const express = require("express");
const UserDetails = require("../models/UserDetails");

const router = express.Router();

router.post("/userDetails", async (req, res) => {
    try {
        const userDetails = req.body;
        if (!userDetails || !userDetails.userId) {
            return res.status(400).json({ message: "Missing userId or data" });
        }
        const updatedUser = await UserDetails.findOneAndUpdate(
            { userId: userDetails.userId },
            {
                $set: {
                    name: userDetails.name,
                    email: userDetails.email,
                    phoneNumber: userDetails.phoneNumber,
                }
            },
            {
                new: true,
                upsert: true
            }
        );
        res.status(200).json({
            message: "User details saved successfully",
            data: updatedUser
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});


router.get("/fetchUserDetails", async (req, res) => {
    try {
        const userDetails = await UserDetails.find();
        res.status(201).json({message: "Users fetched", userDetails});
    } catch (err) {
        res.status(500).json({message: "Server Error", error: err.message });
    }
});

router.get("/fetchUserDetails/:userId", async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserDetails.findOne({userId});
        res.status(201).json(user);
    } catch (err) {
        res.status(404).json({message: "Server Error", error: err.message });
    }
})

module.exports = router;