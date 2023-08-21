const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: String, required: true },  //date??
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  // location: { type:String },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;

// Event.findById(eventId)
//   .populate('attendees')
//   .exec(function (err, event) {
//     if (err) return handleError(err);
//     console.log(event.attendees);
//   });

// Event.find({ attendees: userId })
//   .populate('attendees')
//   .exec(function (err, events) {
//     if (err) return handleError(err);
//     console.log(events);
//   });
