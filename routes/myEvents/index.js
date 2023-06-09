const express = require("express");
const router = express.Router();
const { Events } = require("../../models");
const { authenticate } = require("passport");
router.use(express.json());

async function getEvents(res) {
  const allEvents = await Events.findAll();
  console.log(allEvents[0].dataValues);
  return res.render("myEvents/events", {
    allEvents: allEvents,
  });
}

router.post("/create_event", async (req, res) => {
  const { event, description, men, location, date, time } = req.body;
  console.log(event);
  if (!event) {
    res.status(400).send("Please include an event name.");
  }
  if (!description) {
    res.status(400).send("Please provide an event description.");
  }
  if (!men) {
    res.status(400).send("Please provide gender.");
  }
  if (!location) {
    res.status(400).send("Please provide a location.");
  }
  if (!date) {
    res.status(400).send("Please provide a date.");
  }
  if (!time) {
    res.status(400).send("Please provide a time.");
  }
  try {
    const eventToCreate = {
      event: event,
      description: description,
      men: men,
      location: location,
      date: date,
      time: time,
    };
    const newEvent = await Events.create(eventToCreate);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
  getEvents(res);
});

router.post("/event_created", authenticate, (req, res) => {
  res.send("Event successfully created");
});

router.get("/get_events", async (req, res) => {
  getEvents(res);
});

// router.post("/post_events", async (req, res) => {
//   res.send("/post_events");
// });

// router.put("/put_events", async (req, res) => {
//   res.send("/put_events");
// });

// router.delete("/delete_events", async (req, res) => {
//   res.send("/delete_events");
// });

module.exports = router;
