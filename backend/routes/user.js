const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(201).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    console.log("users", users);
    return res.status(201).json(users.name);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
