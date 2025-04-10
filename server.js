require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const path = require("path");

app.use(cors({
    origin: 'http://localhost:4200', // Change this to your frontend URL
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
app.use(bodyParser.json());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const userDetailRoutes = require('./routes/user-details.js');
app.use("/", userDetailRoutes);

const propertyDetailsRoute = require('./routes/property-details.js');
app.use("/", propertyDetailsRoute);

const aboutUsRoute = require('./routes/about-us.js');
app.use("/", aboutUsRoute);

app.get('/test', (req, res) => {
    res.send("hello this is lease oye testing api");
});

const port = 8080;
app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
})