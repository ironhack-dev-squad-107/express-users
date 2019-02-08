// Seed File (run this to insert more books into the database)
// -----------------------------------------------------------------------------
// connects seed.js to the .env file
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// get the Book model to do our database query
const User = require("../models/user-model.js");

// get the book data from the JSON file
const adminData = require("./admins.json");

// 🚨🚨🚨 CONNECT TO THE SAME DATABASE AS app.js 🚨🚨🚨
// connect to the MongoDB server with database name equal to the project name
// (also has console.logs for successful and failed connections)
mongoose
  .connect("mongodb://localhost/express-users", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

adminData.forEach(oneAdmin => {
  oneAdmin.encryptedPassword = bcrypt.hashSync(oneAdmin.originalPassword, 10);
});

User.insertMany(adminData)
  .then(adminResults => {
    console.log(`Inserted ${adminResults.length} ADMINS 📙`);
  })
  .catch(err => {
    console.log("Insert FAILURE!! 💩", err);
  });
