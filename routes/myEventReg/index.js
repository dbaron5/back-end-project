const express = require("express");
const router = express.Router();
const EventRegistration = require("../../models");
router.use(express.json());

router.get("/eventRegistrations", async (req, res) => {
  try {
    const eventRegistrations = await EventRegistration.findAll();
    res.json(eventRegistrations);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve event registrations." });
  }
});

module.exports = router;
