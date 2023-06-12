const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const { Users } = require("../../models");
router.use(express.json());

router.post("/sign_up", async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email);
  if (!email) {
    res.status(400).send("Please include an email address.");
  }
  if (!username) {
    res.status(400).send("Please create a username.");
  }
  if (!password) {
    res.status(400).send("Please create a password.");
  }
  try {
    //const hashedPassword = await bcrypt.hash(password, 10);
    const userToCreate = {
      email: email,
      username: username,
      password: password,
    };
    const newUser = await Users.create(userToCreate);
    res.redirect();
  } catch (error) {
    res.status(500).json({ error: "Failed to create user." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  if (!email || !password) {
    res.status(400).send("Please provide email and password.");
    return;
  }
  try {
    const existingUser = await Users.findOne({
      where: { email: email },
    });
    if (!existingUser) {
      return res.status(400).send("Email address not found.");
    }
    res.redirect("/events");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/user_data", (req, res) => {
  res.render("./users/users.ejs", { user: { name: "Daniel" } });
});

module.exports = router;
