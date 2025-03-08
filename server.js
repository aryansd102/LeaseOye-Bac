require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose
 .connect(process.env.MONGO_URI.User, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

mongoose
    .connect(process.env.MONGO_URI.UserDetails, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const userDetailRoutes = require('./routes/user-details.js');
app.use("/", userDetailRoutes);

app.get('/test', (req, res) => {
    res.send("hello this is lease oye testing api");
});

const port = 8080;
app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
})