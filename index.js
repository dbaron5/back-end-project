const express = require("express");
const app = express();
require("dotenv").config();
const bcrypt = require("bcrypt");
const users = require("./routes/users");
const events = require("./routes/myEvents");
const registrations = require("./routes/myEventReg");
const bodyParser = require("body-parser");
const PORT = 3000;

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views/partials"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/users", users);
app.use("/event", events);
app.use("/registrations", registrations);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
