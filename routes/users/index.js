const express = require("express");
const router = express.Router();
//const ejs = require("ejs");

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
