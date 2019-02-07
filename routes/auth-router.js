const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user-model.js");

const router = express.Router();

router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup-form.hbs");
});

router.post("/process-signup", (req, res, next) => {
  const { fullName, email, originalPassword } = req.body;

  // enforce password rules (can't be empty and MUST have a digit)
  if (!originalPassword || !originalPassword.match(/[0-9]/)) {
    // redirect to the SIGNUP PAGE if the password is BAD
    res.redirect("/signup");
    // use return to STOP the function here if the password is BAD
    return;
  }

  // encrypt the user's password before saving it
  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({ fullName, email, encryptedPassword })
    .then(() => {
      // redirect to the HOME PAGE if the sign up WORKED
      res.redirect("/");
    })
    .catch(err => next(err));
});

router.get("/login", (req, res, next) => {
  res.render("auth-views/login-form.hbs");
});

router.post("/process-login", (req, res, next) => {
  const { email, originalPassword } = req.body;

  // validate the email by searching the database for an account with that email
  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      // User.findOne() will give us NULL in userDoc if it found nothing
      if (!userDoc) {
        // redirect to LOGIN PAGE if result is NULL (no account with that email)
        res.redirect("/login");
        // use return to STOP the function here if the EMAIL is BAD
        return;
      }

      const { encryptedPassword } = userDoc;

      // validate the password by using bcrypt.compareSync()
      // (bcrypt.compareSync() will return FALSE if the passwords don't match)
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        // redirect to LOGIN PAGE if the passwords don't match
        res.redirect("/login");
        // use return to STOP the function here if the PASSWORD is BAD
        return;
      }

      // email & password are CORRECT!
      // HERE WE ARE MISSING SOME CODE FOR REAL LOG IN
      res.redirect("/");
    })
    .catch(err => next(err));
});

module.exports = router;
