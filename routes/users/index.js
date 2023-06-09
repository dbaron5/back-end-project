const express = require("express");
const router = express.Router();
const { Users } = require("../../models");
const { authenticate } = require("passport");
router.use(express.json());
//const ejs = require("ejs");

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
    //    const hashedPassword = await bcrypt.hash(password, 10);
    const userToCreate = {
      email: email,
      username: username,
      password: password,
    };
    const newUser = await Users.create(userToCreate);
    //    res.redirect();
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.post("/login", authenticate, (req, res) => {
  res.send("Successfully logged in");
});

router.get("/user_data", (req, res) => {
  res.render("./users/users.ejs", { user: { name: "Daniel" } });
});

// router.post("/post_users", async (req, res) => {
//   res.send("/post_users");
// });

// router.put("/put_users", async (req, res) => {
//   res.send("/put_users");
// });

// router.delete("/delete_users", async (req, res) => {
//   res.send("/delete_users");
// });

module.exports = router;
