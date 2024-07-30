const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
// Post route to add a person
router.post("/", async (req, res) => {
  try {
    let conn = await Person();
    const data = req.body; // Assumeing the request body contain the person data
    // create  a new person document using the Mongoose model
    const newPerson = new Person(data);

    // save the new person  to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method to get the person
router.get("/", async (req, res) => {
  const data = await Person.find();
  console.log("data fetched");
  res.status(200).json(data);
});

router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if (worktype == "chef" || worktype == "waiter" || worktype == "manger") {
      const response = await Person.find({ work: worktype });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Internal work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ erroe: "Internal Server Error" });
  }
});

// Patch, update route to updated
router.patch("/:id", async (req, res) => {
  const PersonId = req.params.id;
  const updatedPersonData = req.body;
  const response = await Person.findByIdAndUpdate(PersonId, updatedPersonData, {
    new: true,
    runValidators: true,
  });
  console.log("data updated");
  res.status(200).json(response);
});

// Delete,route to Deleted
router.delete("/:id", async (req, res) => {
  const PersonId = req.params.id;
  const deletePerson = await Person.findByIdAndDelete(PersonId);
  console.log("data updated");
  res.status(200).json({ message: "person Deleted Sucessfully" });
});

module.exports = router;
