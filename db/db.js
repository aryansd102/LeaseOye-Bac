const usersDB = mongoose.createConnection(process.env.User, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  usersDB.on("connected", () => console.log("Connected to UsersDB"));
  usersDB.on("error", (err) => console.log("UsersDB Connection Error:", err));
  
const userDetailsDB = mongoose.createConnection(process.env.UserDetails, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
userDetailsDB.on("connected", () => console.log("Connected to UserDetailsDB"));
userDetailsDB.on("error", (err) => console.log("UserDetailsDB Connection Error:", err));

module.exports = { usersDB, userDetailsDB };