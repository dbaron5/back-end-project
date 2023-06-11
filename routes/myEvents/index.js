const express = require("express");
const router = express.Router();
const { Events } = require("../../models");
const { authenticate } = require("passport");
router.use(express.json());

async function getEvents(res) {
  const allEvents = await Events.findAll();
  console.log(allEvents[0].dataValues);
  const userId = req.user.id;
  for (const event of allEvents) {
    const userEvent = await UserEvents.findOne({
      where: {
        eventId: event.id,
        userId: userId,
      },
    });
    event.dataValues.rsvpStatus = userEvent
      ? userEvent.rsvpStatus
      : "Not Attending";
  }
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
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
  getEvents(res);
});

// ...

router.post("/rsvp/:eventId", authenticate("jwt", { session: false }), async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.user.id;
  const rsvpStatus = req.body.rsvpStatus;
  try {
      const userEvent = await UserEvents.findOne({
      where: {
        eventId: eventId,
        userId: userId,
      },
    });
    if (userEvent) {
      userEvent.rsvpStatus = rsvpStatus;
      await userEvent.save();
    } else {
      await UserEvents.create({
        eventId: eventId,
        userId: userId,
        rsvpStatus: rsvpStatus,
      });
    }
    res.redirect("/events/" + eventId);
  } catch (error) {
    res.status(500).json({ error: "Failed to update RSVP status." });
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
