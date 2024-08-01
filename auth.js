// sets up Passport with a local authentication strategy, using a Person model for user data. - Auth.js file
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const person = require("./models/Person");
passport.use(
  new localStrategy(async (Username, password, done) => {

    //authentication logic here
    try {
      //   console.log("Recieved Crendentials:", Username, password);
      const user = await person.findOne({ username: Username });
      if (!user) return done(null, false, { message: "Incorrect username." });

      const ispasswordMatch = await user.comparePassword(password);
      if (ispasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect passowrd." });
      }
    } catch (err) {
      return done(err);
    }
  })
);
module.exports = passport; // Export configured passport
