const mongoose = require("mongoose");
require('dotenv').config();
// Define the MongoDB conncetions URL
// const mongoURL = process.env.MongoDB_URL_LOCAL;
 const mongoURL=process.env.MongoDB_URL;

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
