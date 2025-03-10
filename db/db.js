const mongoose = require("mongoose");

const usersDB = mongoose.createConnection(process.env.MONGO_URI_USER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  usersDB.on("connected", () => console.log("Connected to UsersDB"));
  usersDB.on("error", (err) => console.log("UsersDB Connection Error:", err));
  
const userDetailsDB = mongoose.createConnection(process.env.MONGO_URI_USER_DETAILS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
userDetailsDB.on("connected", () => console.log("Connected to UserDetailsDB"));
userDetailsDB.on("error", (err) => console.log("UserDetailsDB Connection Error:", err));

const propertyDetailsDB = mongoose.createConnection(process.env.MONGO_URI_PROPERTY_DETAILS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
propertyDetailsDB.on("connected", () => console.log("Connected to Property Details Db"));
propertyDetailsDB.on("error", () => console.log("PropertyDetailsDB Connection Error:", err));

module.exports = { usersDB, userDetailsDB, propertyDetailsDB };