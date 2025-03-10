require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
app.use(cors({
    origin: 'http://your-angular-app.com', // Change this to your frontend URL
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const userDetailRoutes = require('./routes/user-details.js');
app.use("/", userDetailRoutes);

const propertyDetailsRoute = require('./routes/property-details.js');
app.use("/", propertyDetailsRoute);

app.get('/test', (req, res) => {
    res.send("hello this is lease oye testing api");
});

const port = 8080;
app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
})