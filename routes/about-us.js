const express = require("express");
const AboutUs = require("../models/AboutUs");
const router = express.Router();

router.post('/AboutUs', async(req, res) => {
    try {
        if (!req.body.aboutUs) {
            res.status(404).json({message: "Missing about us"});
        }
        const aboutUs = new AboutUs({
            aboutUs: req.body.aboutUs 
        });
        await aboutUs.save();
        res.status(200).json("About Us message saved successfully");
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

router.get('/FetchAboutUs', async(req, res) => {
    try {
        const aboutUs = await AboutUs.find();
        res.status(200).json(aboutUs);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = router;