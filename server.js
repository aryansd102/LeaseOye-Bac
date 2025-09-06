require("dotenv").config();
const fs = require('fs');
const mongoose = require("mongoose");
const cors = require("cors");
const express = require('express');
const path = require("path");
const https = require('https');

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'https://www.leaseoye.com',
  'http://localhost:4200',
  'https://api.leaseoye.com'
];

// CORS setup
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const userDetailRoutes = require('./routes/user-details.js');
app.use("/", userDetailRoutes);

const propertyDetailsRoute = require('./routes/property-details.js');
app.use("/", propertyDetailsRoute);

const aboutUsRoute = require('./routes/about-us.js');
app.use("/", aboutUsRoute);

// Test route
app.get('/test', (req, res) => {
console.log('successfully hit');
  res.send("hello this is lease oye testing api");
});

// Start HTTPS server

try {
  const server = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/leaseoye.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/leaseoye.com/fullchain.pem')
  }, app);

  // Listen for server errors
  server.on('error', (err) => {
    console.error('HTTPS server error:', err);
  });

  server.listen(8453, () => {
    console.log('HTTPS server running on port 8080');
  });
} catch (err) {
  // Catch any synchronous errors that happen during setup
  console.error('Error setting up HTTPS server:', err);
}
