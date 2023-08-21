const express = require("express");
const router = express.Router();
const Event = require("../models/event")



router.post("/", async (req, res) => {
    console.log(req.body);
  
    const foundEvent = await Event.findOne({ name: req.body.name });
    if (foundEvent) return res.status(400).json({ error: "Event already exist!" });
    try {
      const { name, description, location, startDate, startTime, endTime, attendees, team } = req.body;  ///+admin??
      const event = await Event.create({
        name,
        description,
        // location,
        startDate,
        startTime,
        endTime,
        attendees,
        team
      });
      return res.status(201).json({ message: "Event created", data: event });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });


router.get("/", async (req, res) => {
  try {
    const events = await Event.find({});
    return res.status(201).json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;


// name: { type: String, required: true },
//   description: { type: String },
//   startDate: { type: Date, required: true },
//   startTime: { type: String, required: true },
//   endTime: { type: String, required: true },
//   attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },