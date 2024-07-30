const express = require("express");
const app = express();
const db = require("./db");

const bodyparser = require("body-parser");
app.use(bodyparser.json()); // req.body stored post request

app.get("/", function (req, res) {
  return res.send("Welcome to my server ...");
});

//Import the routers files
const personRoutes = require("./Routes/PersonRoutes");

//Use the routers
app.use("/person", personRoutes);

app.listen(8000, () => console.log("Server started.."));
