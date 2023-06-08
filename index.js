require("dotenv").config();
const express = require("express");
const app = express();
// const users = require("./routes/users");
// const events = require("./routes/myEvents");
// const registrations = require("./routes/myEventReg");
const PORT = 3000;

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views/partials"));

// app.use("/user", users);
// app.use("/event", events);
// app.use("/registration", registrations);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
