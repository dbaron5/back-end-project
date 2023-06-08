const express = require("express");
const router = express.Router();

router.get("/get_event_registration", async (req, res) => {
  res.send("/get_event_registration");
});

router.post("/post_event_registration", async (req, res) => {
  res.send("/post_event_registration");
});

router.put("/put_event_registration", async (req, res) => {
  res.send("/put_event_registration");
});

router.delete("/delete_event_registration", async (req, res) => {
  res.send("/delete_event_registration");
});

module.exports = router;
