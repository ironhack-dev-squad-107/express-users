const express = require("express");

const Room = require("../models/room-model.js");

const router = express.Router();

router.get("/room-add", (req, res, next) => {
  // req.user comes from Passport's deserializeUser()
  // (it's the document from the database of the logged-in user)
  if (req.user) {
    // AUTHORIZATION: only show the form if you are logged-in
    res.render("room-views/room-form.hbs");
  } else {
    // redirect to the login page if you ARE NOT logged-in
    req.flash("error", "You have to be logged-in to add a room. 🛌");
    res.redirect("/login");
  }
});

router.post("/process-room", (req, res, next) => {
  const { name, description, pictureUrl } = req.body;

  // req.user comes from Passport's deserializeUser()
  // (it's the document from the database of the logged-in user)
  const host = req.user._id;

  Room.create({ name, description, pictureUrl, host })
    .then(() => {
      req.flash("success", "Room created successfully! 🛏");
      res.redirect("/my-rooms");
    })
    .catch(err => next(err));
});

router.get("/my-rooms", (req, res, next) => {
  // req.user comes from Passport's deserializeUser()
  // (it's the document from the database of the logged-in user)
  if (!req.user) {
    // AUTHORIZATION: redirect to login if you are NOT logged-in
    req.flash("error", "You must be logged-in to see your rooms. 😴");
    res.redirect("/login");
    // use return to STOP the function here if you are NOT logged-in
    return;
  }

  // filter the rooms owned by the logged-in user
  Room.find({ host: { $eq: req.user._id } })
    // sort by newest first
    .sort({ createdAt: -1 })
    // first 10 results
    .limit(10)
    .then(roomResults => {
      res.locals.roomArray = roomResults;
      res.render("room-views/room-list.hbs");
    })
    .catch(err => next(err));
});

// ADMINS ONLY: list of ALL the rooms
router.get("/admin/rooms", (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    // AUTHORIZATION: redirect to home page if you are NOT an ADMIN
    // (also if you are NOT logged-in)
    req.flash("error", "Only admins can do that 🥊");
    res.redirect("/");
    return;
  }

  Room.find()
    .sort({ createdAt: 1 })
    .then(roomResults => {
      res.locals.roomArray = roomResults;
      res.render("room-views/admin-rooms.hbs");
    })
    .catch(err => next(err));
});

module.exports = router;
