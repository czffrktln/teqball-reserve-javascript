const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
