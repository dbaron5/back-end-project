const express = require("express");
const router = express.Router();

router.get("/get_events", async (req, res) => {
  res.send("/get_events");
});

router.post("/post_events", async (req, res) => {
  res.send("/post_events");
});

router.put("/put_events", async (req, res) => {
  res.send("/put_events");
});

router.delete("/delete_events", async (req, res) => {
  res.send("/delete_events");
});

module.exports = router;
