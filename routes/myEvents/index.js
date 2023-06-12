const express = require("express");
const router = express.Router();
const { Events } = require("../../models");
const jwt = require("jsonwebtoken");
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

router.get("/get_events", async (req, res) => {
  getEvents(res);
});

router.post("/rsvp/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const { rsvpStatus } = req.body;
  try {
    const existingEvent = await Events.findByPk(eventId);
    if (!existingEvent) {
      return res.status(400).send("Event not found.");
    }
    const newRegistration = await EventRegistrations.create({
      eventId: eventId,
      userId: req.user.userId,
      rsvpStatus: rsvpStatus,
    });
    res.status(200).send("RSVP submitted successfully.");
  } catch (error) {
    res.status(500).json({ error: "Failed to submit RSVP." });
  }
});

router.put("/update_event/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const { event, description, men, location, date, time } = req.body;
  try {
    const existingEvent = await Events.findByPk(eventId);
    if (!existingEvent) {
      return res.status(400).send("Event not found.");
    }
    existingEvent.event = event || existingEvent.event;
    existingEvent.description = description || existingEvent.description;
    existingEvent.men = men || existingEvent.men;
    existingEvent.location = location || existingEvent.location;
    existingEvent.date = date || existingEvent.date;
    existingEvent.time = time || existingEvent.time;
    await existingEvent.save();
    getEvents(res);
  } catch (error) {
    res.status(500).json({ error: "Failed to update event." });
  }
});

router.delete("/delete_event/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const eventToDelete = await Events.findByPk(eventId);
    if (!eventToDelete) {
      return res.status(400).send("Event not found.");
    }
    await eventToDelete.destroy();
    getEvents(res);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event." });
  }
});

module.exports = router;
