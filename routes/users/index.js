const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { Users } = require("../../models");
const models = require("../../models");
const { cookieJwtAuth } = require("../../middleware/cookieJwtAuth");
const jwt = require("jsonwebtoken");
const cors = require("cors");
router.use(express.json());

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.use(cors());
router.use(bodyParser.json());
router.use(cookieParser());
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const store = new SequelizeStore({ db: models.sequelize });
router.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);
store.sync();

router.post("/sign_up", async (req, res) => {
  const { email, username, password } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    const userToCreate = await Users.create({
      email: email,
      username: username,
      password: hash,
    });
    res.send(userToCreate);
  });
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
