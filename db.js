const mongoose = require("mongoose");

// Define the MongoDB conncetions URL
const mongoURL = "mongodb://localhost:27017/hotels";

// set up MongoDB conncetion
mongoose.connect(mongoURL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

//Get the default concetion
// Mongoose maintains a default connection object representing the MongoDB conncetion.

const db = mongoose.connection;
// Define event listeners for database conncetions

db.on("connected", () => {
  console.log("connected to MongoDB server..");
});
db.on("err", (err) => {
  console.log("MongoDB connection error:!", err);
});
db.on("disconncted", (err) => {
  console.log("MongoDB disconnected ");
});
// Export the database connection

module.exports = db;
