const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");

const bodyparser = require("body-parser");
app.use(bodyparser.json()); // req.body stored post request
const PORT = process.env.PORT || 8000;

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); //Move  on the next Phase
};
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", localAuthMiddleware, function (req, res) {
  return res.send("Welcome to my server ...");
});

//Import the routers files
const personRoutes = require("./Routes/PersonRoutes");
const Person = require("./models/Person");

//Use the routers
app.use("/person", personRoutes);

//Start Server
app.listen(8000, () => console.log("Server started.."));
