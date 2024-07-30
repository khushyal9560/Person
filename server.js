const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyparser = require("body-parser");
app.use(bodyparser.json()); // req.body stored post request
const PORT = process.env.PORT || 8000;

app.get("/", function (req, res) {
  return res.send("Welcome to my server ...");
});

//Import the routers files
const personRoutes = require("./Routes/PersonRoutes");

//Use the routers
app.use("/person", personRoutes);

//Start Server
app.listen(8000, () => console.log("Server started.."));
