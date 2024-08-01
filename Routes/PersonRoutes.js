const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const { error } = require("console");

// Post route to add a person
router.post("/signup", async (req, res) => {
  try {
    let conn = await Person();
    const data = req.body; // Assumeing the request body contain the person data
    // create  a new person document using the Mongoose model
    const newPerson = new Person(data);

    // save the new person  to the database
    const response = await newPerson.save();
    console.log("data saved");

    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));

    const token = generateToken(payload);
    console.log("token is : ", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Login Route
router.post("/login", async (req, res) => {
  try {
    //Extract username and Password from request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await Person.findOne({ username: username });

    //If user does not exist or password does not match ,return  error

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password"});
    }
    //Generate Token
    const payload = {
      id: user.id,
      username: user.username
    };
    const token = generateToken(payload);
    //return token as response
    res.json({token});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
});

// profile route 
   router.get ('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
      const userData = req.user;
      console.log("User Data:",userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
    }catch(err){
      console.err(err);
      res.status(500).json({error:"Internal error" })
    }
   })

// GET method to get the person
router.get("/",jwtAuthMiddleware, async (req, res) => {
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
