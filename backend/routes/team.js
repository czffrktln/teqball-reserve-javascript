const express = require("express");
const router = express.Router();
const Team = require("../models/team.js");


router.post("/", async (req, res) => {
  console.log(req.body);
  const token = req.headers.token
  console.log("token: " + token);

  const foundTeam = await Team.findOne({ name: req.body.name });
  if (foundTeam) return res.status(400).json({ error: "Team already exist!" });
  try {
    const { name, description, members, admin } = req.body;
    const team = await Team.create({
      name,
      description,
      members,
      admin,
    });
    return res.status(201).json({ message: "Team created", data: team });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/join", async (req, res) => {

  const foundTeam = await Team.findById(req.body.teamId);
  const userId = res.locals.id
  // console.log(foundTeam.members.find(id => id==userId)) 
  if (foundTeam.members.find(id => id==userId)) return res.status(400).json({ error: "You are already in the team !" });
  if (!foundTeam) return res.status(400).json({ error: "Team doesn't exist!" });
  try {
    await Team.findByIdAndUpdate(req.body.teamId, { $push: { members: userId }})
    return res.status(201).json({ message: "Joined the team successfully", data: foundTeam });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



router.get("/", async (req, res) => {
  try {
    const teams = await Team.find({});
    return res.status(201).json(teams);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
