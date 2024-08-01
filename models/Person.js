const mongoose = require("mongoose");
const { type } = require("os");
const bcrypt = require("bcrypt");
// Define the Person Schema

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

PersonSchema.pre("save", async function (next) {
  const person = this;
  //Hash the password only if it has been modified (or is new)
  if (!person.isModified("password")) return next();
  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);
    // hash password
    const HashedPassword = await bcrypt.hash(person.password, salt);
    //Override the plain password with the hashed one
    person.password = HashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

PersonSchema.methods.comparePassword = async function(candidatePassword){
  try{
 const isMatch = await bcrypt.compare(candidatePassword,this.password);
 return isMatch;
  }catch(err){
    throw err;
  }
}
// create Person Model
const Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
